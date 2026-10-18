import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const {
  buildAcknowledgementContent,
  buildAcknowledgementText,
  buildNotificationContent,
  buildNotificationText,
} = await import("./contact-emails");

const input = {
  type: "complet",
  company: "Boulangerie\nMartin",
  name: "Claire Martin",
  activity: "Boulangerie artisanale.\nDeux boutiques.",
  email: "claire@example.com",
  phone: undefined,
  pack: "sur-mesure",
} as const;

// 18 October 2026, 14:32 in Zurich (UTC+2).
const RECEIVED_AT = new Date("2026-10-18T12:32:00Z");

describe("contact emails", () => {
  it("writes the notification in the exact plain-text format", () => {
    const content = buildNotificationContent(input, RECEIVED_AT);
    expect(content.subject).toBe("Nouveau projet · Boulangerie Martin");
    expect(buildNotificationText(content)).toBe(
      [
        "Nouveau projet reçu depuis clicksansbug.ch",
        "Reçu le 18 octobre 2026 à 14:32 (heure de Zurich)",
        "",
        "TYPE DE SITE : Un site complet",
        "ENTREPRISE : Boulangerie\nMartin",
        "CONTACT : Claire Martin",
        "EMAIL : claire@example.com",
        "TÉLÉPHONE : non précisé",
        "OFFRE SOUHAITÉE : Autre, sur mesure",
        "",
        "ACTIVITÉ :",
        "Boulangerie artisanale.\nDeux boutiques.",
        "",
        "Répondre à cet email écrit directement à Claire Martin (claire@example.com).",
      ].join("\n"),
    );
  });

  it("writes the acknowledgement without any copy of the request", () => {
    expect(buildAcknowledgementText(buildAcknowledgementContent(input))).toBe(
      [
        "Bonjour Claire Martin,",
        "Merci pour votre message : votre demande est bien arrivée. On vous répond au plus vite.",
        "Une précision à ajouter ? Répondez simplement à cet email.",
        "À bientôt !",
      ].join("\n\n"),
    );
  });
});
