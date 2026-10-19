// Highlighted statement with a green left rule (design: mentions-legales.html, section 04).
export function LegalCallout({ text }: { text: string }) {
  return (
    <div className="mb-1 rounded-r-md border border-l-2 border-ink/10 border-l-g52 bg-card px-6 py-5">
      <p className="text-15-5 leading-170 text-ink/78">{text}</p>
    </div>
  );
}
