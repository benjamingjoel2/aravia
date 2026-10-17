import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/i18n";
import { localePath } from "@/lib/paths";
import { formatDate, posts } from "@/lib/journal";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from our concierges on travelling the Arab world well: when to go, how to combine places, and how to be a good guest.",
};

export default async function JournalIndex({ params }: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [lead, ...rest] = posts;
  const href = (slug: string) => localePath(locale, `/journal/${slug}`);

  return (
    <div className="container-page pt-40 pb-32 sm:pt-48">
      <header className="max-w-3xl">
        <p className="eyebrow">Journal</p>
        <h1 className="mt-6 text-display-lg">
          Notes from <em className="text-sand-300">the way through.</em>
        </h1>
      </header>

      <Reveal className="mt-16">
        <Link href={href(lead.slug)} className="group grid gap-8 lg:grid-cols-12 lg:items-end">
          <span className="relative block aspect-[16/10] overflow-hidden lg:col-span-7">
            <Photo name={lead.photo} sizes="(min-width: 1024px) 58vw, 100vw" alt="" className="transition-transform duration-[1800ms] ease-sand group-hover:scale-[1.04]" />
          </span>
          <span className="block lg:col-span-5">
            <span className="text-xs tracking-[0.22em] text-sand-300 uppercase">
              {lead.tag} · {formatDate(lead.date)}
            </span>
            <span className="mt-4 block font-display text-display-md transition-colors duration-700 group-hover:text-brass-300">{lead.title}</span>
            <span className="mt-4 block text-ivory-300">{lead.description}</span>
          </span>
        </Link>
      </Reveal>

      <ul className="mt-24 border-t border-midnight-800">
        {rest.map((p) => (
          <Reveal as="li" key={p.slug} className="border-b border-midnight-800">
            <Link href={href(p.slug)} className="group grid items-center gap-4 py-8 sm:grid-cols-[10rem_1fr_auto] sm:gap-10">
              <span className="relative hidden aspect-[4/3] overflow-hidden sm:block">
                <Photo name={p.photo} sizes="160px" alt="" />
              </span>
              <span>
                <span className="text-xs tracking-[0.22em] text-sand-300 uppercase">
                  {p.tag} · {p.readingMinutes} min
                </span>
                <span className="mt-2 block font-display text-display-sm transition-colors duration-700 group-hover:text-brass-300">{p.title}</span>
                <span className="mt-2 block max-w-2xl text-sm text-ivory-300">{p.description}</span>
              </span>
              <span aria-hidden className="hidden text-2xl text-ivory-500 transition-transform duration-700 group-hover:translate-x-1 sm:block rtl:rotate-180">
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
