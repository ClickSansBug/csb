import { getRequestConfig } from "next-intl/server";

import { messages } from "@/config/content/fr";

import { DEFAULT_LOCALE, TIME_ZONE } from "./config";

// No i18n routing: the locale is fixed, so pages stay statically rendered.
export default getRequestConfig(async () => ({
  locale: DEFAULT_LOCALE,
  timeZone: TIME_ZONE,
  messages,
}));
