"use client";

import {
  type FormEvent,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { OFFER_QUERY_PARAM } from "@/config/routes";
import type { Pack, SiteType } from "@/features/contact";
import { cn } from "@/utils/cn";

// Markup of the "Démarrer un projet" form (contact.html), with its client behaviour from the
// design and clarifications.md: chips, "n/5 ESSENTIELS" progress, inactive button until the five
// essentials are filled, ?offre= pre-selection. Submission, validation and the sending / success /
// error states are added by wiring.

const OFFER_CODES: readonly Pack[] = ["essentiel", "presence", "performance"];
const PROGRESS_WIDTHS = [
  "w-0",
  "w-1/5",
  "w-2/5",
  "w-3/5",
  "w-4/5",
  "w-full",
] as const;
// Hard limits of clarifications.md › Nettoyage et limites de saisie.
const MAX_LENGTH = {
  company: 100,
  name: 100,
  activity: 2000,
  email: 254,
  phone: 30,
} as const;

const LABEL = "mb-2.25 block text-label text-paper/72";
const GROUP_LABEL = "mb-3 block text-label text-paper/72";
const FIELD =
  "w-full rounded-field border border-paper/16 bg-ink/40 px-3.5 py-3.25 text-ui text-paper placeholder:text-paper-lift-32 focus:border-brand max-md:text-body-lg";
const CHIP =
  "cursor-pointer border transition-colors duration-200 ease-standard";
const CHIP_IDLE = "border-paper/16 bg-ink/40 text-paper/80";
const CHIP_ACTIVE = "border-brand bg-brand text-on-brand";

type TextField = { label: string; placeholder: string };

export type ContactFormLabels = {
  brief: string;
  title: string;
  intro: string;
  type: string;
  company: TextField;
  name: TextField;
  activity: TextField;
  email: TextField;
  phone: TextField & { optional: string };
  pack: string;
  hintMissing: string;
  hintReady: string;
  submit: string;
  reassurance: string;
  honeypot: string;
};

type ContactFormProps = {
  labels: ContactFormLabels;
  // Progress label for 0 to 5 filled essentials.
  progress: string[];
  siteTypes: { value: SiteType; label: string; hint: string }[];
  packs: { value: Pack; label: string }[];
  privacy: ReactNode;
};

type TextValues = Record<
  "company" | "name" | "activity" | "email" | "phone",
  string
>;

const subscribeToNothing = () => () => undefined;
const readSearch = () => window.location.search;
const readNoSearch = () => "";

export function ContactForm({
  labels,
  progress,
  siteTypes,
  packs,
  privacy,
}: ContactFormProps) {
  const id = useId();
  const [type, setType] = useState<SiteType | "">("");
  // null until the visitor picks an offer: the ?offre= pre-selection applies (clarifications.md
  // › Présélection par URL); "" once the chip has been unselected.
  const [chosenPack, setChosenPack] = useState<Pack | "" | null>(null);
  const [values, setValues] = useState<TextValues>({
    company: "",
    name: "",
    activity: "",
    email: "",
    phone: "",
  });
  const startedAtRef = useRef<HTMLInputElement>(null);
  const search = useSyncExternalStore(
    subscribeToNothing,
    readSearch,
    readNoSearch,
  );
  const offer = new URLSearchParams(search).get(OFFER_QUERY_PARAM);
  const pack = chosenPack ?? OFFER_CODES.find((code) => code === offer) ?? "";

  useEffect(() => {
    // Display timestamp of the anti-spam check (backend-report.md › Champs techniques).
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  // An essential counts once it is not empty after trimming (clarifications.md › Progression).
  const filled = [
    type,
    values.company,
    values.name,
    values.activity,
    values.email,
  ].filter((value) => value.trim() !== "").length;
  const ready = filled === 5;

  const update =
    (field: keyof TextValues) => (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [field]: event.target.value }));

  const blockWhenNotReady = (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    if (!ready) event.preventDefault();
  };

  return (
    <form noValidate onSubmit={blockWhenNotReady} className="contact-form">
      {/* CONNECT: sendContactMessage */}
      <div className="flex items-baseline justify-between gap-4">
        <div className="font-mono text-eyebrow tracking-tag text-paper-lift-45">
          {labels.brief}
        </div>
        <div className="font-mono text-eyebrow text-accent-text">
          {progress[filled]}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="mt-3.5 mb-7 h-0.5 overflow-hidden rounded-bar bg-paper/10"
      >
        <div
          className={cn(
            "h-full bg-brand transition-all duration-500 ease-reveal motion-reduce:transition-none",
            PROGRESS_WIDTHS[filled],
          )}
        />
      </div>

      <h2 className="mb-2 text-heading font-semibold tracking-form-title max-md:text-h2-mobile">
        {labels.title}
      </h2>
      <p className="mb-7.5 text-ui leading-compact text-paper/60">
        {labels.intro}
      </p>

      <div className="grid gap-6.5">
        <div>
          <div id={`${id}-type`} className={GROUP_LABEL}>
            {labels.type}
          </div>
          <div
            role="radiogroup"
            aria-labelledby={`${id}-type`}
            className="grid grid-cols-fields gap-2.5 max-nav:grid-cols-single"
          >
            {siteTypes.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={type === option.value}
                onClick={() => setType(option.value)}
                className={cn(
                  CHIP,
                  "rounded-chip px-4 py-3.5 text-left",
                  type === option.value ? CHIP_ACTIVE : CHIP_IDLE,
                )}
              >
                <div className="text-ui font-medium">{option.label}</div>
                <div className="mt-0.75 text-meta italic opacity-62">
                  {option.hint}
                </div>
              </button>
            ))}
          </div>
          <input type="hidden" name="type" value={type} />
        </div>

        <div className="grid grid-cols-fields gap-4 max-nav:grid-cols-single">
          <div>
            <label htmlFor={`${id}-company`} className={LABEL}>
              {labels.company.label}
            </label>
            <input
              id={`${id}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={MAX_LENGTH.company}
              placeholder={labels.company.placeholder}
              value={values.company}
              onChange={update("company")}
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor={`${id}-name`} className={LABEL}>
              {labels.name.label}
            </label>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={MAX_LENGTH.name}
              placeholder={labels.name.placeholder}
              value={values.name}
              onChange={update("name")}
              className={FIELD}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-activity`} className={LABEL}>
            {labels.activity.label}
          </label>
          <textarea
            id={`${id}-activity`}
            name="activity"
            rows={4}
            maxLength={MAX_LENGTH.activity}
            placeholder={labels.activity.placeholder}
            value={values.activity}
            onChange={update("activity")}
            className={cn(FIELD, "resize-y leading-compact")}
          />
        </div>

        <div className="grid grid-cols-fields gap-4 max-nav:grid-cols-single">
          <div>
            <label htmlFor={`${id}-email`} className={LABEL}>
              {labels.email.label}
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              maxLength={MAX_LENGTH.email}
              placeholder={labels.email.placeholder}
              value={values.email}
              onChange={update("email")}
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className={LABEL}>
              {labels.phone.label}{" "}
              <span className="opacity-50">{labels.phone.optional}</span>
            </label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={MAX_LENGTH.phone}
              placeholder={labels.phone.placeholder}
              value={values.phone}
              onChange={update("phone")}
              className={FIELD}
            />
          </div>
        </div>

        <div>
          <div id={`${id}-pack`} className={GROUP_LABEL}>
            {labels.pack}
          </div>
          <div
            role="group"
            aria-labelledby={`${id}-pack`}
            className="flex flex-wrap gap-2"
          >
            {packs.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={pack === option.value}
                onClick={() =>
                  setChosenPack(pack === option.value ? "" : option.value)
                }
                className={cn(
                  CHIP,
                  "rounded-pill px-3.75 py-2.5 text-label",
                  pack === option.value ? CHIP_ACTIVE : CHIP_IDLE,
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <input type="hidden" name="pack" value={pack} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-paper/12 pt-5.5">
          <div
            className={cn(
              "max-w-hint font-mono text-caption tracking-hint transition-colors duration-250 ease-standard",
              ready ? "text-accent-text" : "text-paper-lift-42",
            )}
          >
            {ready ? labels.hintReady : labels.hintMissing}
          </div>
          <button
            type="submit"
            aria-disabled={!ready}
            onClick={blockWhenNotReady}
            className={cn(
              "rounded-pill border-0 px-7 py-3.75 text-base font-medium transition-all duration-250 ease-standard",
              ready
                ? "cursor-pointer bg-accent-fill text-on-accent"
                : "cursor-not-allowed bg-paper text-ink opacity-45",
            )}
          >
            {labels.submit}
          </button>
        </div>

        <div className="text-right font-mono text-caption tracking-hint text-paper-lift-38">
          <p>{labels.reassurance}</p>
          <p>{privacy}</p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-2500 size-px overflow-hidden"
      >
        <label htmlFor={`${id}-website`}>{labels.honeypot}</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
        <input
          ref={startedAtRef}
          name="startedAt"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
    </form>
  );
}
