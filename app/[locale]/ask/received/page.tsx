import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/i18n";
import { getDictionary } from "@/lib/i18n";
import { localePath } from "@/lib/paths";
import { StarMark } from "@/components/motif";

export const metadata: Metadata = { title: "Received", robots: { index: false } };

export default async function Received({ params, searchParams }: PageProps<"/[locale]/ask/received">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { channel } = await searchParams;
  const line = channel === "callback" ? dict.ask.sent.callback : dict.ask.sent.email;

  return (
    <section className="container-page flex min-h-[70dvh] flex-col items-center justify-center pt-32 pb-24 text-center">
      <StarMark className="h-8 w-8 text-brass-400" />
      <h1 className="mt-8 text-display-lg">{dict.ask.sentTitle}</h1>
      <p className="mt-6 max-w-md text-ivory-300">{line}</p>
      <Link href={localePath(locale, "/")} className="link-quiet mt-12 text-xs tracking-[0.28em] uppercase">
        {dict.nav.home}
      </Link>
    </section>
  );
}
