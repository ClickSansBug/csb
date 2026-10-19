import type { ReactNode } from "react";

import { ChoiceChip } from "@/components/ui/choice-chip";
import type { Pack, SiteType } from "@/features/contact";
import { cn } from "@/utils/cn";

import { ContactField } from "./contact-field";
import { mobileHeading, singleColumn } from "./responsive";

type ContactFormTexts = {
  brief: string;
  progress: string;
  title: string;
  subtitle: string;
  typeLabel: string;
  companyLabel: string;
  companyPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  activityLabel: string;
  activityPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: ReactNode;
  phonePlaceholder: string;
  packLabel: string;
  hint: string;
  submit: string;
  reassurance: string;
  privacy: ReactNode;
  honeypot: string;
  noScript: ReactNode;
};

type ContactFormProps = {
  texts: ContactFormTexts;
  siteTypes: { value: SiteType; label: string; hint: string }[];
  packs: { value: Pack; label: string }[];
  // Visual state of the design script, driven by wiring: number of filled essentials (0–5),
  // selected chips, form ready to be sent.
  filledCount?: number;
  selectedType?: SiteType;
  selectedPack?: Pack;
  ready?: boolean;
};

// Progress bar widths for 0 to 5 filled essentials (design: width = n / 5).
const progressWidth = [
  "w-0",
  "w-1/5",
  "w-2/5",
  "w-3/5",
  "w-4/5",
  "w-full",
] as const;

const fieldLabel = "block text-13-5 text-paper/72";

// « Démarrer un projet » form, markup only (design: contact.html). Field names, chip values
// and technical fields follow doc/backend-report.md › backend-manifest › sendContactMessage.
export function ContactForm({
  texts,
  siteTypes,
  packs,
  filledCount = 0,
  selectedType,
  selectedPack,
  ready = false,
}: ContactFormProps) {
  return (
    <>
      {/* CONNECT: sendContactMessage */}
      <form noValidate aria-labelledby="contact-form-title" data-requires-js="">
        <div className="flex items-baseline justify-between gap-4">
          <div className="font-mono text-11-5 tracking-p120 text-paper/45">
            {texts.brief}
          </div>
          <div className="font-mono text-11-5 text-brand-light">
            {texts.progress}
          </div>
        </div>
        <div className="mt-3.5 mb-7 h-0.5 overflow-hidden rounded-hair bg-paper/10">
          <div
            className={cn(
              "progress-fill h-full bg-brand",
              progressWidth[filledCount] ?? "w-0",
            )}
          />
        </div>

        <h2
          id="contact-form-title"
          className={cn(
            "mb-2 text-26 font-semibold tracking-n25",
            mobileHeading,
          )}
        >
          {texts.title}
        </h2>
        <p className="mb-7.5 text-14-5 leading-155 text-paper/60">
          {texts.subtitle}
        </p>

        <div className="grid gap-6.5">
          <div role="radiogroup" aria-labelledby="contact-type-label">
            <div id="contact-type-label" className={cn(fieldLabel, "mb-3")}>
              {texts.typeLabel}
            </div>
            <div className={cn("grid grid-cols-chips gap-2.5", singleColumn)}>
              {siteTypes.map((option) => (
                <ChoiceChip
                  key={option.value}
                  shape="card"
                  selected={option.value === selectedType}
                  role="radio"
                  aria-checked={option.value === selectedType}
                  value={option.value}
                >
                  <span className="block text-14-5 font-medium">
                    {option.label}
                  </span>
                  <span className="mt-0.75 block text-12-5 italic opacity-62">
                    {option.hint}
                  </span>
                </ChoiceChip>
              ))}
            </div>
            <input
              type="hidden"
              name="type"
              defaultValue={selectedType ?? ""}
            />
          </div>

          <div className={cn("grid grid-cols-chips gap-4", singleColumn)}>
            <ContactField
              id="contact-company"
              name="company"
              label={texts.companyLabel}
              placeholder={texts.companyPlaceholder}
              autoComplete="organization"
            />
            <ContactField
              id="contact-name"
              name="name"
              label={texts.nameLabel}
              placeholder={texts.namePlaceholder}
              autoComplete="name"
            />
          </div>

          <ContactField
            id="contact-activity"
            name="activity"
            label={texts.activityLabel}
            placeholder={texts.activityPlaceholder}
            multiline
          />

          <div className={cn("grid grid-cols-chips gap-4", singleColumn)}>
            <ContactField
              id="contact-email"
              name="email"
              type="email"
              label={texts.emailLabel}
              placeholder={texts.emailPlaceholder}
              autoComplete="email"
            />
            <ContactField
              id="contact-phone"
              name="phone"
              type="tel"
              label={texts.phoneLabel}
              placeholder={texts.phonePlaceholder}
              autoComplete="tel"
            />
          </div>

          <div role="group" aria-labelledby="contact-pack-label">
            <div id="contact-pack-label" className={cn(fieldLabel, "mb-3")}>
              {texts.packLabel}
            </div>
            <div className="flex flex-wrap gap-2">
              {packs.map((option) => (
                <ChoiceChip
                  key={option.value}
                  shape="pill"
                  selected={option.value === selectedPack}
                  aria-pressed={option.value === selectedPack}
                  value={option.value}
                >
                  {option.label}
                </ChoiceChip>
              ))}
            </div>
            <input
              type="hidden"
              name="pack"
              defaultValue={selectedPack ?? ""}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-paper/12 pt-5.5">
            <div
              className={cn(
                "hint-transition max-w-hint font-mono text-11 tracking-p60",
                ready ? "text-brand-light" : "text-paper/42",
              )}
            >
              {texts.hint}
            </div>
            <button
              type="submit"
              aria-disabled={ready ? undefined : true}
              className={cn(
                "submit-transition rounded-pill border-0 px-7 py-3.75 text-15 font-medium text-ink",
                ready
                  ? "cursor-pointer bg-brand-light opacity-100"
                  : "cursor-not-allowed bg-paper opacity-45",
              )}
            >
              {texts.submit}
            </button>
          </div>

          <div>
            <p className="text-right font-mono text-11 tracking-p60 text-paper/38">
              {texts.reassurance}
            </p>
            <p className="text-right font-mono text-11 tracking-p60 text-paper/38">
              {texts.privacy}
            </p>
          </div>
        </div>

        {/* Anti-spam technical fields of the manifest, invisible to visitors. */}
        <div
          aria-hidden="true"
          className="absolute top-0 -left-full size-px overflow-hidden"
        >
          <label htmlFor="contact-website">{texts.honeypot}</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
          <input
            name="startedAt"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </form>
      <noscript>
        <p className="mx-auto max-w-lead py-11 text-center text-15-5 leading-160 text-paper/68">
          {texts.noScript}
        </p>
      </noscript>
    </>
  );
}
