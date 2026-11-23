import manifest from "@/data/media.json";

interface MediaVariant {
  src: string;
  width: number;
  bytes: number;
}
interface MediaEntry {
  width: number;
  height: number;
  bytes: number;
  variants: MediaVariant[];
}
const images = manifest as Record<string, MediaEntry>;

/** Local exports need no image server; the browser selects its appropriate size. */
export function responsiveImage(src: string, sizes: string) {
  const image = images[src];
  if (!image?.variants.length) return { src };
  const fallback =
    image.variants.find((variant) => variant.width >= 800) ||
    image.variants.at(-1)!;
  return {
    src: fallback.src,
    srcSet: image.variants
      .map((variant) => `${variant.src} ${variant.width}w`)
      .join(", "),
    sizes,
  };
}

export const cardImageSizes =
  "(max-width: 809px) calc(100vw - 32px), (max-width: 1299px) calc(50vw - 84px), 400px";

export const detailImageSizes =
  "(max-width: 809px) calc(100vw - 32px), (max-width: 1299px) 62vw, 800px";
