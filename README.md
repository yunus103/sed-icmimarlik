<div align="right">
  <img src="https://img.shields.io/badge/English_EN-2563EB?style=for-the-badge" alt="English" />
  <a href="./README.tr.md">
    <img src="https://img.shields.io/badge/Türkçe_TR-374151?style=for-the-badge" alt="Türkçe" />
  </a>
</div>

# SED İç Mimarlık — Digital Architecture & Web Platform

A bespoke, production-grade web platform and digital portfolio engineered for **SED Interior Architecture** (SED İç Mimarlık). Built with Next.js 16 App Router, React 19, Tailwind CSS v4, and Sanity Headless CMS v5, this platform delivers an editorial design aesthetic with lightning-fast performance, granular on-demand ISR caching, and enterprise-grade SEO architecture.

---

## 🏗 Architecture & Tech Stack

| Domain | Technology / Library | Purpose & Implementation |
|---|---|---|
| **Core Framework** | Next.js 16 + React 19 | App Router, Server Components (RSC), Dynamic Route Groups `(site)` |
| **Content Management** | Sanity Studio v5 (`next-sanity`) | Embedded headless CMS (`/studio`), custom schemas, singletons, media manager |
| **Type Safety & Env** | TypeScript 5 + Zod + `@t3-oss/env-nextjs` | Strict schema validation, compile-time & runtime environment safety |
| **Design & UI** | Tailwind CSS v4 + `@base-ui/react` (shadcn/ui) | Utility-first styling, CSS custom property theming, accessible headless UI |
| **Typography** | `next/font/google` | Editorial typography combining *Bodoni Moda* (Serif) & *Hanken Grotesk* (Sans) |
| **Motion & Micro-interactions** | Framer Motion v12 + `nextjs-toploader` | Smooth viewport reveals, staggered lists, branded route transition progress bar |
| **Cache & Revalidation** | Next.js Cache Tags + `@sanity/webhook` | On-demand ISR triggered via cryptographically signed webhooks |
| **Mail & Contact API** | Nodemailer + Custom Rate Limiter | SMTP dispatch, IP rate-limiting, honeypot protection, XSS escaping |
| **SEO & Structured Data** | Custom SEO Engine + Schema.org JSON-LD | Automated OpenGraph, dynamic sitemap, rich snippets for local business & articles |

---

## ⚡ Core Modules & Functional Capabilities

- **Interactive Portfolio & Project Gallery (`/projeler`)**: Dynamic showcases with Sanity image pipeline integration (hotspot/crop preservation, LQIP blur-up placeholders) and conditional category toggle.
- **Bespoke Services Showcase (`/hizmetler`)**: Structured service offerings detailing design phases, architectural sub-services, and custom client workflows.
- **Editorial Blog & Insights Engine (`/blog`)**: Content hub with category-based filtering, PortableText rich media rendering, and dynamic article indexing.
- **Embedded CMS Studio (`/studio`)**: Integrated Sanity Studio interface within the Next.js runtime for real-time editorial content authoring and publishing.
- **Dynamic FAQ & Interactive Sections**: Expandable FAQ accordion with DOM-preserved answers for search engine crawlers paired with `FAQPage` JSON-LD.
- **Lead Capture & Contact System (`/iletisim`)**: Validated contact form with dual-dispatch email alerts (admin notification + instant auto-reply) and direct WhatsApp action trigger.

---

## 🗺 Routing & Multi-Page Architecture

The application leverages the Next.js App Router route group structure to decouple public client experiences from the embedded CMS runtime:

```text
src/app/
├── (site)/                  # Public customer-facing application shell
│   ├── page.tsx             # Curated landing page (Hero, Services, Projects, Testimonials)
│   ├── hakkimizda/          # Company history, vision/mission, architectural team
│   ├── hizmetler/           # Services directory & dynamic [slug] detail pages
│   ├── projeler/            # Architectural portfolio & dynamic [slug] project cases
│   ├── blog/                # Insights magazine & dynamic [slug] article reader
│   └── iletisim/            # Contact hub & interactive inquiry form
├── studio/[[...tool]]/      # Embedded Sanity Studio v5 administrative cockpit
├── api/
│   ├── contact/             # Secure lead submission API route
│   └── revalidate/          # On-demand ISR webhook endpoint
├── sitemap.ts               # Dynamic XML sitemap generation
└── robots.ts                # Search engine crawler policies
```

---

## 🔄 Caching, On-Demand ISR & SEO Standards

### On-Demand Revalidation (ISR)
Content changes published in Sanity Studio trigger a secure POST webhook to `/api/revalidate`. Utilizing `@sanity/webhook` cryptographic signature verification, the endpoint invalidates targeted Next.js cache tags without full site rebuilds:
- **Global Layout**: `layout` (`siteSettings`, `navigation`)
- **Page Singletons**: `home`, `about`, `contact`, `servicesPage`, `projectsPage`, `blogPage`
- **Dynamic Collections**: `service:list`, `service:detail:[slug]`, `project:list`, `project:detail:[slug]`, `blog:list`, `blog:detail:[slug]`
- **Sitemap Invalidation**: Dynamically purges `/sitemap.xml` cache upon slug modifications or document creation/deletion.

### Enterprise SEO & Structured Data (JSON-LD)
- **Schema.org Rich Snippets**: Automated injection of `HomeAndConstructionBusiness`, `Organization`, `WebSite`, `Article`, `Service`, `CreativeWork`, `FAQPage`, and `BreadcrumbList`.
- **Dynamic Metadata**: Canonical URL normalization via `getSiteUrl()`, automated OpenGraph cards, Twitter preview cards, and Google Tag Manager / Analytics integrations.

---

## 📁 Directory Structure

```text
src/
├── app/                     # Next.js App Router pages, layouts, and API routes
├── components/
│   ├── blog/                # Blog filtering and categorization components
│   ├── forms/               # Validated contact form with honeypot & feedback states
│   ├── home/                # Modular landing page sections (Hero, Process, CTA, etc.)
│   ├── layout/              # Header, Footer, PageHero, and floating WhatsApp CTA
│   ├── seo/                 # Dynamic Schema.org JSON-LD generators
│   └── ui/                  # Accessible UI library (SanityImage, RichText, FAQ, Lightbox)
├── lib/
│   ├── env.ts               # Strict environment variable validation using T3 Env & Zod
│   ├── seo.ts               # Metadata builder with canonical URL fallback logic
│   └── utils.ts             # String slugification, date formatting, class merging
├── sanity/
│   ├── lib/                 # GROQ query registry, image builder, client instance
│   ├── plugins/             # Singleton locking and studio customization plugins
│   ├── schemaTypes/         # Sanity schemas (Documents, Singletons, Objects)
│   └── structure.ts         # Custom Desk Structure tree for Sanity Studio
└── types/                   # Comprehensive TypeScript definitions for all CMS models
```

---

## 🛡 Security & Engineering Standards

- **Strict Environment Validation**: All server and client environment variables are strongly typed and validated at boot using `@t3-oss/env-nextjs` and `Zod`.
- **API Defense-in-Depth**:
  - In-memory sliding-window IP rate limiting (`5 requests / 10 minutes / IP`) on public submission endpoints.
  - Honeypot form field integration for zero-friction bot mitigation.
  - Strict payload size limits (50 KB) and HTML entity escaping against XSS in email templates.
- **Zero Secret Leakage**: Strict `.gitignore` policy enforcing non-tracking of all environment files (`.env*`, `.env.local`, etc.).
