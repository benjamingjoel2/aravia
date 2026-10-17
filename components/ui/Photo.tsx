import Image from "next/image";
import { photos, type PhotoKey } from "@/data/photos";

type Props = {
  name: PhotoKey;
  /** Responsive sizes hint, e.g. "100vw" or "(min-width: 1024px) 33vw, 100vw". */
  sizes: string;
  className?: string;
  /** Load early: for the first, largest image on a page. */
  preload?: boolean;
  /** Override the alt text, or pass "" when the photo is purely decorative. */
  alt?: string;
};

/** A photograph filling its positioned parent. */
export function Photo({ name, sizes, className = "", preload = false, alt }: Props) {
  const p = photos[name];
  return (
    <Image
      src={p.src}
      alt={alt ?? p.alt}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${className}`}
    />
  );
}
