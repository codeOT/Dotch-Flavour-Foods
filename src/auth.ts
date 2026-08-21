import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import type { Provider } from "next-auth/providers";
import { connectDB } from "@/lib/db";
import { splitFullName, User, usernameFromEmail } from "@/models/User";

const providers: Provider[] = [
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email or username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const identifier = credentials?.email?.toString().trim().toLowerCase();
      const password = credentials?.password?.toString() ?? "";

      if (!identifier || !password) return null;

      await connectDB();
      const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      })
        .select("_id name email image passwordHash")
        .lean();

      if (!user?.passwordHash) return null;

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return null;

      return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        image: user.image ?? undefined,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) return true;

      await connectDB();
      const email = user.email.toLowerCase();
      const existing = await User.findOne({ email }).select(
        "_id name email image username firstName provider",
      );

      if (!existing) {
        const fullName = user.name || "Google User";
        const { firstName, lastName } = splitFullName(fullName);
        let username = usernameFromEmail(email);
        const taken = await User.exists({ username });
        if (taken) username = `${username}${Math.floor(Math.random() * 900 + 100)}`;

        await User.create({
          name: fullName,
          firstName,
          lastName: lastName || undefined,
          username,
          email,
          image: user.image,
          provider: "google",
        });

        try {
          const { sendWelcomeEmail } = await import("@/lib/email/send");
          const welcome = await sendWelcomeEmail({ to: email, name: fullName });
          if (!welcome.ok && !welcome.skipped) {
            console.error("Welcome email failed:", welcome.error);
          }
        } catch (error) {
          console.error("Welcome email failed:", error);
        }
      } else {
        let dirty = false;
        if (!existing.image && user.image) {
          existing.image = user.image;
          dirty = true;
        }
        if (!existing.username) {
          let username = usernameFromEmail(email);
          const taken = await User.exists({ username, _id: { $ne: existing._id } });
          if (taken) username = `${username}${Math.floor(Math.random() * 900 + 100)}`;
          existing.username = username;
          dirty = true;
        }
        if (!existing.firstName && existing.name) {
          const { firstName, lastName } = splitFullName(existing.name);
          existing.firstName = firstName;
          existing.lastName = lastName || undefined;
          dirty = true;
        }
        if (dirty) await existing.save();
      }

      return true;
    },
    async jwt({ token, user, account, trigger }) {
      // Only touch Mongo on sign-in / session update — not on every request.
      if (user?.id) {
        token.id = user.id;
      }

      if (trigger === "signIn" && account?.provider === "google" && token.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: String(token.email).toLowerCase() })
          .select("_id name image")
          .lean();
        if (dbUser) {
          token.id = String(dbUser._id);
          token.name = dbUser.name;
          token.picture = dbUser.image ?? token.picture;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
