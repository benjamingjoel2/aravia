import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/config/i18n";

/** Send locale-less paths to the default locale. Accept-Language negotiation can be added once more locales are enabled. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;
  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
