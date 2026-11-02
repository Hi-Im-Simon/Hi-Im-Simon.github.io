import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import pl from "./locales/pl/translation.json";
import en from "./locales/en/translation.json";

export function syncDocumentLanguage() {
  document.documentElement.lang = i18n.resolvedLanguage ?? "en";
  document.title = i18n.t("meta.title");
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", i18n.t("meta.description"));
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { pl: { translation: pl }, en: { translation: en } },
    supportedLngs: ["pl", "en"],
    fallbackLng: "en",
    load: "languageOnly",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "portfolio.language",
    },
    interpolation: { escapeValue: false },
    // Both dictionaries are bundled, so the initial render needs no network request.
    initAsync: false,
  });

syncDocumentLanguage();
i18n.on("languageChanged", syncDocumentLanguage);

export default i18n;
