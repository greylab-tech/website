import Link from "next/link";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";
import { RollingText } from "../ui/rolling-text";
import { navigation, siteContact } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>Your Ideas. Our Engineering. Building for What&apos;s Next.</p>
            <SocialLinks />
          </div>
          <div className="footer-links">
            <p className="footer-label">Pages</p>
            <nav aria-label="Footer navigation">
              {navigation.map(({ href, label }) => (
                <Link href={href} key={label}>
                  <RollingText>{label}</RollingText>
                </Link>
              ))}
            </nav>
          </div>
          <dl className="footer-contact">
            <div>
              <dt className="footer-label">Email</dt>
              <dd>
                <a href={siteContact.emailHref}>{siteContact.email}</a>
              </dd>
            </div>
            <div>
              <dt className="footer-label">Phone</dt>
              <dd>
                <a href={siteContact.phoneHref}>{siteContact.phone}</a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="footer-bottom">
          <p>© 2026 GreyLab. All Rights Reserved.</p>
          <Link href="/legal/privacy-policy">
            <RollingText>Privacy policy</RollingText>
          </Link>
        </div>
      </div>
    </footer>
  );
}
