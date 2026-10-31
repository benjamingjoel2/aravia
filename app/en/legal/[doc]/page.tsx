import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import { notFound } from "next/navigation";
import { legalBySlug, legalDocs } from "@/lib/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ doc: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/legal/[doc]">): Promise<Metadata> {
  const { doc } = await params;
  const d = legalBySlug[doc];
  return d ? { title: d.title, alternates: alternates(`/legal/${d.slug}`) } : {};
}

export default async function LegalPage({ params }: PageProps<"/en/legal/[doc]">) {
  const { doc } = await params;
  const d = legalBySlug[doc];
  if (!d) notFound();

  return (
    <article className="container-page pt-40 pb-32 sm:pt-48">
      <header className="max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-6 text-display-lg">{d.title}</h1>
        <p className="mt-6 text-sm text-ink-3">
          Last updated {d.updated}.
        </p>
      </header>
      <div className="prose-aravia mt-16">
        {d.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
