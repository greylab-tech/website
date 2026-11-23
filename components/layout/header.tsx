"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { ActionLink } from "../ui/action-link";
import { RollingText } from "../ui/rolling-text";
import { navigation } from "@/data/site";

const primaryAction = "Start a Project₹";
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const desktop = matchMedia("(min-width: 1300px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    const firstLink =
      headerRef.current?.querySelector<HTMLAnchorElement>(".mobile-nav a");
    firstLink?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const controls = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>(
          "a[href],button:not([disabled])",
        ) || [],
      ).filter(
        (element) =>
          element.getClientRects().length > 0 && !element.closest("[inert]"),
      );
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      if (document.activeElement?.closest(".mobile-nav")) toggle?.focus();
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}
    >
      <div className="container site-header__inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.href === pathname ? "page" : undefined}
            >
              <RollingText>{item.label}</RollingText>
            </Link>
          ))}
        </nav>
        <ActionLink className="header-contact" variant="white" href="/contact">
          {primaryAction}
        </ActionLink>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        inert={!open}
      >
        {navigation.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">0{i + 1}</span>
            <RollingText>{item.label}</RollingText>
          </Link>
        ))}
        <ActionLink
          className="mobile-nav__project"
          variant="white"
          href="/contact"
          onClick={() => setOpen(false)}
        >
          {primaryAction}
        </ActionLink>
      </nav>
    </header>
  );
}
