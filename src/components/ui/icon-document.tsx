type IconProps = { className?: string };

// Document (Process page, step 02). SVG of the design, stroke in the current colour.
export function IconDocument({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M6 3h9l4 4v14H6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 11h7M9 15h7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
