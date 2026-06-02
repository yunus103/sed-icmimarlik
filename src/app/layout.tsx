import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

import { client } from "@/sanity/lib/client";
import { layoutQuery } from "@/sanity/lib/queries";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import NextTopLoader from "nextjs-toploader";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await client.fetch(layoutQuery, {}, { next: { tags: ["layout"] } });

  return (
    <html lang="tr" className={`${bodoniModa.variable} ${hankenGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {/* Sayfa geçişlerinde üstte ince ilerleme çubuğu — marka rengi kullanır */}
        <NextTopLoader
          color="var(--primary)"
          height={3}
          showSpinner={false}
          shadow={false}
          speed={200}
          crawlSpeed={200}
        />
        {settings?.gtmId && <GoogleTagManager gtmId={settings.gtmId} />}
        {settings?.gaId && <GoogleAnalytics gaId={settings.gaId} />}
        <JsonLd data={organizationJsonLd(settings)} />
        <JsonLd data={websiteJsonLd(settings)} />
        {children}
      </body>
    </html>
  );
}
