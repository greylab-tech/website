import type { Metadata } from "next";
import { InternalHero } from "@/components/projects/internal-hero";
import { CallToAction } from "@/components/layout/cta";

const description = "How the GreyLab website handles project briefs.";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — GreyLab" },
  description,
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="internal-page privacy-page">
      <InternalHero title="Privacy Policy" description={description} />
      <section className="privacy-section">
        <div className="container">
          <article className="privacy-content blog-rich-text">
            <h2>Project briefs</h2>
            <p>
              The project brief form turns your entries into a shareable text
              document in your browser.
            </p>
            <p>
              When you choose Copy project brief, your browser copies the text
              to your clipboard. If clipboard access is unavailable, the form
              shows the brief so you can copy it manually.
            </p>
            <p>
              Email this brief opens a draft addressed to GreyLab in your email
              app. You can review and send it there.
            </p>
            <h2>Site requests</h2>
            <p>
              The site host handles requests to load pages and assets. When you
              follow an external link, the destination handles any information
              you choose to share there.
            </p>
          </article>
        </div>
      </section>
      <CallToAction />
    </main>
  );
}
