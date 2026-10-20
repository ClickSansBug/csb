import { common } from "./common";
import { contact } from "./contact";
import { emails } from "./emails";
import { faq } from "./faq";
import { home } from "./home";
import { legal } from "./legal";
import { metadata } from "./metadata";
import { notFound } from "./not-found";
import { pricing } from "./pricing";
import { processPage } from "./process";
import { validation } from "./validation";

// French messages: the type reference for every future locale.
export const messages = {
  common,
  home,
  pricing,
  process: processPage,
  faq,
  contact,
  legal,
  notFound,
  metadata,
  emails,
  validation,
};
