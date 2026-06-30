import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Statik veya kontrol gerektirmeyen root seviye yollar.
// NOT: Kod tarafında yeni bir sabit sayfa (klasör) eklerseniz buraya eklemelisiniz.
const staticRoutes = new Set([
  "",
  "hakkimizda",
  "iletisim",
  "blog",
  "hizmetler",
  "projeler",
  "studio",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

// Botların taradığı zararlı dosya uzantıları
const suspiciousExtensions = /\.(php|asp|aspx|jsp|env|git|zip|gz|tar|rar|yaml|yml|conf|ini|sql|db)$/i;

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  
  // 1. Zararlı olabilecek dosya uzantısı isteklerini anında Edge'de abort et
  if (suspiciousExtensions.test(pathname)) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }

  // 2. Api, NextJS iç ve studio isteklerini es geç
  if (
    pathname.startsWith("/api") || 
    pathname.startsWith("/_next") || 
    pathname.startsWith("/studio")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  
  // Kontrol edilecek dinamik rota durumları
  let shouldCheck = false;
  let targetSlug = "";

  if (segments.length === 1) {
    // Root level dynamic: /[slug] (static olanlar hariç, örn: /iletisim hariç)
    if (!staticRoutes.has(segments[0])) {
      shouldCheck = true;
      targetSlug = segments[0];
    }
  } else if (segments.length === 2) {
    // Sub level dynamic: /hizmetler/[slug] veya /projeler/[slug]
    if (segments[0] === "hizmetler" || segments[0] === "projeler") {
      shouldCheck = true;
      targetSlug = segments[1];
    }
  }

  if (shouldCheck && targetSlug) {
    try {
      // CDN'de önbelleğe alınmış slug listesini çek (CDN hit olacağı için 0 CPU harcar)
      const res = await fetch(new URL("/api/valid-slugs", request.url));
      if (res.ok) {
        const data = await res.json();
        const validSlugs = new Set(data.slugs || []);
        
        // Eğer slug geçerli listede yoksa, Vercel Serverless Function'ı çalıştırmadan anında abort et
        if (!validSlugs.has(targetSlug)) {
          return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
        }
      }
    } catch (error) {
      // Olası bir hata durumunda kullanıcı deneyimini bozmamak adına isteğe izin ver
      console.error("Proxy fetch error:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Statik kaynaklar haricindeki tüm sayfa isteklerini yakala
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|css|js)).*)",
  ],
};
