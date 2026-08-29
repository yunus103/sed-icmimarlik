<div align="right">
  <a href="./README.md">
    <img src="https://img.shields.io/badge/English_EN-374151?style=for-the-badge" alt="English" />
  </a>
  <img src="https://img.shields.io/badge/Türkçe_TR-2563EB?style=for-the-badge" alt="Türkçe" />
</div>

# SED İç Mimarlık — Dijital Mimari & Web Platformu

**SED İç Mimarlık** stüdyosu için özel olarak tasarlanıp geliştirilmiş, kurumsal düzeyde ve portfolyo odaklı modern bir web platformudur. Next.js 16 App Router, React 19, Tailwind CSS v4 ve Sanity Headless CMS v5 mimarisiyle inşa edilen bu sistem; üst düzey görsel estetik, anlık sayfa yükleme performansı, granüler on-demand ISR önbellekleme ve kurumsal SEO altyapısı sunar.

---

## 🏗 Mimari ve Teknoloji Yığını

| Katman | Teknoloji / Kütüphane | Kullanım Amacı & Entegrasyon |
|---|---|---|
| **Ana Framework** | Next.js 16 + React 19 | App Router, Server Components (RSC), Dinamik Rota Grupları `(site)` |
| **İçerik Yönetimi (CMS)** | Sanity Studio v5 (`next-sanity`) | Entegre headless CMS (`/studio`), özel şemalar, singleton sayfalar, medya yöneticisi |
| **Tip Güvenliği & Env** | TypeScript 5 + Zod + `@t3-oss/env-nextjs` | Şema validasyonu, derleme ve çalışma zamanı (runtime) ortam değişkeni güvenliği |
| **Tasarım & Arayüz** | Tailwind CSS v4 + `@base-ui/react` (shadcn/ui) | Utility-first stil mimarisi, CSS değişkenleriyle tema yönetimi, erişilebilir headless UI |
| **Tipografi** | `next/font/google` | *Bodoni Moda* (Serif) ve *Hanken Grotesk* (Sans) harmanlı editoryal tipografi |
| **Hareket & Animasyon** | Framer Motion v12 + `nextjs-toploader` | Görünüm alanı efektleri, yumuşak geçişler, marka renkli sayfa yükleme çubuğu |
| **Önbellek & Revalidation** | Next.js Cache Tags + `@sanity/webhook` | Kriptografik imzalı webhook'larla tetiklenen anlık on-demand ISR |
| **İletişim & Mail API** | Nodemailer + Özel Rate Limiter | SMTP e-posta gönderimi, IP tabanlı rate limit, honeypot bot tuzağı, XSS koruması |
| **SEO & Yapılandırılmış Veri** | Özel SEO Katmanı + Schema.org JSON-LD | Otomatik OpenGraph, dinamik XML sitemap, yerel işletme ve makale zengin kartları |

---

## ⚡ Temel Modüller ve Fonksiyonel Özellikler

- **İnteraktif Portfolyo & Proje Galerisi (`/projeler`)**: Sanity görsel optimizasyon hattı (odak noktası/kırpma koruması, LQIP düşük çözünürlüklü bulanık yükleme) ve yönetim panelinden dinamik kapatılıp açılabilen modül yapısı.
- **Kapsamlı Hizmet Tanıtımları (`/hizmetler`)**: Tasarım aşamaları, alt hizmet detayları ve proje süreçlerini içeren dinamik servis sayfaları.
- **Editoryal Blog & Makale Merkezi (`/blog`)**: Kategori bazlı filtreleme, PortableText zengin metin/görsel işleme ve dinamik indeksleme.
- **Entegre Sanity Studio (`/studio`)**: Harici bir panele gerek kalmadan Next.js içerisinde doğrudan çalışan Sanity Studio v5 yönetim arayüzü.
- **Dinamik SSS & İnteraktif Alanlar**: Arama motoru botlarının kapalı cevapları da tarayabilmesi için DOM'da saklanan ve `FAQPage` JSON-LD şeması üreten akordeon sistemi.
- **Müşteri Talebi & İletişim Sistemi (`/iletisim`)**: Çift yönlü e-posta bildirimi (yöneticiye bildirim + müşteriye anlık teyit maili) ve doğrudan WhatsApp hızlı erişim butonu.

---

## 🗺 Yönlendirme (Routing) ve Sayfa Mimarisi

Uygulama, Next.js App Router rota gruplama yapısı sayesinde kullanıcı arayüzünü ve gömülü CMS panelini birbirinden izole eder:

```text
src/app/
├── (site)/                  # Ziyaretçilere açık kullanıcı arayüzü katmanı
│   ├── page.tsx             # Ana sayfa (Hero, Hizmetler, Projeler, Referanslar)
│   ├── hakkimizda/          # Kurumsal hikaye, vizyon/misyon ve mimari ekip
│   ├── hizmetler/           # Hizmetler dizini ve dinamik [slug] detay sayfaları
│   ├── projeler/            # Portfolyo galerisi ve dinamik [slug] proje detayları
│   ├── blog/                # Blog listesi ve dinamik [slug] makale okuyucu
│   └── iletisim/            # İletişim bilgileri ve teklif/talep formu
├── studio/[[...tool]]/      # Gömülü Sanity Studio v5 yönetim paneli
├── api/
│   ├── contact/             # Güvenli form gönderim API rotası
│   └── revalidate/          # On-demand ISR webhook uç noktası
├── sitemap.ts               # Dinamik XML sitemap oluşturucu
└── robots.ts                # Arama motoru tarama kuralları
```

---

## 🔄 Önbellekleme, On-Demand ISR ve SEO Standartları

### Anlık Önbellek Yenileme (On-Demand ISR)
Sanity Studio üzerinden yapılan içerik değişiklikleri `/api/revalidate` rotasına güvenli bir POST webhook gönderir. `@sanity/webhook` paketi ile imza doğrulandıktan sonra yalnızca etkilenen Next.js etiketleri anında yenilenir:
- **Genel Düzen**: `layout` (`siteSettings`, `navigation`)
- **Sabit Sayfalar**: `home`, `about`, `contact`, `servicesPage`, `projectsPage`, `blogPage`
- **Dinamik Koleksiyonlar**: `service:list`, `service:detail:[slug]`, `project:list`, `project:detail:[slug]`, `blog:list`, `blog:detail:[slug]`
- **Sitemap Güncellemesi**: Yeni sayfa eklendiğinde veya slug değiştiğinde `/sitemap.xml` önbelleği anında temizlenir.

### Kurumsal SEO & Yapılandırılmış Veri (JSON-LD)
- **Schema.org Mikro Verileri**: `HomeAndConstructionBusiness`, `Organization`, `WebSite`, `Article`, `Service`, `CreativeWork`, `FAQPage` ve `BreadcrumbList` şemaları sayfalara otomatik olarak enjekte edilir.
- **Dinamik Meta Etiketleri**: `getSiteUrl()` ile güvenli canonical URL tespiti, otomatik OpenGraph görselleri, Twitter kartları ve Google Tag Manager / Google Analytics desteği.

---

## 📁 Proje Dizin Yapısı

```text
src/
├── app/                     # Next.js App Router sayfaları, düzenleri ve API rotaları
├── components/
│   ├── blog/                # Blog filtreleme ve kategori bileşenleri
│   ├── forms/               # Doğrulamalı ve honeypot korumalı iletişim formu
│   ├── home/                # Ana sayfa modülleri (Hero, Süreç, CTA vb.)
│   ├── layout/              # Header, Footer, PageHero ve WhatsApp butonu
│   ├── seo/                 # Dinamik Schema.org JSON-LD bileşenleri
│   └── ui/                  # Yeniden kullanılabilir UI kütüphanesi (SanityImage, RichText, FAQ vb.)
├── lib/
│   ├── env.ts               # T3 Env ve Zod ile tip güvenli ortam değişkeni kontrolü
│   ├── seo.ts               # Canonical URL ve meta veri oluşturucu yardımcılar
│   └── utils.ts             # Slugify, tarih biçimlendirme ve class birleştirme
├── sanity/
│   ├── lib/                 # GROQ sorguları, görsel derleyici, Sanity istemcisi
│   ├── plugins/             # Singleton kilitleme ve stüdyo eklentileri
│   ├── schemaTypes/         # Sanity şemaları (Dökümanlar, Singletonlar, Objeler)
│   └── structure.ts         # Sanity Studio sol menü ağaç yapısı
└── types/                   # CMS modelleri için kapsamlı TypeScript arayüzleri
```

---

## 🛡 Güvenlik ve Mühendislik Standartları

- **Katı Ortam Değişkeni Doğrulaması**: Sunucu ve istemci değişkenleri `@t3-oss/env-nextjs` ve `Zod` ile başlatma anında sıkı denetimden geçirilir.
- **Çok Katmanlı API Güvenliği**:
  - İletişim uç noktasında IP bazlı kayan pencere (sliding-window) rate limit (`IP başına 10 dakikada 5 istek`).
  - Botları ve spam gönderimlerini engellemek için honeypot alanı.
  - 50 KB gövde boyutu sınırı ve e-posta şablonlarında XSS saldırılarına karşı HTML entity dönüştürme.
- **Sıfır Gizli Anahtar Sızıntısı**: Tüm environment varyasyonlarını (`.env*`, `.env.local` vb.) kapsayan güvenli `.gitignore` yapılandırması.
