import { describe, expect, it } from "vitest";

import { getValidationTranslator } from "@/lib/i18n/translator";

import type { ContactFormValues } from "../types";
import { toFieldErrors } from "../utils/to-field-errors";
import { createContactSchema } from "./contact-schema";

const schema = createContactSchema(getValidationTranslator());

const valid: ContactFormValues = {
  type: "complet",
  company: "Boulangerie Martin",
  name: "Claire Martin",
  activity: "Boulangerie artisanale à Lausanne.",
  email: "claire@example.com",
  phone: "",
  pack: "",
};

function errorsFor(overrides: Partial<ContactFormValues>) {
  const result = schema.safeParse({ ...valid, ...overrides });
  return result.success ? {} : toFieldErrors(result.error);
}

describe("contact schema", () => {
  it("trims values and turns empty optional fields into undefined", () => {
    const result = schema.parse({
      ...valid,
      company: "  Boulangerie Martin  ",
      phone: " ",
      pack: "",
    });
    expect(result.company).toBe("Boulangerie Martin");
    expect(result.phone).toBeUndefined();
    expect(result.pack).toBeUndefined();
  });

  it("keeps a valid phone and pack", () => {
    const result = schema.parse({
      ...valid,
      phone: "+41 79 000 00 00",
      pack: "sur-mesure",
    });
    expect(result.phone).toBe("+41 79 000 00 00");
    expect(result.pack).toBe("sur-mesure");
  });

  it("reports one exact message per field", () => {
    expect(
      errorsFor({ type: "", company: "", name: "", activity: "", email: "" }),
    ).toEqual({
      type: ["Choisissez le type de site qui vous correspond."],
      company: ["Indiquez le nom de votre entreprise."],
      name: ["Indiquez votre prénom et votre nom."],
      activity: ["Décrivez votre activité en quelques lignes."],
      email: ["Indiquez votre adresse email."],
    });
  });

  it("counts length after trimming", () => {
    expect(errorsFor({ company: " A " })).toEqual({
      company: ["Au moins 2 caractères."],
    });
    expect(errorsFor({ activity: "  court   " })).toEqual({
      activity: ["Encore quelques mots : 10 caractères au minimum."],
    });
  });

  it("applies the upper limits", () => {
    expect(errorsFor({ name: "a".repeat(101) })).toEqual({
      name: ["100 caractères au maximum."],
    });
    expect(errorsFor({ activity: "a".repeat(2001) })).toEqual({
      activity: ["2000 caractères au maximum."],
    });
    expect(errorsFor({ email: `${"a".repeat(250)}@example.com` })).toEqual({
      email: ["254 caractères au maximum."],
    });
    expect(errorsFor({ phone: "1".repeat(31) })).toEqual({
      phone: ["30 caractères au maximum."],
    });
  });

  it("refuses links in company and name", () => {
    expect(errorsFor({ company: "bellini.ch", name: "www.martin" })).toEqual({
      company: ["Les liens ne sont pas acceptés dans ce champ."],
      name: ["Les liens ne sont pas acceptés dans ce champ."],
    });
  });

  it("rejects an invalid email, phone, type and pack", () => {
    expect(errorsFor({ email: "claire@" })).toEqual({
      email: ["Cette adresse email ne semble pas valide."],
    });
    expect(errorsFor({ phone: "079.000.00.00" })).toEqual({
      phone: ["Ce numéro ne semble pas valide. Exemple : +41 79 000 00 00"],
    });
    expect(errorsFor({ type: "blog" })).toEqual({
      type: ["Choisissez le type de site qui vous correspond."],
    });
    expect(errorsFor({ pack: "Essentiel · 500 CHF" })).toEqual({
      pack: ["Choisissez une offre dans la liste."],
    });
  });
});
