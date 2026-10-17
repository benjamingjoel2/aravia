import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/** Journal typography. Posts are wrapped in .prose-aravia; these add the details. */
const components: MDXComponents = {
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} rel="noopener noreferrer">
        {children}
      </a>
    ),
  blockquote: ({ children }) => (
    <blockquote className="border-s border-brass-400/60 ps-6 font-display text-2xl leading-snug text-ivory-50">{children}</blockquote>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
