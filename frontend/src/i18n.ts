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
                heroImageDescription: "Your car workshop for first-class service. Inspections, repairs, or customized solutions – we take care of your vehicle as if it were our own.",

                // InformationCard
                firstInformationCardTitle: "Car wash; and detailing",
                firstInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",
                secondInformationCardTitle: "Motor vehicle; workshop",
                secondInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",

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

                firstInformationCardTitle: "Auto Waschanlage und Detailing",
                firstInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",
                secondInformationCardTitle: "Werkstatt",
                secondInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",
            }
        }
    },
});


export default i18n;
