import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type ContactFieldProps = {
  id: string;
  name: string;
  label: ReactNode;
  placeholder: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  multiline?: boolean;
};

const control =
  "w-full rounded-field border border-paper/16 bg-ink/40 px-3.5 py-3.25 text-14-5 text-paper placeholder:text-paper/32 focus:border-brand max-mobile:text-16";

// Labelled text field of the contact form (design: contact.html inputs, focus border green).
export function ContactField({
  id,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  multiline = false,
}: ContactFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2.25 block text-13-5 text-paper/72">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          placeholder={placeholder}
          className={cn(control, "resize-y leading-155")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={control}
        />
      )}
    </div>
  );
}
