"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import { RiMenu3Line, RiCloseLine, RiArrowDownSLine, RiMailLine, RiPhoneLine } from "react-icons/ri";
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
import { cn } from "@/lib/utils";

import { SiteSettings, Navigation, NavItem, SocialLink } from "@/types";

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

const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
  hidden: {},
} as const;

const itemVariants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hidden: { opacity: 0, x: -20 },
} as const;

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Header({ settings, navigation }: { settings: SiteSettings; navigation: Navigation }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const links: NavItem[] = (navigation?.headerLinks || []).filter(
    item => settings?.enableProjects !== false || resolveHref(item) !== "/projeler"
  );

  // Track transparent state on homepage scroll
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        setIsTransparent(window.scrollY < 80);
      } else {
        setIsTransparent(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Close mobile menu on navigate
  useEffect(() => {
    if (menuOpen) {
      const handle = setTimeout(() => {
        setMenuOpen(false);
      }, 0);
      return () => clearTimeout(handle);
    }
  }, [pathname, menuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (item: NavItem) => {
    const href = resolveHref(item);
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  const logoAspectRatio = settings?.logo?.asset?.metadata?.dimensions?.aspectRatio;
  const logoWidthStyles = logoAspectRatio 
    ? { width: `${4.5 * logoAspectRatio}rem` } 
    : { width: "160px" };

  return (
    <header className={cn(
      "z-40 w-full transition-all duration-300",
      pathname === "/"
        ? isTransparent
          ? "absolute top-0 left-0 right-0 bg-transparent border-b border-transparent text-white"
          : "fixed top-0 left-0 right-0 bg-background/95 border-b border-border/30 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground shadow-sm"
        : "sticky top-0 bg-background/95 border-b border-border/30 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground"
    )}>
      <div className="container mx-auto flex h-24 items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center group h-full py-2">
          <div
            className="relative transition-all duration-200 group-hover:scale-[1.01] active:scale-95"
            style={{ height: "4.5rem", minWidth: "120px", maxWidth: "340px", ...logoWidthStyles }}
          >
            {settings?.logo ? (
              <SanityImage
                image={settings.logo}
                fill
                objectFit="contain"
                fit="max"
                className="!object-left transition-opacity duration-200 group-hover:opacity-75"
                sizes="340px"
                priority
                noBlur
              />
            ) : (
              <span className="font-serif text-xl tracking-wider leading-none uppercase">{settings?.siteName}</span>
            )}
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((item, i) => (
            <DesktopNavItem key={i} item={item} active={isActive(item)} isTransparent={isTransparent} />
          ))}
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Menüyü aç/kapat"
            className={cn(
              "rounded-none hover:bg-transparent",
              isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-foreground/80"
            )}
          >
            {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-50 w-screen h-screen flex flex-col justify-between bg-background text-foreground md:hidden overflow-y-auto"
          >
            {/* Top Bar (matches desktop header layout for alignment consistency) */}
            <div className="container mx-auto flex h-24 items-center justify-between px-6">
              <Link href="/" className="flex items-center group h-full py-2" onClick={() => setMenuOpen(false)}>
                <div
                  className="relative transition-all duration-200 group-hover:scale-[1.01] active:scale-95"
                  style={{ height: "4.5rem", minWidth: "120px", maxWidth: "340px", ...logoWidthStyles }}
                >
                  {settings?.logo ? (
                    <SanityImage
                      image={settings.logo}
                      fill
                      objectFit="contain"
                      fit="max"
                      className="!object-left transition-opacity duration-200 group-hover:opacity-75"
                      sizes="340px"
                      priority
                      noBlur
                    />
                  ) : (
                    <span className="font-serif text-xl tracking-wider leading-none uppercase text-foreground">
                      {settings?.siteName}
                    </span>
                  )}
                </div>
              </Link>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMenuOpen(false)} 
                aria-label="Menüyü kapat"
                className="rounded-none hover:bg-transparent text-foreground hover:text-foreground/80"
              >
                <RiCloseLine size={24} />
              </Button>
            </div>

            {/* Central Navigation Items */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
              <motion.nav 
                variants={listVariants} 
                initial="hidden" 
                animate="visible" 
                className="flex flex-col gap-6 text-left items-start w-full max-w-[280px]"
              >
                {links.map((item, i) => (
                  <motion.div key={i} variants={itemVariants} className="w-full flex flex-col gap-2">
                    <Link
                      href={resolveHref(item)}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "text-2xl font-serif tracking-wider uppercase py-1.5 transition-colors block",
                        isActive(item) ? "text-primary font-bold" : "text-foreground/80 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                    
                    {item.subLinks && item.subLinks.length > 0 && (
                      <div className="flex flex-col gap-2.5 pl-4 border-l border-border/30 ml-2 mt-1">
                        {item.subLinks.map((sub, j) => (
                          <Link
                            key={j}
                            href={resolveHref(sub)}
                            target={sub.openInNewTab ? "_blank" : undefined}
                            rel={sub.openInNewTab ? "noopener noreferrer" : undefined}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              "text-xs font-sans font-semibold tracking-widest uppercase py-1 transition-colors block",
                              isActive(sub) ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.nav>
            </div>

            {/* Bottom Contact and Social Panel */}
            <div className="w-full border-t border-border/20 py-8 px-6 flex flex-col items-center gap-5 text-center bg-background/40">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center text-xs tracking-widest text-muted-foreground uppercase font-sans">
                {settings?.contactInfo?.phone && (
                  <a href={`tel:${settings.contactInfo.phone}`} className="hover:text-foreground transition-colors flex items-center gap-2">
                    <RiPhoneLine size={14} />
                    <span>{settings.contactInfo.phone}</span>
                  </a>
                )}
                {settings?.contactInfo?.phone && settings?.contactInfo?.email && (
                  <span className="hidden sm:inline text-border/60">|</span>
                )}
                {settings?.contactInfo?.email && (
                  <a href={`mailto:${settings.contactInfo.email}`} className="hover:text-foreground transition-colors flex items-center gap-2 lowercase tracking-wider">
                    <RiMailLine size={14} />
                    <span>{settings.contactInfo.email}</span>
                  </a>
                )}
              </div>

              {settings?.socialLinks && settings.socialLinks.filter((s: SocialLink) => s.url).length > 0 && (
                <div className="flex justify-center gap-3">
                  {settings.socialLinks
                    .filter((s: SocialLink) => s.url)
                    .map((social, i) => {
                      const Icon = socialIconMap[social.platform];
                      if (!Icon) return null;
                      return (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.platform}
                          className="flex h-9 w-9 items-center justify-center border border-border/40 hover:border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background rounded-none transition-all duration-300"
                        >
                          <Icon size={14} />
                        </a>
                      );
                    })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopNavItem({ item, active, isTransparent }: { item: NavItem; active: boolean; isTransparent: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isSubActive = item.subLinks?.some(sub => pathname === resolveHref(sub));
  const reallyActive = active || isSubActive;

  if (!item.subLinks || item.subLinks.length === 0) {
    return (
      <Link
        href={resolveHref(item)}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className={cn(
          "text-xs font-semibold tracking-widest uppercase transition-colors relative py-2",
          isTransparent 
            ? reallyActive ? "text-white font-bold" : "text-white/80 hover:text-white"
            : reallyActive ? "text-foreground font-bold" : "text-foreground/75 hover:text-foreground"
        )}
      >
        {item.label}
        {reallyActive && (
          <motion.span 
            layoutId="activeIndicator"
            className={cn(
              "absolute bottom-0 left-0 right-0 h-[1px]",
              isTransparent ? "bg-white" : "bg-foreground"
            )}
          />
        )}
      </Link>
    );
  }

  return (
    <div 
      className="relative group py-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={resolveHref(item)}
        className={cn(
          "flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition-colors",
          isTransparent 
            ? reallyActive ? "text-white font-bold" : "text-white/80 hover:text-white"
            : reallyActive ? "text-foreground font-bold" : "text-foreground/75 hover:text-foreground"
        )}
      >
        {item.label}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <RiArrowDownSLine size={14} />
        </motion.span>
      </Link>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full pt-3 min-w-[220px]"
          >
            {/* Absolute 0px border-radius and Stone drafting line design */}
            <div className="bg-background border border-border p-2 rounded-none shadow-none">
              {item.subLinks.map((sub, j) => {
                const subActive = pathname === resolveHref(sub);
                return (
                  <Link
                    key={j}
                    href={resolveHref(sub)}
                    target={sub.openInNewTab ? "_blank" : undefined}
                    rel={sub.openInNewTab ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center px-4 py-3 text-[10px] font-semibold tracking-widest uppercase rounded-none transition-colors",
                      subActive ? "text-primary bg-secondary" : "text-foreground/70 hover:text-foreground hover:bg-secondary/40"
                    )}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
