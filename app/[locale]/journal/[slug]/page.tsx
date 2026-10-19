import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/config/i18n";
import { localePath } from "@/lib/paths";
import { formatDate, postBySlug, posts } from "@/lib/journal";
import { PageHero } from "@/components/ui/PageHero";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeRule } from "@/components/motif";
import { JsonLd } from "@/components/ui/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import { photos } from "@/data/photos";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  return p ? { title: p.title, description: p.description, openGraph: { type: "article", publishedTime: p.date }, alternates: alternates(`/journal/${p.slug}`) } : {};
}

export default async function JournalPost({ params }: PageProps<"/[locale]/journal/[slug]">) {
  const { locale, slug } = await params;
  const p = postBySlug(slug);
  if (!isLocale(locale) || !p) notFound();
  const others = posts.filter((o) => o.slug !== p.slug).slice(0, 3);
  const { Content } = p;

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          image: photos[p.photo].src,
          author: { "@type": "Organization", name: "Aravia" },
          publisher: { "@type": "Organization", name: "Aravia" },
          mainEntityOfPage: absoluteUrl(localePath(locale, `/journal/${p.slug}`)),
        }}
      />
      <PageHero
        top={
          <nav aria-label="Breadcrumb" className="text-xs tracking-[0.16em] font-medium text-ink-2 uppercase">
            <Link href={localePath(locale, "/journal")} className="link-quiet">
              Journal
            </Link>
          </nav>
        }
        eyebrow={`${p.tag} · ${formatDate(p.date)} · ${p.readingMinutes} min read`}
        title={p.title}
        photo={p.photo}
      />
      <div className="container-page pt-10 pb-24">
        <p className="mx-auto max-w-[68ch] font-display text-display-sm text-ink">{p.description}</p>
        <div className="prose-aravia prose-journal mx-auto mt-12 text-lg">
          <Content />
        </div>
        <div className="mx-auto mt-16 max-w-[68ch]">
          <LatticeRule />
          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl">Would you like this arranged?</p>
            <AskButton source="page" refId={`journal-${p.slug}`} prefill={p.title} className="btn-primary">
              Ask Aravia
            </AskButton>
          </div>
        </div>
      </div>
      <aside className="container-page pb-32" aria-labelledby="more-title">
        <h2 id="more-title" className="eyebrow">
          More from the Journal
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug} className="border-t border-line pt-5">
              <Link href={localePath(locale, `/journal/${o.slug}`)} className="link-quiet font-display text-xl">
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
