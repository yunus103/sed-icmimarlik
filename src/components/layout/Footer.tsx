import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

import { SiteSettings, Navigation } from "@/types";

type NavItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

type SocialLink = {
  platform: string;
  url: string;
};

const socialIconMap: Record<string, React.ElementType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
};

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Footer({ settings, navigation }: { settings: SiteSettings; navigation: Navigation }) {
  const footerLinks: NavItem[] = navigation?.footerLinks || [];
  const socialLinks: SocialLink[] = (settings?.socialLinks || []).filter((s: SocialLink) => s.url);
  const contact = settings?.contactInfo;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-[#F7F5F2] border-t border-[#D6CEC3]/10">
      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">

          {/* Brand Info (5 Columns) */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="font-serif text-2xl tracking-widest uppercase text-[#F7F5F2]">
              {settings?.siteName}
            </h3>
            {settings?.siteTagline && (
              <p className="text-xs font-sans tracking-wider leading-relaxed text-[#F7F5F2]/60 uppercase max-w-sm">
                {settings.siteTagline}
              </p>
            )}
            <div className="space-y-3 pt-2">
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-xs tracking-wider text-[#F7F5F2]/75 hover:text-[#F7F5F2] transition-colors"
                >
                  <RiPhoneLine size={16} className="text-[#D6CEC3]" />
                  {contact.phone}
                </a>
              )}
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-xs tracking-wider text-[#F7F5F2]/75 hover:text-[#F7F5F2] transition-colors"
                >
                  <RiMailLine size={16} className="text-[#D6CEC3]" />
                  {contact.email}
                </a>
              )}
              {contact?.address && (
                <div className="flex items-start gap-3 text-xs tracking-wider text-[#F7F5F2]/75 leading-relaxed">
                  <RiMapPinLine size={16} className="text-[#D6CEC3] shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links (3 Columns) */}
          {footerLinks.length > 0 && (
            <div className="md:col-span-3 space-y-6">
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D6CEC3]">
                Hızlı Linkler
              </h4>
              <nav className="flex flex-col gap-3">
                {footerLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={resolveHref(item)}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className="text-xs tracking-wider text-[#F7F5F2]/70 hover:text-[#F7F5F2] transition-colors uppercase"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Social Media (4 Columns) */}
          {socialLinks.length > 0 && (
            <div className="md:col-span-4 space-y-6">
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D6CEC3]">
                Bizi Takip Edin
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((social, i) => {
                  const Icon = socialIconMap[social.platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="flex h-10 w-10 items-center justify-center border border-[#D6CEC3]/25 bg-transparent text-[#F7F5F2] hover:text-[#111111] hover:bg-[#F7F5F2] hover:border-[#F7F5F2] rounded-none transition-all duration-300"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Drafting Divider Line */}
        <div className="mt-16 pt-8 border-t border-[#D6CEC3]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-widest text-[#F7F5F2]/40 uppercase w-full text-center sm:text-left">
            © {currentYear} {settings?.siteName}. Tüm hakları saklıdır.
          </p>
          <p className="text-[10px] tracking-widest text-[#F7F5F2]/40 uppercase shrink-0">
            Architectural Silence
          </p>
        </div>
      </div>
    </footer>
  );
}
