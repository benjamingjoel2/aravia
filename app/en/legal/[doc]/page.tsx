import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { legalBySlug, legalDocs } from "@/lib/legal";

/** Renders [label](/path) links inside a legal paragraph. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <Link key={i} href={m[2]} className="underline underline-offset-4">
            {m[1]}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}

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
              <p key={p}>
                <RichText text={p} />
              </p>
            ))}
            {s.table && (
              <div className="my-8 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr>
                      {s.table.head.map((c) => (
                        <th key={c} scope="col" className="border-b border-ink/25 py-2 pr-4 align-bottom font-medium">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r) => (
                      <tr key={r.join("|")}>
                        {r.map((c, i) => (
                          <td key={i} className="border-b border-ink/10 py-2 pr-4 align-top">
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.after?.map((p) => (
              <p key={p}>
                <RichText text={p} />
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
