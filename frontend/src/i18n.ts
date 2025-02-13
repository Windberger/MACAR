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
                headerWashAndDetailing: "Wash and Detailing",
                headerMechanic: "Mechanic",
                headerAboutUs: "About Us",
                headerContact: "Contact",
                headerLogin: "Login",
                headerLogout: "Logout",

                // HeroImage
                heroImageDescription: "Your car workshop for first-class service. Inspections, repairs, or customized solutions – we take care of your vehicle as if it were our own.",

                // InformationCard
                firstInformationCardTitle: "Car wash; and detailing",
                firstInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",
                secondInformationCardTitle: "Car; mechanic",
                secondInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",
                thirdInformationCardTitle: "Car; shop",
                thirdInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",


                // Carousel
                headingCompanyPage: "Our Company",

                // LoginPage
                loginPageErrorInvalidKey: "Invalid email/phone number",
                loginPageErrorInvalidPassword: "Password is not in the correct format",
                loginPageErrorAllFieldsRequired: "Please fill in all fields",
                loginPageErrorEmailInUse: "Email is already in use",
                loginPageErrorPhoneNumberInUse: "Phone number is already in use",
                loginPageErrorGeneralError: "Error registering user! Please try again later.",
                loginPageErrorUserNotFound: "User not found",
                loginPageErrorInvalidCredentials: "Invalid credentials",
                loginPageErrorToken: 'Invalid token',

                loginPageIsRegistering: "Register",
                loginPageIsLoggingIn: "Login",
                loginPageFormFirstName: "First name",
                loginPageFormLastName: "Last name",
                loginPageFormEmail: "Email or Phone number",
                loginPageFormPassword: "Password",
                loginPageFormPasswordRequirements: "Password must contain at least 8 characters, one uppercase letter and a number",
                loginPageFormChangeToLogin: "Already have an account? Login here",
                loginPageFormChangeToRegister: "Don't have an account yet?",
                loginPageHeaderRegistering: "Willkommen bei der Registrierung",
                loginPageHeaderLogin: "Willkommen zurück",
                loginPageDescriptionRegister: "Erstellen Sie ein Konto, um alle Vorteile zu nutzen.",
                loginPageDescriptionLogin: "Melden Sie sich an, um fortzufahren.",


                //Contact
                contactText1: "Hey! We are looking forward to starting a project with you!",
                contactText2: "Etiam sit amet convallis erat – class aptent taciti sociosqu ad litora torquent per conubia!\n" +
                    "                    Maecenas gravida lacus. Lorem etiam sit amet convallis erat.",
                contactTelephoneInformationTitle: "CALL US",
                contactLocationTitle: "LOCATION",
                contactOpeningTimesTitle: "BUSINESS HOURS",
                contactGetInTouchTitle: "GET IN TOUCH",
                contactWeekdayMonday: "Monday",
                contactWeekdayTuesday: "Tuesday",
                contactWeekdayWednesday: "Wednesday",
                contactWeekdayThursday: "Thursday",
                contactWeekdayFriday: "Friday",
                contactWeekdaySaturday: "Saturday",
                contactWeekdaySunday: "Sunday",

            }
        },
        de: {
            translation: {
                //App
                appTitle: "Hallo",

                // Header
                headerWashAndDetailing: "Autowäsche und Reinigung",
                headerMechanic: "Werkstatt",
                headerAboutUs: "Über uns",
                headerContact: "Kontakt",
                headerLogin: "Anmelden",
                headerLogout: "Logout",

                // HeroImage
                heroImageDescription: "Ihre Autowerkstatt für erstklassigen Service. Inspektion, Reperaturen oder individuelle Lösungen - wir kümmern uns um Ihr Fahrzeug als wäre es unser eigenes",

                firstInformationCardTitle: "Auto Waschanlage und Detailing",
                firstInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",
                secondInformationCardTitle: "Werkstatt",
                secondInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",

                // Carousel
                headingCompanyPage: "Unser Unternehmen",

                // LoginPage
                loginPageErrorInvalidKey: "Ungültige E-Mail/Telefonnummer",
                loginPageErrorInvalidPassword: "Passwort ist nicht im korrekten Format",
                loginPageErrorAllFieldsRequired: "Bitte füllen Sie alle Felder aus",
                loginPageErrorEmailInUse: "E-Mail wird bereits verwendet",
                loginPageErrorPhoneNumberInUse: "Telefonnummer wird bereits verwendet",
                loginPageErrorGeneralError: "Fehler beim Registrieren des Benutzers! Bitte versuchen Sie es später erneut.",

                loginPageErrorUserNotFound: "Benutzer nicht gefunden",
                loginPageErrorInvalidCredentials: "Passwort oder E-Mail/Telefonnummer ist falsch",
                loginPageErrorToken: 'Ungültiger Token',

                loginPageIsRegistering: "Registrieren",
                loginPageIsLoggingIn: "Anmelden",
                loginPageFormFirstName: "Vorname",
                loginPageFormLastName: "Nachname",
                loginPageFormEmail: "Email-Adresse oder Telefonnummer",
                loginPageFormPassword: "Passwort",
                loginPageFormPasswordRequirements: "Mind. 8 Zeichen, enthält Großbuchstabe und Zahl.",
                loginPageFormChangeToLogin: "Bereits ein Konto?",
                loginPageFormChangeToRegister: "Noch kein Konto?",
                loginPageDescriptionRegister: "Erstellen Sie ein Konto, um alle Vorteile zu nutzen.",
                loginPageDescriptionLogin: "Melden Sie sich an, um fortzufahren.",

                //Contact
                contactText1: "Hey! Wir freuen uns darauf, ein Projekt mit dir zu starten!",
                contactText2: "Etiam sit amet convallis erat – class aptent taciti sociosqu ad litora torquent per conubia!\n" +
                    "                    Maecenas gravida lacus. Lorem etiam sit amet convallis erat.",
                contactTelephoneInformationTitle: "KONTAKT",
                contactLocationTitle: "STANDORT",
                contactOpeningTimesTitle: "ÖFFNUNGSZEITEN",
                contactGetInTouchTitle: "KONTAKT",
                contactWeekdayMonday: "Montag",
                contactWeekdayTuesday: "Dienstag",
                contactWeekdayWednesday: "Mittwoch",
                contactWeekdayThursday: "Donnerstag",
                contactWeekdayFriday: "Freitag",
                contactWeekdaySaturday: "Samstag",
                contactWeekdaySunday: "Sonntag",

            }
        },
        bs: {
            translation: {
                // App
                appTitle: "Zdravo",

                // Header
                headerWashAndDetailing: "Pranje i Detailing",
                headerMechanic: "Mehaničar",
                headerAboutUs: "O Nama",
                headerContact: "Kontakt",
                headerLogin: "Prijava",
                headerLogout: "Odjava",

                // HeroImage
                heroImageDescription: "Vaša automehaničarska radionica za vrhunsku uslugu. Pregledi, popravke ili prilagođena rješenja – brinemo o vašem vozilu kao da je naše.",

                // InformationCard
                firstInformationCardTitle: "Pranje i detailing",
                firstInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",
                secondInformationCardTitle: "Automehaničar",
                secondInformationCardContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit",

                // Carousel
                headingCompanyPage: "Naša kompanija",

                // LoginPage
                loginPageErrorInvalidKey: "Neispravna e-mail adresa/broj telefona",
                loginPageErrorInvalidPassword: "Lozinka nije u ispravnom formatu",
                loginPageErrorAllFieldsRequired: "Molimo popunite sva polja",
                loginPageErrorEmailInUse: "E-mail adresa je već u upotrebi",
                loginPageErrorPhoneNumberInUse: "Broj telefona je već u upotrebi",
                loginPageErrorGeneralError: "Greška pri registraciji korisnika! Molimo pokušajte kasnije.",
                loginPageErrorUserNotFound: "Korisnik nije pronađen",
                loginPageErrorInvalidCredentials: "Neispravni podaci za prijavu",
                loginPageErrorToken: "Neispravan token",

                loginPageIsRegistering: "Registracija",
                loginPageIsLoggingIn: "Prijava",
                loginPageFormFirstName: "Ime",
                loginPageFormLastName: "Prezime",
                loginPageFormEmail: "E-mail ili broj telefona",
                loginPageFormPassword: "Lozinka",
                loginPageFormPasswordRequirements: "Lozinka mora sadržavati najmanje 8 znakova, jedno veliko slovo i jedan broj",
                loginPageFormChangeToLogin: "Već imate račun? Prijavite se ovdje",
                loginPageFormChangeToRegister: "Još nemate račun?",
                loginPageHeaderRegistering: "Dobrodošli u registraciju",
                loginPageHeaderLogin: "Dobrodošli nazad",
                loginPageDescriptionRegister: "Kreirajte račun kako biste iskoristili sve prednosti.",
                loginPageDescriptionLogin: "Prijavite se da biste nastavili.",

                // Contact
                contactText1: "Hej! Radujemo se započinjanju projekta s vama!",
                contactText2: "Etiam sit amet convallis erat – class aptent taciti sociosqu ad litora torquent per conubia!\nMaecenas gravida lacus. Lorem etiam sit amet convallis erat.",
                contactTelephoneInformationTitle: "POZOVITE NAS",
                contactLocationTitle: "LOKACIJA",
                contactOpeningTimesTitle: "RADNO VRIJEME",
                contactGetInTouchTitle: "KONTAKTIRAJTE NAS",
                contactWeekdayMonday: "Ponedjeljak",
                contactWeekdayTuesday: "Utorak",
                contactWeekdayWednesday: "Srijeda",
                contactWeekdayThursday: "Četvrtak",
                contactWeekdayFriday: "Petak",
                contactWeekdaySaturday: "Subota",
                contactWeekdaySunday: "Nedjelja"
            }
        }
    },
});


export default i18n;
