import type { messages } from "@/config/content/fr";
import type { DEFAULT_LOCALE } from "@/lib/i18n/config";

declare module "next-intl" {
  interface AppConfig {
    Locale: typeof DEFAULT_LOCALE;
    Messages: typeof messages;
  }
}
