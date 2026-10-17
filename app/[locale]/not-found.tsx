import { NotFoundContent } from "@/components/ui/NotFoundContent";
import { defaultLocale } from "@/config/i18n";

export default function NotFound() {
  return <NotFoundContent homeHref={`/${defaultLocale}`} />;
}
