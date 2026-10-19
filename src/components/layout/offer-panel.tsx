import { ButtonLink } from "@/components/ui/button-link";
import { DotList } from "@/components/ui/dot-list";

type OfferPanelProps = {
  number: string;
  name: string;
  prefix?: string;
  price: string;
  currency: string;
  meta: string;
  text: string;
  cta: { href: string; label: string };
  includedTitle: string;
  items: { key: string; text: string; highlighted?: boolean }[];
  bullet: string;
};

const microLabel = "font-mono text-10-5 tracking-p160 text-ink/40 uppercase";

// Content of one offer tab (design: tarifs.html, data-panel).
export function OfferPanel({
  number,
  name,
  prefix,
  price,
  currency,
  meta,
  text,
  cta,
  includedTitle,
  items,
  bullet,
}: OfferPanelProps) {
  return (
    <div className="grid grid-cols-offer-panel gap-0 max-tablet:grid-cols-single">
      <div className="py-11 pr-11.5 pl-0 max-tablet:px-0 max-tablet:pt-8.5 max-tablet:pb-7.5">
        <div className={microLabel}>{number}</div>
        <div className="mt-3.5 flex flex-wrap items-baseline">
          <span className="text-40 font-semibold tracking-n30">{name}</span>
        </div>
        <div className="mt-6.5 flex items-baseline gap-2.5">
          {prefix ? (
            <span className="font-mono text-15 text-ink/45">{prefix}</span>
          ) : null}
          <span className="font-mono text-price-xl leading-90 font-medium tracking-n50">
            {price}
          </span>
          <span className="font-mono text-15 text-ink/45">{currency}</span>
        </div>
        <div className="mt-3.5 font-mono text-10-5 tracking-p150 text-ink/40 uppercase">
          {meta}
        </div>
        <p className="mt-6.5 max-w-offer text-16 leading-160 text-pretty text-ink/68">
          {text}
        </p>
        <ButtonLink tone="ink" size="md" href={cta.href} className="mt-8.5">
          {cta.label}
        </ButtonLink>
      </div>
      <div className="border-l border-ink/10 py-11 pr-0 pl-11.5 max-tablet:border-t max-tablet:border-l-0 max-tablet:px-0 max-tablet:pt-0 max-tablet:pb-8.5">
        <div className={microLabel}>{includedTitle}</div>
        <DotList
          items={items}
          bullet={bullet}
          variant="offer"
          className="mt-4.5"
        />
      </div>
    </div>
  );
}
