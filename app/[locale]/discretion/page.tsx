import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/i18n";
import { brand } from "@/config/brand";
import { localePath } from "@/lib/paths";
import { LatticeFrame, LatticeRule, StarMark } from "@/components/motif";
import { Reveal } from "@/components/motion/Reveal";
import { ToConfirm } from "@/components/ui/ToConfirm";

export const metadata: Metadata = {
  alternates: alternates("/discretion"),
  title: "Discretion, by design",
  description:
    "We never name our clients and never post their photographs. NDAs on request, enquiries seen only by your concierge, and a website without chat widgets or advertising cookies.",
};

const promises = [
  { title: "We never name our clients", body: "Not in conversation, not in marketing, not as a favour. The words on this site from guests carry no names, and never will." },
  { title: "We never post client photographs", body: "No social media, no case studies, no “as seen with”. If a photographer is with you, the pictures are yours alone." },
  { title: "Non-disclosure agreements, on request", body: "For you, your family and your staff. Our own team and the partners who serve you can sign one before your journey begins.", confirm: true },
  { title: "One concierge, and only them", body: "Your requests are handled by your concierge and the few colleagues they need. Partners receive only what is necessary to arrange what you asked for." },
] as const;

const site = [
  "No third-party chat widgets. When you write to us, you reach a person.",
  "No advertising or tracking cookies, and no cookie banner, because there is nothing to consent to.",
  "Fonts and images are served from our own domain, so your visit is not announced to anyone else.",
  "If we measure visits at all, it is with privacy-friendly analytics that use no cookies and store no personal data.",
  "What you send through Ask Aravia is used only to reply to you and arrange your journey.",
];

export default async function DiscretionPage({ params }: PageProps<"/[locale]/discretion">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="container-page pt-40 pb-32 sm:pt-48">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Discretion, by design</p>
        <h1 className="mt-6 text-display-lg">We never name our clients. They prefer it that way, and so do we.</h1>
        <p className="mt-8 text-lg text-ivory-300">
          Privacy is not a feature we add for some guests. It is how the house is run, for everyone, from the first message.
        </p>
      </header>

      <LatticeRule className="my-24" />

      <ul className="grid gap-px bg-midnight-800 md:grid-cols-2">
        {promises.map((p, i) => (
          <Reveal as="li" key={p.title} delay={(i % 2) * 0.1} className="bg-midnight-950 p-8 sm:p-12">
            <StarMark className="h-5 w-5 text-brass-400" />
            <h2 className="mt-6 font-display text-display-sm">
              {p.title}
              {"confirm" in p && p.confirm && <ToConfirm />}
            </h2>
            <p className="mt-4 text-ivory-300">{p.body}</p>
          </Reveal>
        ))}
      </ul>

      <section aria-labelledby="site-title" className="mt-32 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="site-title" className="text-display-md">
            On this website
          </h2>
          <p className="mt-6 text-ivory-300">The same discretion applies to the site you are reading.</p>
        </div>
        <ul className="space-y-6 lg:col-span-8">
          {site.map((s) => (
            <Reveal as="li" key={s} className="flex gap-4 border-b border-midnight-800 pb-6 text-ivory-300">
              <StarMark className="mt-2 h-3 w-3 shrink-0 text-brass-400" />
              <span>{s}</span>
            </Reveal>
          ))}
          <li className="text-sm text-ivory-500">
            How long we keep enquiries, and where they are stored, is set out in our{" "}
            <Link href={localePath(locale, "/legal/privacy-policy")} className="link-quiet text-ivory-300">
              privacy policy
            </Link>
            .<ToConfirm />
          </li>
        </ul>
      </section>

      <Reveal className="mx-auto mt-32 max-w-2xl">
        <LatticeFrame inset="0.75rem">
          <div className="border border-midnight-700 p-10 text-center">
            <p className="font-display text-display-sm">A question about privacy?</p>
            <p className="mt-4 text-ivory-300">
              Write to us at{" "}
              <a href={`mailto:${brand.contact.email}`} className="link-quiet text-sand-300">
                {brand.contact.emailDisplay}
              </a>
              . It will be read by a person, and answered by one.
            </p>
          </div>
        </LatticeFrame>
      </Reveal>
    </div>
  );
}
