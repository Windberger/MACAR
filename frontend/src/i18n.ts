import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                // App
                appTitle: "Hello",

                // Header
                headerCard: "Cards",
                headerPictures: "Pictures",
                headerElse: "Else",

                // HeroImage
                heroImageDescription: "Ihre Autowerkstatt für erstklassigen Service. Inspektion, Reperaturen oder individuelle Lösungen - wir kümmern uns um Ihr Fahrzeug als wäre es unser eigenes",
            }
        },
        bs: {
            translation: {
                //App
                appTitle: "Hallo",

                //Header
                headerCard: "Cards",
                headerPictures: "Pictures",
                headerElse: "Else",

                // HeroImage
                heroImageDescription: "Ihre Autowerkstatt für erstklassigen Service. Inspektion, Reperaturen oder individuelle Lösungen - wir kümmern uns um Ihr Fahrzeug als wäre es unser eigenes",
            }
        }
    },
});


export default i18n;
