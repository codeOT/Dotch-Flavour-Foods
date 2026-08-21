import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { getSitemapEntries } from "@/lib/sitemap-data";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Browse every public page on the Dotch Flavour Foods website.",
  alternates: { canonical: "/sitemap" },
};

export default function HtmlSitemapPage() {
  const grouped = getSitemapEntries().reduce<Record<string, { path: string; title: string }[]>>(
    (sections, entry) => {
      const items = sections[entry.section] ?? [];
      items.push({ path: entry.path, title: entry.title });
      sections[entry.section] = items;
      return sections;
    },
    {},
  );

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-fluid min-w-0 max-w-4xl">
        <Reveal className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
            Sitemap
          </p>
          <h1 className="text-3xl font-bold text-title sm:text-4xl">Browse the site</h1>
          <p className="mt-3 text-sm text-title/65 sm:text-base">
            A full list of public pages, Ready Soups, and blog posts. Search engines can also read
            the{" "}
            <a href="/sitemap.xml" className="font-semibold text-primary hover:underline">
              XML sitemap
            </a>
            .
          </p>
        </Reveal>

        <div className="space-y-10">
          {Object.entries(grouped).map(([section, links]) => (
            <Reveal key={section}>
              <h2 className="mb-4 text-xl font-bold text-title">{section}</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-sm text-title/75 transition hover:text-primary"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
