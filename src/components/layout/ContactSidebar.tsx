import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

type ContactSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactSidebar({ open, onClose }: ContactSidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white p-8 shadow-2xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" onClick={onClose}>
            <Image src="/assets/images/logo.png" alt="Swigo logo" width={120} height={40} />
          </Link>
          <button type="button" onClick={onClose} aria-label="Close sidebar">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-8">
          <h4 className="mb-2 text-lg font-semibold">About us</h4>
          <p className="mb-4 text-sm text-title/70">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <Button href="/about-us" onNavigate={onClose}>
            Read More
          </Button>
        </div>

        <h4 className="mb-4 text-lg font-semibold">Contact Info</h4>
        <div className="space-y-5 text-sm">
          <div className="flex gap-4">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h6 className="font-semibold">Call Now</h6>
              <p className="text-title/70">
                {siteConfig.contact.phone}, {siteConfig.contact.phoneAlt}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h6 className="font-semibold">Location</h6>
              <p className="text-title/70">{siteConfig.contact.addressShort}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h6 className="font-semibold">Email Now</h6>
              <p className="text-title/70">
                {siteConfig.contact.email}, {siteConfig.contact.ordersEmail}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
