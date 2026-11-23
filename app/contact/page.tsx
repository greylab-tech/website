import type { Metadata } from "next";
import { InternalHero } from "@/components/projects/internal-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { siteContact } from "@/data/site";

const description =
  "Email or call GreyLab, or prepare a project brief to tell us what you want to build.";

export const metadata: Metadata = {
  title: { absolute: "Start a Project — GreyLab" },
  description,
};

export default function ContactPage() {
  return (
    <main id="main-content" className="internal-page contact-page">
      <InternalHero title="Start a Project" description={description} />
      <section className="contact-form-section">
        <div className="container contact-columns">
          <div className="contact-description">
            <div>
              <h2>Prepare a project brief</h2>
              <p>
                Describe what you want to build, who it&apos;s for, and what
                you&apos;d like it to do.
              </p>
              <div className="contact-direct">
                <a href={siteContact.emailHref}>{siteContact.email}</a>
                <a href={siteContact.phoneHref}>{siteContact.phone}</a>
              </div>
            </div>
            <img
              src="/images/brand/greylab-share.png"
              alt="GreyLab."
              width={1200}
              height={630}
              loading="lazy"
            />
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
