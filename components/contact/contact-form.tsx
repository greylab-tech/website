"use client";

import { useState, type FormEvent } from "react";
import { siteContact } from "@/data/site";

const services = [
  "Web Development",
  "Custom Software",
  "SaaS & MVPs",
  "AI & Automation",
  "FinTech & Analytics",
  "Other",
];

export function ContactForm() {
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "unavailable"
  >("idle");
  const [brief, setBrief] = useState("");
  const emailDraft = `${siteContact.emailHref}?subject=GreyLab%20project%20brief&body=${encodeURIComponent(brief)}`;

  async function copyBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // The ID-only fields are excluded from a native form submission.
    const fields = event.currentTarget.elements;
    const details = [
      ["Name", "brief-name"],
      ["Email", "brief-email"],
      ["Company", "brief-company"],
      ["Service", "brief-service"],
      ["Project details", "brief-details"],
    ].flatMap(([label, id]) => {
      const field = fields.namedItem(id) as
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
      const value = field?.value.trim();
      return value ? [`${label}: ${value}`] : [];
    });
    const text = ["GreyLab project brief", "", ...details].join("\n");
    setBrief(text);
    setCopyStatus("idle");

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("unavailable");
    }
  }

  return (
    <form
      className="contact-form"
      aria-describedby="project-brief-note"
      onSubmit={copyBrief}
      onChange={() => {
        setBrief("");
        setCopyStatus("idle");
      }}
    >
      <label>
        <span>Name (optional)</span>
        <input id="brief-name" autoComplete="name" />
      </label>
      <label>
        <span>Email (optional)</span>
        <input type="email" id="brief-email" autoComplete="email" />
      </label>
      <div className="contact-form-row">
        <label>
          <span>Company (optional)</span>
          <input id="brief-company" autoComplete="organization" />
        </label>
        <label>
          <span>Service needed</span>
          <select id="brief-service" defaultValue="" required>
            <option value="" disabled>
              Select…
            </option>
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>Project details</span>
        <textarea
          id="brief-details"
          placeholder="Goals, key features, and timeline"
          rows={5}
          required
        />
      </label>
      <p className="contact-form-notice" id="project-brief-note">
        Copy your brief to share it or open a prefilled draft in your email app.
      </p>
      <button className="contact-submit" type="submit">
        Copy project brief
      </button>
      <p role="status" className="contact-form-notice">
        {brief && copyStatus === "copied" && "Project brief copied."}
        {brief &&
          copyStatus === "unavailable" &&
          "Select and copy your project brief below."}
      </p>
      {brief && (
        <>
          <a className="contact-email-draft" href={emailDraft}>
            Email this brief
          </a>
          {copyStatus === "unavailable" && (
            <label>
              <span>Prepared project brief</span>
              <textarea rows={5} value={brief} readOnly />
            </label>
          )}
        </>
      )}
    </form>
  );
}
