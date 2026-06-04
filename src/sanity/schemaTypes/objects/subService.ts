import { defineField, defineType } from "sanity";

export const subServiceType = defineType({
  name: "subService",
  title: "Alt Bölüm / Hizmet Detayı",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      description: "Örn: Salon, Mutfak, Peyzaj, Havuz",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 4,
      description: "Bu bölüm veya alt hizmet hakkında kısa açıklama.",
    }),
    defineField({
      name: "image",
      title: "Görsel",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Metni (SEO)",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Başlıksız Alt Bölüm",
        subtitle: "Hizmet Alt Bölümü",
        media,
      };
    },
  },
});
