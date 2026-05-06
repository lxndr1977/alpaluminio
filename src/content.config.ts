import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { int } from "astro:schema";
// ─── Schemas reutilizáveis ────────────────────────────────────────────────────

const sectionBase = z.object({
  /** Identificador único da seção — usado para ordenação */
  id: z.string(),
  /** Se false, a seção é omitida mesmo estando no array sections */
  enabled: z.boolean().default(true),
});

// ─── Schemas de cada seção possível ──────────────────────────────────────────

const heroSchema = sectionBase.extend({
  id: z.literal("hero"),
  subtitle: z.string().optional(),
  title: z.string(),
  description: z.string(),
  /** Caminho relativo à pasta /public ou URL externa */
  image: z.string(),
});

const differentialsSchema = sectionBase.extend({
  id: z.literal("differentials"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  theme: z
    .enum(["white", "primary", "secondary", "transparent", "surface"])
    .default("secondary"),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      iconSize: z.number().int().optional(),
      iconStroke: z.number().int().optional(),
    }),
  ),
});

const contentSchema = sectionBase.extend({
  id: z.literal("content"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  body: z.string(),
  image: z.string().optional(),
  theme: z.enum(["white", "surface", "primary"]).default("white"),
});

const mediaTextSchema = sectionBase.extend({
  id: z.literal("mediaText"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  body: z.string(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  imageAspect: z.enum(["auto", "square", "video", "4/3", "3/2", "3/4", "4/5"]).default("4/3"),
  desktopImagePosition: z.enum(["left", "right"]).default("left"),
  mobileImagePosition: z.enum(["top", "bottom"]).default("top"),
  stickyImage: z.boolean().default(false),
  theme: z.enum(["white", "surface", "primary"]).default("white"),
});

const videoSchema = sectionBase.extend({
  id: z.literal("video"),
  mp4Src: z.string().optional(),
  videoId: z.string().optional(), // YouTube ID
  aspectRatio: z
    .enum(["4/3", "3/4", "4/5", "16/9", "9/16", "1/1", "3/2", "2/3"])
    .default("3/4"),
  eyebrow: z.string(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  thumbnail: z.string().optional(),
  theme: z.enum(["white", "surface", "primary"]).default("white"),
});

const photoGallerySchema = sectionBase.extend({
  id: z.literal("photoGallery"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  theme: z.enum(["white", "surface", "primary"]).default("white"),
  cols: z.number().default(4),
  aspect: z
    .enum(["4/3", "3/4", "16/9", "9/16", "1/1", "3/2", "2/3"])
    .default("3/4"),
  photos: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    }),
  ),
});

const finishesGallerySchema = sectionBase.extend({
  id: z.literal("finishesGallery"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  headerAlign: z.enum(["left", "center", "right"]).default("center"),
  photos: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      image: z.string(),
    }),
  ),
  colsMobile: z.number().optional(),
  colsTablet: z.number().optional(),
  colsDesktop: z.number().optional(),
  theme: z.enum(["white", "surface", "primary"]).default("white"),
  showPhotoTitle: z.boolean().default(false),
  showPhotoSubtitle: z.boolean().default(false),
  size: z
    .enum(["compact", "content", "large", "container", "full"])
    .default("container")
    .optional(),
});

const techSpecsSchema = sectionBase.extend({
  id: z.literal("techSpecs"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  theme: z.enum(["white", "surface", "primary"]).default("surface"),
  specGroups: z.array(
    z.object({
      category: z.string(),
      rows: z.array(
        z.object({
          param: z.string(),
          value: z.string(),
        }),
      ),
    }),
  ),
});

const faqSchema = sectionBase.extend({
  id: z.literal("faq"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  theme: z.enum(["white", "surface", "primary"]).default("white"),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
});

const documentationSchema = sectionBase.extend({
  id: z.literal("documentation"),
  title: z.string(),
  subtitle: z.string().optional(),
  theme: z.enum(["white", "surface", "primary"]).default("white"),
  size: z
    .enum(["compact", "content", "large", "container", "full"])
    .default("container")
    .optional(),
  colsDesktop: z.number().optional(),
  colsTablet: z.number().optional(),
  colsMobile: z.number().optional(),
  layout: z.enum(["list", "grid"]).default("grid"),
  documents: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
      type: z.enum(["pdf", "doc", "xls", "image", "other"]).default("pdf"),
      size: z.string().optional(),
      updatedAt: z.string().optional(),
    }),
  ),
});

const socialProofSchema = sectionBase.extend({
  id: z.literal("socialProof"),
  title: z.string(),
  eyebrow: z.string().optional(),
  layout: z.enum(["carousel", "grid"]).default("carousel"),
  theme: z.enum(["white", "surface", "primary"]).default("white"),
  testimonials: z.array(
    z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string().optional(),
      company: z.string().optional(),
      avatar: z.string().optional(),
      rating: z.number().min(1).max(5).default(5),
    }),
  ),
});

const ctaSchema = sectionBase.extend({
  id: z.literal("cta"),
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  ctaText: z.string().optional(),
  productName: z.string().optional(),
  paddingTop: z.enum(["none", "sm", "md", "lg", "xl"]).default("md"),
  paddingBottom: z.enum(["none", "sm", "md", "lg", "xl"]).default("md"),
  margin: z.enum(["none", "sm", "md", "lg", "xl"]).default("md"),
  theme: z.enum(["white", "surface", "primary"]).default("white"),
  size: z
    .enum(["compact", "content", "large", "container", "full"])
    .default("container"),
});

const relatedProductsSchema = sectionBase.extend({
  id: z.literal("relatedProducts"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  theme: z.enum(["white", "surface", "primary"]).default("white"),

  /** Slugs de outros produtos na collection */
  productSlugs: z.array(z.string()),
});

// ─── Union discriminada por `id` ─────────────────────────────────────────────

const sectionSchema = z.discriminatedUnion("id", [
  heroSchema,
  differentialsSchema,
  contentSchema,
  videoSchema,
  photoGallerySchema,
  finishesGallerySchema,
  techSpecsSchema,
  faqSchema,
  documentationSchema,
  socialProofSchema,
  ctaSchema,
  relatedProductsSchema,
  mediaTextSchema,
]);

const categories = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/categories" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

const segments = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/segments" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/products" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    mainPhoto: z.string(),
    /** Meta para SEO */
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        ogImage: z.string().optional(),
      })
      .optional(),
    /** StickyBar */
    stickyBar: z
      .object({
        message: z.string().default("Solicite um orçamento"),
        subMessage: z.string().optional(),
        ctaLabel: z.string().default("Falar no WhatsApp"),
        whatsappNumber: z.string().optional(),
      })
      .optional(),
    /**
     * Array ordenado de seções.
     * A posição no array define a ordem de renderização na página.
     * Seções com `enabled: false` são ignoradas.
     */
    sections: z.array(sectionSchema),
    categories: z.array(reference("categories")).default([]),
    segments: z.array(reference("segments")).default([]),
  }),
});

export const collections = { products, categories, segments };
