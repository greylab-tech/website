import type { Metadata } from "next";
import "./globals.css";
import "@/styles/layout.css";
import "@/styles/home.css";
import "@/styles/pages.css";
import "@/styles/home-sections.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteDescription, siteName } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "GreyLab — Web Development & Software Engineering",
    template: "%s — GreyLab",
  },
  description: siteDescription,
  other: { "page-type": "software", "site-kind": "software" },
  icons: { icon: "/images/brand/greylab-mark.svg" },
  openGraph: {
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/images/brand/greylab-share.png",
        width: 1200,
        height: 630,
        alt: "GreyLab.",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-type="software" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
