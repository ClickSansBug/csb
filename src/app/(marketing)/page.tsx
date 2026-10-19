import { getTranslations } from "next-intl/server";

import { AfterLaunch } from "@/components/layout/after-launch";
import { CtaBand } from "@/components/layout/cta-band";
import { HomeHero } from "@/components/layout/home-hero";
import { IncludedStats } from "@/components/layout/included-stats";
import { OfferRows } from "@/components/layout/offer-rows";
import { PageShell } from "@/components/layout/page-shell";
import { TeamSection } from "@/components/layout/team-section";
import { headingTags, strongTags, titleTags } from "@/components/ui/rich-text";
import {
  homeFactKeys,
  homeMemberKeys,
  homeOfferKeys,
  homeSuffixedStatKeys,
} from "@/config/content/fr/home";
import { contactLinks, media, routes } from "@/config/content/site";
import { getEnv } from "@/config/env";
import { createPageMetadata } from "@/utils/page-metadata";

export function generateMetadata() {
  return createPageMetadata("home", routes.home);
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tMeta = await getTranslations("metadata");
  const email = { href: contactLinks.email, label: tCommon("email") };

  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: tMeta("organization.name"),
    url: getEnv().NEXT_PUBLIC_SITE_URL,
    email: tCommon("email"),
    address: {
      "@type": "PostalAddress",
      addressRegion: tMeta("organization.region"),
      addressCountry: tMeta("organization.country"),
    },
    areaServed: { "@type": "Country", name: tMeta("organization.areaServed") },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <HomeHero
        chip={t("hero.chip")}
        title={t.rich("hero.title", titleTags())}
        lead={t("hero.lead")}
        primaryCta={{ href: routes.contact, label: t("hero.primaryCta") }}
        secondaryCta={{ href: routes.pricing, label: t("hero.secondaryCta") }}
        facts={homeFactKeys.map((key) => ({
          key,
          label: t(`hero.facts.${key}`),
        }))}
        preview={{
          label: t("preview.label"),
          caption: t("preview.caption"),
          address: t("preview.address"),
          video: {
            src: media.heroVideo,
            poster: media.heroPoster,
            label: t("preview.videoLabel"),
          },
          tags: {
            neutral: t("preview.tags.colors"),
            green: t("preview.tags.delivery"),
          },
        }}
      />
      <IncludedStats
        eyebrow={t("included.eyebrow")}
        title={t.rich("included.title", headingTags())}
        stats={[
          {
            key: "price",
            prefix: t("included.stats.price.prefix"),
            value: t("included.stats.price.value"),
            title: t("included.stats.price.title"),
            text: t("included.stats.price.text"),
          },
          ...homeSuffixedStatKeys.map((key) => ({
            key,
            value: t(`included.stats.${key}.value`),
            suffix: t(`included.stats.${key}.suffix`),
            title: t(`included.stats.${key}.title`),
            text: t(`included.stats.${key}.text`),
          })),
        ]}
      />
      <OfferRows
        eyebrow={t("offers.eyebrow")}
        title={t.rich("offers.title", headingTags())}
        rows={homeOfferKeys.map((key) => ({
          key,
          name: t(`offers.rows.${key}.name`),
          text: t(`offers.rows.${key}.text`),
          currency: t(`offers.rows.${key}.currency`),
          price: t(`offers.rows.${key}.price`),
          delay: t(`offers.rows.${key}.delay`),
        }))}
        rowHref={routes.pricing}
        arrow={t("offers.arrow")}
        note={t("offers.note")}
        link={{ href: routes.pricing, label: t("offers.link") }}
      />
      <AfterLaunch
        eyebrow={t("after.eyebrow")}
        title={t.rich("after.title", headingTags())}
        free={{ label: t("after.free.label"), text: t("after.free.text") }}
        then={{
          label: t("after.then.label"),
          text: t.rich("after.then.text", strongTags()),
          alternative: t("after.then.alternative"),
        }}
        link={{ href: routes.pricing, label: t("after.link") }}
      />
      <TeamSection
        eyebrow={t("team.eyebrow")}
        title={t.rich("team.title", headingTags())}
        paragraphs={[
          { key: "intro", text: t("team.intro") },
          { key: "promise", text: t("team.promise") },
        ]}
        aside={{ start: t("team.asideStart"), end: t("team.asideEnd") }}
        members={homeMemberKeys.map((key) => ({
          key,
          initials: t(`team.members.${key}.initials`),
          name: t(`team.members.${key}.name`),
          role: t(`team.members.${key}.role`),
          tags: t(`team.members.${key}.tags`),
        }))}
      />
      <CtaBand
        eyebrow={t("cta.eyebrow")}
        title={t.rich("cta.title", headingTags("light"))}
        text={t("cta.text")}
        button={{ href: routes.contact, label: t("cta.button") }}
        email={email}
      />
    </PageShell>
  );
}
