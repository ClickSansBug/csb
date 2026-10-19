// Inline SVG icons of the design (processus.html, contact.html), drawn in currentColor.
type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
} as const;

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" {...stroke} />
      <path d="M3.6 7l8.4 6 8.4-6" {...stroke} />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M6 3h9l4 4v14H6z" {...stroke} />
      <path d="M9 11h7M9 15h7" {...stroke} />
    </svg>
  );
}

export function ScreenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="3" y="4" width="18" height="14" rx="2" {...stroke} />
      <path d="M3 8h18M8 21h8" {...stroke} />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M8 12.3l2.6 2.6L16.2 9.3" {...stroke} strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M12 7.5V12l3.5 2" {...stroke} strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" {...stroke} />
      <circle cx="12" cy="10" r="2.4" {...stroke} />
    </svg>
  );
}
