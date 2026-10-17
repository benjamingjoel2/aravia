import Link from "next/link";
import { StarMark } from "@/components/motif";

export function NotFoundContent({ homeHref }: { homeHref: string }) {
  return (
    <section className="container-page flex min-h-[80dvh] flex-col items-center justify-center py-32 text-center">
      <StarMark className="h-8 w-8 text-brass-400" />
      <p className="eyebrow mt-8">Not found</p>
      <h1 className="mt-6 max-w-2xl text-display-lg">This door is closed. Others are open.</h1>
      <p className="mt-6 max-w-md text-ivory-300">The page you were looking for has moved or never existed.</p>
      <Link href={homeHref} className="btn-quiet mt-12">
        Return home
      </Link>
    </section>
  );
}
