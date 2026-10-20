import Link from "next/link";

type OfferRowProps = {
  href: string;
  name: string;
  text: string;
  currency: string;
  price: string;
  delay: string;
  arrow: string;
};

// Offer line of the home page: dotted leader and arrow light up on hover (data-menu-row).
export function OfferRow({
  href,
  name,
  text,
  currency,
  price,
  delay,
  arrow,
}: OfferRowProps) {
  return (
    <Link
      href={href}
      data-menu-row=""
      className="group grid grid-cols-offer items-baseline gap-x-6 gap-y-0 border-b border-ink/10 py-7.5 text-ink transition-colors duration-250 ease-standard data-hover:bg-card max-md:grid-cols-single max-md:items-start max-md:gap-3.5"
    >
      <div>
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-heading-lg font-semibold tracking-title">
            {name}
          </span>
        </div>
        <p className="mt-2 max-w-copy text-ui leading-compact text-pretty text-ink/62">
          {text}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="self-baseline border-b border-dotted border-ink/25 transition-colors duration-250 ease-standard group-data-hover:border-brand max-md:hidden"
      />
      <div className="text-right max-md:text-left">
        <div className="font-mono text-heading-md tracking-heading whitespace-nowrap max-md:text-title-lg">
          <span className="mr-1.5 text-base text-ink/45">{currency}</span>
          {price}
        </div>
        <div className="mt-1.75 font-mono text-tag tracking-delay text-ink/45">
          {delay}
        </div>
      </div>
      <span
        aria-hidden="true"
        className="pl-5 text-lead-lg opacity-0 transition-opacity duration-250 ease-standard group-data-hover:opacity-100 max-md:hidden"
      >
        {arrow}
      </span>
    </Link>
  );
}
