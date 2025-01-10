import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { values } from "remeda";
import heTranslation from "./heTranslation";
import { Language, Namespaces } from "./i18n.constants";

export const resources = {
  [Language.Hebrew]: heTranslation,
};

i18n.use(initReactI18next).init({
  resources,
  lng: Language.Hebrew,
  ns: [...values(Namespaces)],
});

export default i18n;
