import { beforeEach, describe, expect, it, vi } from "vitest";

import type { EmailMessage, SendEmailResult } from "@/services/mailer";

vi.mock("server-only", () => ({}));

const sendEmail = vi.fn<(message: EmailMessage) => Promise<SendEmailResult>>();
vi.mock("@/services/mailer", () => ({ sendEmail }));

vi.mock("@/config/env", () => ({
  getEnv: () => ({
    CONTACT_TO_EMAIL: "inbox@example.com",
    CONTACT_FROM_EMAIL: "site@example.com",
    CONTACT_DRY_RUN: false,
  }),
}));

const { sendContactMessage } = await import("./send-contact-message");

function formData(overrides: Record<string, string> = {}): FormData {
  const data = new FormData();
  const values: Record<string, string> = {
    type: "vitrine",
    company: "Boulangerie Martin",
    name: "Claire Martin",
    activity: "Boulangerie artisanale à Lausanne.",
    email: "claire@example.com",
    phone: "",
    pack: "",
    website: "",
    startedAt: String(Date.now() - 10_000),
    ...overrides,
  };
  for (const [name, value] of Object.entries(values)) data.set(name, value);
  return data;
}

describe("sendContactMessage", () => {
  beforeEach(() => {
    sendEmail.mockReset();
    sendEmail.mockResolvedValue({ ok: true });
  });

  it("sends the notification first, then the acknowledgement", async () => {
    await expect(sendContactMessage(null, formData())).resolves.toEqual({
      success: true,
      data: null,
    });
    expect(sendEmail).toHaveBeenCalledTimes(2);

    const [notification, acknowledgement] = sendEmail.mock.calls.map(
      ([message]) => message,
    );
    expect(notification).toMatchObject({
      to: "inbox@example.com",
      replyTo: "claire@example.com",
      subject: "Nouveau projet · Boulangerie Martin",
    });
    expect(acknowledgement).toMatchObject({
      to: "claire@example.com",
      replyTo: "info@clicksansbug.ch",
      subject: "Votre demande a bien été reçue · ClickSansBug",
    });
    // No copy of the request in the acknowledgement.
    expect(acknowledgement?.text).not.toContain("Boulangerie artisanale");
    expect(acknowledgement?.html).not.toContain("Boulangerie artisanale");
  });

  it.each([
    ["honeypot filled", { website: "x" }],
    ["sent under 3 s", { startedAt: String(Date.now()) }],
    ["timestamp missing", { startedAt: "" }],
  ])(
    "returns a fake success without any email when %s",
    async (_case, overrides) => {
      await expect(
        sendContactMessage(null, formData(overrides)),
      ).resolves.toEqual({
        success: true,
        data: null,
      });
      expect(sendEmail).not.toHaveBeenCalled();
    },
  );

  it("returns field errors without sending anything", async () => {
    const result = await sendContactMessage(
      null,
      formData({ email: "", company: "bellini.ch" }),
    );
    expect(result).toEqual({
      success: false,
      error: "VALIDATION",
      fieldErrors: {
        company: ["Les liens ne sont pas acceptés dans ce champ."],
        email: ["Indiquez votre adresse email."],
      },
    });
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("fails without sending the acknowledgement when the notification fails", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    sendEmail.mockResolvedValueOnce({
      ok: false,
      reason: "rate_limit_exceeded (status 429)",
    });

    await expect(sendContactMessage(null, formData())).resolves.toEqual({
      success: false,
      error: "SEND_FAILED",
    });
    expect(sendEmail).toHaveBeenCalledTimes(1);
    consoleError.mockRestore();
  });

  it("still succeeds when only the acknowledgement fails", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    sendEmail
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: false, reason: "x (status 500)" });

    await expect(sendContactMessage(null, formData())).resolves.toEqual({
      success: true,
      data: null,
    });
    expect(consoleError).toHaveBeenCalledWith(
      "[contact.acknowledgement] x (status 500)",
    );
    consoleError.mockRestore();
  });

  it("logs unexpected errors without personal data and returns a generic error", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    sendEmail.mockRejectedValueOnce(new TypeError("fetch failed"));

    await expect(sendContactMessage(null, formData())).resolves.toEqual({
      success: false,
      error: "SEND_FAILED",
    });
    const logged = consoleError.mock.calls.flat().join(" ");
    expect(logged).toBe("[sendContactMessage] TypeError: fetch failed");
    expect(logged).not.toContain("claire@example.com");
    consoleError.mockRestore();
  });
});
