import { LegalParagraph } from "./legal-paragraph";

type LegalTopicProps = {
  title: string;
  text: string;
  last?: boolean;
};

// Sub-heading in green mono capitals followed by its paragraph (design: section 04).
export function LegalTopic({ title, text, last = false }: LegalTopicProps) {
  return (
    <>
      <div className="mt-5 mb-2 font-mono text-10-5 tracking-p120 text-g52 uppercase">
        {title}
      </div>
      <LegalParagraph last={last}>{text}</LegalParagraph>
    </>
  );
}
