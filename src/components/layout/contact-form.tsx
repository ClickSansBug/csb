"use client";

import { useTranslations } from "next-intl";
import {
  type MouseEvent,
  type ReactNode,
  type SubmitEvent,
  useActionState,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { flushSync } from "react-dom";

import { OFFER_QUERY_PARAM } from "@/config/routes";
import {
  CONTACT_FIELD_LIMITS,
  CONTACT_FIELDS,
  type ContactField,
  type ContactFormValues,
  type ContactResult,
  type ContactState,
  createContactSchema,
  HONEYPOT_FIELD,
  type Pack,
  sendContactMessage,
  type SiteType,
  STARTED_AT_FIELD,
  toFieldErrors,
} from "@/features/contact";
import { prefersReducedMotion } from "@/hooks/reduced-motion";
import { cn } from "@/utils/cn";

// Markup of the "Démarrer un projet" form (contact.html), with its client behaviour from the
// design and clarifications.md: chips, "n/5 ESSENTIELS" progress, inactive button until the five
// essentials are filled, ?offre= pre-selection. Submitted to sendContactMessage through
// useActionState (architecture.md › Formulaires côté client), after a Zod validation in the
// browser; sending, field errors, failure and success states from clarifications.md › Formulaires.

const OFFER_CODES: readonly Pack[] = ["essentiel", "presence", "performance"];
const PROGRESS_WIDTHS = [
  "w-0",
  "w-1/5",
  "w-2/5",
  "w-3/5",
  "w-4/5",
  "w-full",
] as const;

const LABEL = "mb-2.25 block text-label text-paper/72";
const GROUP_LABEL = "mb-3 block text-label text-paper/72";
const FIELD =
  "w-full rounded-field border bg-ink/40 px-3.5 py-3.25 text-ui text-paper placeholder:text-paper-lift-32 max-md:text-body-lg";
const FIELD_IDLE = "border-paper/16 focus:border-brand";
// A field in error keeps its error border, focus included (clarifications.md › Réponses aux
// questions de wiring, point 2).
const FIELD_INVALID = "border-error";
const FIELD_ERROR = "mt-2 text-fine text-error";
const CHIP =
  "cursor-pointer border transition-colors duration-200 ease-standard";
const CHIP_IDLE = "border-paper/16 bg-ink/40 text-paper/80";
const CHIP_ACTIVE = "border-brand bg-brand text-on-brand";

type TextField = { label: string; placeholder: string };

type ContactFormLabels = {
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
  pending: string;
  reassurance: string;
  honeypot: string;
  success: { title: string; text: string; reset: string };
};

type ContactFormProps = {
  labels: ContactFormLabels;
  // Progress label for 0 to 5 filled essentials.
  progress: string[];
  siteTypes: { value: SiteType; label: string; hint: string }[];
  packs: { value: Pack; label: string }[];
  privacy: ReactNode;
  // Sending failure message, with its mailto: fallback link.
  failure: ReactNode;
};

type TextValues = Record<
  "company" | "name" | "activity" | "email" | "phone",
  string
>;
type FieldErrors = Record<string, string[]>;

const EMPTY_VALUES: TextValues = {
  company: "",
  name: "",
  activity: "",
  email: "",
  phone: "",
};
const SEND_FAILED: ContactResult = { success: false, error: "SEND_FAILED" };

// Display timestamp of the anti-spam check (backend-report.md › Champs techniques). Also the
// default value, so that the automatic reset of the form after a sending keeps it.
function stampStartedAt(input: HTMLInputElement | null) {
  if (!input) return;
  input.defaultValue = String(Date.now());
  input.value = input.defaultValue;
}

const subscribeToNothing = () => () => undefined;
const readSearch = () => window.location.search;
const readNoSearch = () => "";

export function ContactForm({
  labels,
  progress,
  siteTypes,
  packs,
  privacy,
  failure,
}: ContactFormProps) {
  const id = useId();
  const t = useTranslations("validation");
  const schema = useMemo(() => createContactSchema(t), [t]);
  const [type, setType] = useState<SiteType | "">("");
  // null until the visitor picks an offer: the ?offre= pre-selection applies (clarifications.md
  // › Présélection par URL); "" once the chip has been unselected.
  const [chosenPack, setChosenPack] = useState<Pack | "" | null>(null);
  const [values, setValues] = useState<TextValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  // Set from the submit until the answer: a second click is ignored (clarifications.md › Pendant l'envoi).
  const submitting = useRef(false);
  const search = useSyncExternalStore(
    subscribeToNothing,
    readSearch,
    readNoSearch,
  );
  const offer = new URLSearchParams(search).get(OFFER_QUERY_PARAM);
  const pack = chosenPack ?? OFFER_CODES.find((code) => code === offer) ?? "";

  // Element focused for a field in error: the field itself, or the first chip of a chip group.
  const focusId = (field: ContactField) =>
    field === "type" || field === "pack"
      ? `${id}-${field}-chip`
      : `${id}-${field}`;
  const focusFirstError = (fieldErrors: FieldErrors) => {
    const first = CONTACT_FIELDS.find((field) => fieldErrors[field]);
    if (first) document.getElementById(focusId(first))?.focus();
  };

  const submit = async (
    previous: ContactState,
    formData: FormData,
  ): Promise<ContactState> => {
    let result: ContactResult;
    try {
      result = await sendContactMessage(previous, formData);
    } catch {
      // Unexpected server error: same message as a failed sending (clarifications.md › Échec d'envoi).
      result = SEND_FAILED;
    }
    submitting.current = false;
    if (result.success) {
      setSent(true);
    } else if (result.error === "VALIDATION") {
      const fieldErrors = result.fieldErrors ?? {};
      setErrors(fieldErrors);
      focusFirstError(fieldErrors);
    } else {
      setFailed(true);
    }
    return result;
  };
  const [, formAction, pending] = useActionState(submit, null);

  useEffect(() => stampStartedAt(startedAtRef.current), []);

  // An essential counts once it is not empty after trimming (clarifications.md › Progression).
  const filled = [
    type,
    values.company,
    values.name,
    values.activity,
    values.email,
  ].filter((value) => value.trim() !== "").length;
  const ready = filled === 5;

  const formValues = (
    next: Partial<ContactFormValues> = {},
  ): ContactFormValues => ({ type, ...values, pack, ...next });

  // After a validation, a field in error is checked again on each change (clarifications.md
  // › Moment de la validation).
  const revalidate = (field: ContactField, next: ContactFormValues) => {
    if (!errors[field]) return;
    const result = schema.safeParse(next);
    const messages = result.success
      ? undefined
      : toFieldErrors(result.error)[field];
    setErrors((current) => {
      const updated = { ...current };
      if (messages) updated[field] = messages;
      else delete updated[field];
      return updated;
    });
  };

  const update =
    (field: keyof TextValues) => (event: { target: { value: string } }) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [field]: value }));
      revalidate(field, formValues({ [field]: value }));
    };

  const chooseType = (value: SiteType) => {
    if (pending) return;
    setType(value);
    revalidate("type", formValues({ type: value }));
  };

  const togglePack = (value: Pack) => {
    if (pending) return;
    const next = pack === value ? "" : value;
    setChosenPack(next);
    revalidate("pack", formValues({ pack: next }));
  };

  const blockClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!ready || submitting.current) event.preventDefault();
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    if (!ready || submitting.current) {
      event.preventDefault();
      return;
    }
    setFailed(false);
    const result = schema.safeParse(formValues());
    if (!result.success) {
      // Errors found in the browser: no server call.
      event.preventDefault();
      const fieldErrors = toFieldErrors(result.error);
      setErrors(fieldErrors);
      focusFirstError(fieldErrors);
      return;
    }
    setErrors({});
    submitting.current = true;
  };

  // Success screen: focus on its title, and the top of the form card brought back under the sticky
  // header when it is out of view (clarifications.md › Écran de succès).
  const revealSuccess = useCallback((title: HTMLHeadingElement | null) => {
    if (!title) return;
    title.focus({ preventScroll: true });
    const card = formRef.current?.parentElement;
    if (!card) return;
    const headerBottom =
      document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
    const top = card.getBoundingClientRect().top;
    if (top >= headerBottom && top < window.innerHeight) return;
    window.scrollTo({
      top: window.scrollY + top - headerBottom,
      behavior: prefersReducedMotion() ? "instant" : "smooth",
    });
  }, []);

  // "Remplir un autre projet": everything emptied, without the ?offre= pre-selection, new
  // timestamp, focus on the form title (clarifications.md › « Remplir un autre projet »).
  const resetForm = () => {
    flushSync(() => {
      setSent(false);
      setType("");
      setChosenPack("");
      setValues(EMPTY_VALUES);
      setErrors({});
      setFailed(false);
    });
    stampStartedAt(startedAtRef.current);
    titleRef.current?.focus();
  };

  const errorId = (field: ContactField) => `${id}-${field}-error`;
  const fieldProps = (field: keyof TextValues, className?: string) => ({
    id: `${id}-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    readOnly: pending,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
    className: cn(FIELD, errors[field] ? FIELD_INVALID : FIELD_IDLE, className),
  });
  const fieldError = (field: ContactField) =>
    errors[field] ? (
      <p id={errorId(field)} className={FIELD_ERROR}>
        {errors[field][0]}
      </p>
    ) : null;
  // Single-line field: label, input (maxLength of the contract) and its error message.
  const textInput = (
    field: "company" | "name" | "email" | "phone",
    type: "text" | "email" | "tel",
    autoComplete: string,
    label: ReactNode = labels[field].label,
  ) => (
    <div>
      <label htmlFor={`${id}-${field}`} className={LABEL}>
        {label}
      </label>
      <input
        {...fieldProps(field)}
        type={type}
        autoComplete={autoComplete}
        maxLength={CONTACT_FIELD_LIMITS[field].max}
        placeholder={labels[field].placeholder}
      />
      {fieldError(field)}
    </div>
  );

  return (
    <>
      <div role="status">
        {sent ? (
          <div className="py-11 text-center">
            <div
              aria-hidden="true"
              className="mx-auto mb-5.5 flex size-11.5 items-center justify-center rounded-circle bg-brand text-on-brand"
            >
              <svg viewBox="0 0 24 24" className="size-5.5">
                <path
                  d="M6 12.4l4 4L18 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3
              ref={revealSuccess}
              tabIndex={-1}
              className="mb-3 text-heading-sm font-semibold tracking-title"
            >
              {labels.success.title}
            </h3>
            <p className="mx-auto max-w-copy-sm text-body leading-text text-paper/68">
              {labels.success.text}
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-7 cursor-pointer rounded-pill border border-paper/25 bg-transparent px-5.5 py-3 text-small text-paper hover:border-paper"
            >
              {labels.success.reset}
            </button>
          </div>
        ) : null}
      </div>

      <form
        ref={formRef}
        action={formAction}
        noValidate
        onSubmit={handleSubmit}
        aria-busy={pending}
        hidden={sent}
        className="contact-form"
      >
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

        <h2
          ref={titleRef}
          tabIndex={-1}
          className="mb-2 text-heading font-semibold tracking-form-title max-md:text-h2-mobile"
        >
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
              aria-invalid={errors.type ? true : undefined}
              aria-describedby={errors.type ? errorId("type") : undefined}
              className="grid grid-cols-fields gap-2.5 max-nav:grid-cols-single"
            >
              {siteTypes.map((option, index) => (
                <button
                  key={option.value}
                  id={index === 0 ? focusId("type") : undefined}
                  type="button"
                  role="radio"
                  aria-checked={type === option.value}
                  aria-disabled={pending || undefined}
                  onClick={() => chooseType(option.value)}
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
            {fieldError("type")}
            <input type="hidden" name="type" value={type} />
          </div>

          <div className="grid grid-cols-fields gap-4 max-nav:grid-cols-single">
            {textInput("company", "text", "organization")}
            {textInput("name", "text", "name")}
          </div>

          <div>
            <label htmlFor={`${id}-activity`} className={LABEL}>
              {labels.activity.label}
            </label>
            <textarea
              {...fieldProps("activity", "resize-y leading-compact")}
              rows={4}
              maxLength={CONTACT_FIELD_LIMITS.activity.max}
              placeholder={labels.activity.placeholder}
            />
            {fieldError("activity")}
          </div>

          <div className="grid grid-cols-fields gap-4 max-nav:grid-cols-single">
            {textInput("email", "email", "email")}
            {textInput(
              "phone",
              "tel",
              "tel",
              <>
                {labels.phone.label}{" "}
                <span className="opacity-50">{labels.phone.optional}</span>
              </>,
            )}
          </div>

          <div>
            <div id={`${id}-pack`} className={GROUP_LABEL}>
              {labels.pack}
            </div>
            <div
              role="group"
              aria-labelledby={`${id}-pack`}
              aria-describedby={errors.pack ? errorId("pack") : undefined}
              className="flex flex-wrap gap-2"
            >
              {packs.map((option, index) => (
                <button
                  key={option.value}
                  id={index === 0 ? focusId("pack") : undefined}
                  type="button"
                  aria-pressed={pack === option.value}
                  aria-disabled={pending || undefined}
                  onClick={() => togglePack(option.value)}
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
            {fieldError("pack")}
            <input type="hidden" name="pack" value={pack} />
          </div>

          {failed ? (
            <p role="alert" className="text-small text-error">
              {failure}
            </p>
          ) : null}

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
              aria-disabled={!ready || pending}
              onClick={blockClick}
              className={cn(
                "rounded-pill border-0 px-7 py-3.75 text-base font-medium transition-all duration-250 ease-standard",
                pending
                  ? "cursor-progress bg-accent-fill/70 text-on-accent"
                  : ready
                    ? "cursor-pointer bg-accent-fill text-on-accent"
                    : "cursor-not-allowed bg-paper text-ink opacity-45",
              )}
            >
              {pending ? labels.pending : labels.submit}
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
          <label htmlFor={`${id}-${HONEYPOT_FIELD}`}>{labels.honeypot}</label>
          <input
            id={`${id}-${HONEYPOT_FIELD}`}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
          {/* No defaultValue prop: React would write it back to "" on each render, and the
              automatic reset after a failed sending would then empty the timestamp. */}
          <input
            ref={startedAtRef}
            name={STARTED_AT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </form>
    </>
  );
}
