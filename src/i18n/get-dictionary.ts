import type { Locale } from "./config";
import { ar } from "./dictionaries/ar";
import { en } from "./dictionaries/en";

const dictionaries = { ar, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
