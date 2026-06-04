import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Hakkımızda",
  type: "document",
  groups: [
    { name: "hero", title: "Page Hero Bölümü" },
    { name: "content", title: "Marka Hikayesi" },
    { name: "approach", title: "Yaklaşımımız" },
    { name: "whyUs", title: "Neden Biz?" },
    { name: "visionMission", title: "Vizyon & Misyon" },
    { name: "team", title: "Ekibimiz" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Page Hero Group
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", group: "hero", description: "Sayfa üst kısmında duracak ana başlık. Boş bırakılırsa Sayfa Başlığı kullanılır." }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık / Kısa Açıklama", type: "text", rows: 2, group: "hero", description: "Sayfa üst kısmında duracak kısa açıklama yazısı." }),
    defineField({
      name: "heroImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
      description: "Hero arka plan resmi. Yüklenmezse şık bir degrade renk arka planı kullanılır."
    }),
    
    // Brand Story Content Group
    defineField({ name: "pageTitle", title: "Hikaye Başlığı", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({ name: "pageSubtitle", title: "Hikaye Giriş Alt Başlığı", type: "text", rows: 2, group: "content" }),
    defineField({ name: "body", title: "Detaylı Hikaye Metni", type: "array", of: [{ type: "block" }], group: "content" }),
    defineField({
      name: "mainImage",
      title: "Hikaye Görseli (Yandaki Resim)",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
    }),

    // Approach Group
    defineField({ name: "approachTitle", title: "Yaklaşım Başlığı", type: "string", group: "approach", initialValue: "Yaklaşımımız" }),
    defineField({
      name: "approachPillars",
      title: "Yaklaşım Sütunları",
      type: "array",
      group: "approach",
      of: [
        {
          type: "object",
          name: "pillar",
          title: "Sütun",
          fields: [
            defineField({ name: "number", title: "Numara", type: "string", description: "Örn: 01, 02" }),
            defineField({ name: "title", title: "Başlık", type: "string" }),
            defineField({ name: "description", title: "Açıklama", type: "text", rows: 3 }),
          ],
        },
      ],
    }),

    // Why Us Group
    defineField({ name: "whyUsTitle", title: "Neden Biz Başlığı", type: "string", group: "whyUs", initialValue: "Neden Biz?" }),
    defineField({ name: "whyUsSubtitle", title: "Neden Biz Alt Başlığı", type: "text", rows: 2, group: "whyUs" }),
    defineField({
      name: "whyUsPoints",
      title: "Öne Çıkan Özellikler",
      type: "array",
      group: "whyUs",
      of: [
        {
          type: "object",
          name: "point",
          title: "Özellik",
          fields: [
            defineField({ name: "title", title: "Başlık", type: "string" }),
            defineField({ name: "description", title: "Açıklama", type: "text", rows: 3 }),
          ],
        },
      ],
    }),

    // Vision & Mission Group
    defineField({ name: "visionTitle", title: "Vizyon Başlığı", type: "string", group: "visionMission", initialValue: "Vizyonumuz" }),
    defineField({ name: "visionText", title: "Vizyon Açıklaması", type: "text", rows: 4, group: "visionMission" }),
    defineField({ name: "missionTitle", title: "Misyon Başlığı", type: "string", group: "visionMission", initialValue: "Misyonumuz" }),
    defineField({ name: "missionText", title: "Misyon Açıklaması", type: "text", rows: 4, group: "visionMission" }),

    // Team Group
    defineField({ name: "teamTitle", title: "Ekip Başlığı", type: "string", group: "team", initialValue: "Ekibimiz" }),
    defineField({ name: "teamSubtitle", title: "Ekip Alt Başlığı", type: "text", rows: 2, group: "team" }),
    defineField({
      name: "teamMembers",
      title: "Ekip Üyeleri",
      type: "array",
      group: "team",
      of: [
        {
          type: "object",
          name: "member",
          title: "Üye",
          fields: [
            defineField({ name: "name", title: "İsim Soyisim", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "role", title: "Rolü / Unvanı", type: "string"}),
            defineField({
              name: "avatar",
              title: "Fotoğraf",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
            }),
          ],
        },
      ],
    }),

    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
