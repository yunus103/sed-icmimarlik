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
import { SanityImage } from "@/components/ui/SanityImage";

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
  const footerLinks: NavItem[] = (navigation?.footerLinks || []).filter(
    item => settings?.enableProjects !== false || resolveHref(item) !== "/projeler"
  );
  const socialLinks: SocialLink[] = (settings?.socialLinks || []).filter((s: SocialLink) => s.url);
  const contact = settings?.contactInfo;
  const currentYear = new Date().getFullYear();

  const footerLogoAspectRatio = settings?.logo?.asset?.metadata?.dimensions?.aspectRatio;
  const footerLogoWidthStyles = footerLogoAspectRatio 
    ? { width: `${6 * footerLogoAspectRatio}rem` } 
    : { width: "200px" };

  return (
    <footer className="bg-[#111111] text-[#F7F5F2] border-t border-[#D6CEC3]/10">
      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 items-start">

          {/* Brand & Logo Column (5 Columns) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block group">
              <div
                className="relative transition-all duration-200 group-hover:scale-[1.01] active:scale-95"
                style={{ height: "6rem", minWidth: "160px", maxWidth: "380px", ...footerLogoWidthStyles }}
              >
                {settings?.logo ? (
                  <SanityImage
                    image={settings.logo}
                    fill
                    objectFit="contain"
                    fit="max"
                    className="!object-left transition-opacity duration-200 group-hover:opacity-75"
                    sizes="380px"
                    noBlur
                  />
                ) : (
                  <span className="font-serif text-2xl tracking-widest leading-none uppercase text-[#F7F5F2]">
                    {settings?.siteName || "Sed İç Mimarlık"}
                  </span>
                )}
              </div>
            </Link>
            {settings?.siteTagline && (
              <p className="text-xs font-sans tracking-wider leading-relaxed text-[#F7F5F2]/60 uppercase max-w-sm">
                {settings.siteTagline}
              </p>
            )}
            
            {socialLinks.length > 0 && (
              <div className="pt-2">
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
                        className="flex h-9 w-9 items-center justify-center border border-[#D6CEC3]/25 bg-transparent text-[#F7F5F2] hover:text-[#111111] hover:bg-[#F7F5F2] hover:border-[#F7F5F2] rounded-none transition-all duration-300"
                      >
                        <Icon size={14} />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links Column (3 Columns) */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D6CEC3]">
              Hızlı Linkler
            </h4>
            {footerLinks.length > 0 ? (
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
            ) : (
              <nav className="flex flex-col gap-3">
                <Link href="/" className="text-xs tracking-wider text-[#F7F5F2]/70 hover:text-[#F7F5F2] transition-colors uppercase">Ana Sayfa</Link>
                <Link href="/hakkimizda" className="text-xs tracking-wider text-[#F7F5F2]/70 hover:text-[#F7F5F2] transition-colors uppercase">Hakkımızda</Link>
                <Link href="/hizmetler" className="text-xs tracking-wider text-[#F7F5F2]/70 hover:text-[#F7F5F2] transition-colors uppercase">Hizmetler</Link>
                <Link href="/projeler" className="text-xs tracking-wider text-[#F7F5F2]/70 hover:text-[#F7F5F2] transition-colors uppercase">Projeler</Link>
                <Link href="/blog" className="text-xs tracking-wider text-[#F7F5F2]/70 hover:text-[#F7F5F2] transition-colors uppercase">Blog</Link>
                <Link href="/iletisim" className="text-xs tracking-wider text-[#F7F5F2]/70 hover:text-[#F7F5F2] transition-colors uppercase">İletişim</Link>
              </nav>
            )}
          </div>

          {/* Contact Details Column (4 Columns) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D6CEC3]">
              İletişim Bilgileri
            </h4>
            <div className="space-y-4 pt-1">
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-xs tracking-wider text-[#F7F5F2]/75 hover:text-[#F7F5F2] transition-colors uppercase font-medium"
                >
                  <RiPhoneLine size={16} className="text-[#D6CEC3]" />
                  <span>{contact.phone}</span>
                </a>
              )}
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-xs tracking-wider text-[#F7F5F2]/75 hover:text-[#F7F5F2] transition-colors font-medium"
                >
                  <RiMailLine size={16} className="text-[#D6CEC3]" />
                  <span>{contact.email}</span>
                </a>
              )}
              {contact?.address && (
                <div className="flex items-start gap-3 text-xs tracking-wider text-[#F7F5F2]/75 leading-relaxed uppercase font-medium">
                  <RiMapPinLine size={16} className="text-[#D6CEC3] shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Drafting Divider Line */}
        <div className="mt-16 pt-8 border-t border-[#D6CEC3]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-widest text-[#F7F5F2]/40 uppercase w-full text-center sm:text-left">
            © {currentYear} {settings?.siteName || "Sed İç Mimarlık"}. Tüm hakları saklıdır.
          </p>
          <p className="text-[10px] tracking-widest text-[#F7F5F2]/40 uppercase shrink-0">
            Architectural Silence
          </p>
        </div>
      </div>
    </footer>
  );
}
