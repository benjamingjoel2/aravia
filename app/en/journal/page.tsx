import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import Link from "next/link";
import { localePath } from "@/lib/paths";
import { formatDate, posts } from "@/lib/journal";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { locale } from "@/config/locale";

export const metadata: Metadata = {
  alternates: alternates("/journal"),
  title: "Journal",
  description: "Notes from our concierges on travelling the Arab world well: when to go, how to combine places, and how to be a good guest.",
};

export default async function JournalIndex() {
  const [lead, ...rest] = posts;
  const href = (slug: string) => localePath(locale, `/journal/${slug}`);

  return (
    <div className="container-page pt-40 pb-32 sm:pt-48">
      <header className="max-w-3xl">
        <p className="eyebrow">Journal</p>
        <h1 className="mt-6 text-display-lg">
          Notes from <em className="text-accent">the way through.</em>
        </h1>
      </header>

      <Reveal className="mt-16">
        <Link href={href(lead.slug)} className="group grid gap-8 lg:grid-cols-12 lg:items-end">
          <span className="relative block aspect-[16/10] overflow-hidden lg:col-span-7">
            <Photo name={lead.photo} sizes="(min-width: 1024px) 58vw, 100vw" alt="" className="transition-transform duration-[1800ms] ease-sand group-hover:scale-[1.04]" />
          </span>
          <span className="block lg:col-span-5">
            <span className="text-xs tracking-[0.16em] font-medium text-accent uppercase">
              {lead.tag} · {formatDate(lead.date)}
            </span>
            <span className="mt-4 block font-display text-display-md transition-colors duration-700 group-hover:text-accent">{lead.title}</span>
            <span className="mt-4 block text-ink-2">{lead.description}</span>
          </span>
        </Link>
      </Reveal>

      <ul className="mt-24 border-t border-line">
        {rest.map((p) => (
          <Reveal as="li" key={p.slug} className="border-b border-line">
            <Link href={href(p.slug)} className="group grid items-center gap-4 py-8 sm:grid-cols-[10rem_1fr_auto] sm:gap-10">
              <span className="relative hidden aspect-[4/3] overflow-hidden sm:block">
                <Photo name={p.photo} sizes="160px" alt="" />
              </span>
              <span>
                <span className="text-xs tracking-[0.16em] font-medium text-accent uppercase">
                  {p.tag} · {p.readingMinutes} min
                </span>
                <span className="mt-2 block font-display text-display-sm transition-colors duration-700 group-hover:text-accent">{p.title}</span>
                <span className="mt-2 block max-w-2xl text-sm text-ink-2">{p.description}</span>
              </span>
              <span aria-hidden className="hidden text-2xl text-ink-3 transition-transform duration-700 group-hover:translate-x-1 sm:block rtl:rotate-180">
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
