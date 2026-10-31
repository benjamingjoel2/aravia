import { NotFoundContent } from "@/components/ui/NotFoundContent";
import { locale } from "@/config/locale";
import { localePath } from "@/lib/paths";

export default function NotFound() {
  return <NotFoundContent homeHref={localePath(locale, "/")} />;
}
