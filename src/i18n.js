import i18next from "i18next";
import Backend from "i18next-http-backend";
import es from "./locales/es.js";
import en from "./locales/en.js";

i18next
  .use(Backend)
  .init({
    lng: "es", // Idioma por defecto
    fallbackLng: "en",
    debug: true, // Activa logs en consola para depuración
    resources: {
      es,
      en,
    }
  });

// Exponer i18next en window para acceder desde la consola
window.i18next = i18next;

export default i18next;
