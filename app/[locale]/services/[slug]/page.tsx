import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/config/i18n";
import { localePath } from "@/lib/paths";
import { serviceBySlug, services } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { ToConfirm } from "@/components/ui/ToConfirm";
import { Reveal } from "@/components/motion/Reveal";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeFrame, LatticeRule, StarMark } from "@/components/motif";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug[slug];
  return s ? { title: s.name, description: s.summary } : {};
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = await params;
  const s = serviceBySlug[slug];
  if (!isLocale(locale) || !s) notFound();
  const i = services.indexOf(s);
  const next = services[(i + 1) % services.length];

  return (
    <>
      <PageHero
        top={
          <nav aria-label="Breadcrumb" className="text-xs tracking-[0.2em] text-ivory-300 uppercase">
            <Link href={localePath(locale, "/services")} className="link-quiet">
              What we arrange
            </Link>
          </nav>
        }
        title={s.name}
        photo={s.photo}
        intro={
          <>
            {s.summary}
            {s.confirm && <ToConfirm />}
          </>
        }
      />

      <section className="container-page grid gap-16 pt-12 pb-24 lg:grid-cols-12">
        <div className="space-y-6 text-lg text-ivory-300 lg:col-span-6">
          {s.body.map((p) => (
            <Reveal key={p}>
              <p>{p}</p>
            </Reveal>
          ))}
          <p className="pt-4 text-sm text-ivory-500">
            <span className="field-label me-3 inline">Where</span>
            {s.where}
          </p>
        </div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <LatticeFrame inset="0.75rem">
            <div className="border border-midnight-700 p-8 sm:p-10">
              <h2 className="eyebrow">What your concierge can arrange</h2>
              <ul className="mt-6 space-y-4">
                {s.includes.map((c) => (
                  <li key={c.text} className="flex gap-4 text-ivory-50">
                    <StarMark className="mt-1.5 h-3 w-3 shrink-0 text-brass-400" />
                    <span>
                      {c.text}
                      {c.confirm && <ToConfirm />}
                    </span>
                  </li>
                ))}
              </ul>
              <AskButton source="service" refId={s.slug} prefill={s.askPrompt} className="btn-brass mt-10 w-full">
                Ask Aravia
              </AskButton>
            </div>
          </LatticeFrame>
        </Reveal>
      </section>

      <section className="container-page pb-32">
        <LatticeRule className="mb-12" />
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-baseline">
          <Link href={localePath(locale, "/services")} className="link-quiet text-xs tracking-[0.28em] uppercase">
            ← Everything we arrange
          </Link>
          <Link href={localePath(locale, `/services/${next.slug}`)} className="group text-end">
            <span className="block text-xs tracking-[0.28em] text-ivory-500 uppercase">Next</span>
            <span className="mt-2 block font-display text-display-sm transition-colors duration-700 group-hover:text-brass-300">{next.name} →</span>
          </Link>
        </div>
      </section>
    </>
  );
}
