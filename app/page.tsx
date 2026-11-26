import { Hero } from "@/components/home/hero";
import { BrandStrip } from "@/components/home/brand-strip";
import { About } from "@/components/home/about";
import { Stats } from "@/components/home/stats";
import { FeaturedWork } from "@/components/home/featured-work";
import { Services } from "@/components/home/services";
import { Process } from "@/components/home/process";
// import { Studio } from "@/components/home/studio";
import { Pricing } from "@/components/home/pricing";
import { Team } from "@/components/home/team";
import { Testimonials } from "@/components/home/testimonials";
import { BlogPreview } from "@/components/home/blog-preview";
import { CallToAction } from "@/components/layout/cta";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <BrandStrip />
      <About />
      <Stats />
      <FeaturedWork />
      <Services />
      <Process />
      {/* <Studio /> */}
      <Pricing />
      <Team />
      <Testimonials />
      <BlogPreview />
      <CallToAction />
    </main>
  );
}
