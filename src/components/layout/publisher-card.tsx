type PublisherCardProps = {
  label: string;
  name: string;
  lines: { key: string; text: string }[];
  email: { href: string; label: string };
  phone: { href: string; label: string };
};

// Publisher identity card of the legal notice (design: mentions-legales.html, section 01;
// phone link from clarifications.md › Téléphone).
export function PublisherCard({
  label,
  name,
  lines,
  email,
  phone,
}: PublisherCardProps) {
  return (
    <div className="mb-3.5 rounded-md border border-ink/10 bg-card px-6.5 py-6">
      <div className="mb-3 font-mono text-10-5 tracking-p130 text-g52 uppercase">
        {label}
      </div>
      <div className="mb-2 text-17 font-semibold">{name}</div>
      <div className="text-15 leading-175 text-ink/72">
        {lines.map((line) => (
          <span key={line.key}>
            {line.text}
            <br />
          </span>
        ))}
        <a href={email.href} className="text-g52">
          {email.label}
        </a>
        <br />
        <a href={phone.href} className="hover:text-g52">
          {phone.label}
        </a>
      </div>
    </div>
  );
}
