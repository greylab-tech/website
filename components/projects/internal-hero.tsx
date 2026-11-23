import { SplitText } from "@/components/motion/split-text";
import { LiquidGradient } from "@/components/motion/liquid-gradient";
import { responsiveImage } from "@/lib/media";

interface InternalHeroProps {
  title: string;
  description?: string;
  detail?: boolean;
  image?: string;
}

export function InternalHero({
  title,
  description,
  detail = false,
  image,
}: InternalHeroProps) {
  return (
    <section
      className={`internal-hero ${detail ? "internal-hero--detail" : ""} ${image ? "internal-hero--article" : ""}`}
    >
      {!detail && <LiquidGradient className="internal-hero-gradient" />}
      {image && (
        <div className="internal-hero-image">
          <img {...responsiveImage(image, "100vw")} alt="" />
        </div>
      )}
      <div className="container internal-hero-content">
        <SplitText as="h1" className="internal-hero-title" text={title} />
        {description && (
          <SplitText
            as="p"
            className="internal-hero-description"
            text={description}
          />
        )}
      </div>
    </section>
  );
}
