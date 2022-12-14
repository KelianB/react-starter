import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import translations from "./translations";

i18n.use(initReactI18next).init({
    resources: translations,
    fallbackLng: "en",
    lng: "en",
    debug: true,

    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
});

export default i18n;
