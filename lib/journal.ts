import type { ComponentType } from "react";
import type { PhotoKey } from "@/data/photos";
import * as alula from "@/content/journal/alula-before-everyone-else-arrives.mdx";
import * as petraGulf from "@/content/journal/combining-petra-and-the-gulf.mdx";
import * as season from "@/content/journal/the-season-month-by-month.mdx";
import * as ramadan from "@/content/journal/ramadan-as-a-guest.mdx";

export type PostMeta = { title: string; description: string; date: string; readingMinutes: number; photo: PhotoKey; tag: string };
export type Post = PostMeta & { slug: string; Content: ComponentType };

type Module = { default: ComponentType; meta: PostMeta };

const modules: Record<string, Module> = {
  "alula-before-everyone-else-arrives": alula as unknown as Module,
  "combining-petra-and-the-gulf": petraGulf as unknown as Module,
  "the-season-month-by-month": season as unknown as Module,
  "ramadan-as-a-guest": ramadan as unknown as Module,
};

/** Newest first. */
export const posts: Post[] = Object.entries(modules)
  .map(([slug, m]) => ({ slug, ...m.meta, Content: m.default }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
