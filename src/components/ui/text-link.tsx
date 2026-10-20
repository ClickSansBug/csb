import Link from "next/link";
import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
};

// Green link underlined by a translucent rule ("Voir le détail de chaque offre →").
export function TextLink({ href, children }: TextLinkProps) {
  return (
    <Link
      href={href}
      className="border-b border-brand/40 text-ui font-medium text-g52 hover:border-g52"
    >
      {children}
    </Link>
  );
}
