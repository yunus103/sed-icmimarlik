"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import { RiMenu3Line, RiCloseLine, RiArrowDownSLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

import { SiteSettings, Navigation, NavItem } from "@/types";

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Header({ settings, navigation }: { settings: SiteSettings; navigation: Navigation }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const links: NavItem[] = navigation?.headerLinks || [];

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
      setMenuOpen(false);
    }
  }, [pathname, menuOpen, setMenuOpen]);

  const isActive = (item: NavItem) => {
    const href = resolveHref(item);
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

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
            style={{ height: "4.5rem", minWidth: "120px", maxWidth: "340px", width: "auto" }}
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-border/30 md:hidden overflow-hidden bg-background text-foreground"
          >
            <nav className="container mx-auto flex flex-col gap-3 px-6 py-8">
              {links.map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={resolveHref(item)}
                      className={cn(
                        "text-xs font-semibold tracking-widest uppercase py-2 transition-colors",
                        isActive(item) ? "text-primary font-bold" : "text-foreground/85"
                      )}
                    >
                      {item.label}
                    </Link>
                  </div>
                  {item.subLinks && (
                    <div className="flex flex-col gap-2 pl-4 border-l border-border/30 ml-1 mt-1">
                      {item.subLinks.map((sub, j) => (
                        <Link
                          key={j}
                          href={resolveHref(sub)}
                          className={cn(
                            "text-[10px] font-semibold tracking-widest uppercase py-2 transition-colors",
                            isActive(sub) ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
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
