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
                firstInformationCardContent: "Give your car the treatment it deserves! Our professional car cleaning and detailing services bring back the shine and freshness to your vehicle, inside and out. From deep interior cleaning to flawless exterior polishing, we ensure every detail is perfect. Experience a spotless, showroom-quality finish – book your appointment today!",
                secondInformationCardTitle: "Car; mechanic",
                secondInformationCardContent: "Keep your car running smoothly with our expert auto repair and maintenance services! From routine check-ups to complex engine repairs, our skilled mechanics ensure your vehicle stays reliable and safe on the road. We use high-quality parts and the latest technology to deliver top-notch service. Drive with confidence – book your appointment today!",
                thirdInformationCardTitle: "Car; shop",
                thirdInformationCardContent: "Find your perfect car with us! Whether you're looking for a reliable family vehicle, a stylish sedan, or a powerful SUV, we offer a wide selection of high-quality cars at unbeatable prices. With a hassle-free buying process and great deals, getting your next car has never been easier. Visit us today and drive away in your dream car!",
                carShopButton: "Go to Car Shop",


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
                contactText1: "Hey! We are looking forward to assist you in any matter!",
                contactText2: "Contact us now and let's bring your project to life together! You can reach us by phone, on social media, or in person. Whether you have questions, inquiries, or special requests – we're here for you and look forward to your message!",
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
                contactWeekdayClosed: "Closed",


                //Olx
                find: "Find",
                your: "your",
                new: "new",
                car: "car",
                buttonFind: "Find"

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
                firstInformationCardContent: "Gönnen Sie Ihrem Auto die Pflege, die es verdient! Unsere professionellen Auto-Reinigungs- und Detailing-Services verleihen Ihrem Fahrzeug neuen Glanz und Frische – innen und außen. Von der gründlichen Innenreinigung bis zur makellosen Außenpolitur sorgen wir für Perfektion in jedem Detail. Erleben Sie eine makellose, showroomreife Sauberkeit – buchen Sie noch heute Ihren Termin!",
                secondInformationCardTitle: "Werkstatt",
                secondInformationCardContent: "Halten Sie Ihr Auto in Bestform mit unseren professionellen Auto-Reparatur- und Wartungsdiensten! Von regelmäßigen Inspektionen bis hin zu komplexen Motorreparaturen – unsere erfahrenen Mechaniker sorgen dafür, dass Ihr Fahrzeug zuverlässig und sicher bleibt. Wir verwenden hochwertige Ersatzteile und moderne Technik für erstklassigen Service. Fahren Sie sorgenfrei – vereinbaren Sie noch heute einen Termin!",
                thirdInformationCardTitle: "Auto; Shop",
                thirdInformationCardContent: "Finden Sie Ihr Traumauto bei uns! Ob zuverlässiges Familienauto, elegante Limousine oder kraftvoller SUV – wir bieten eine große Auswahl an hochwertigen Fahrzeugen zu unschlagbaren Preisen. Dank eines unkomplizierten Kaufprozesses und attraktiven Angeboten war der Autokauf noch nie so einfach. Besuchen Sie uns noch heute und fahren Sie mit Ihrem Wunschauto nach Hause!",
                carShopButton: "Zum Auto Shop",


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
                contactText1: "Hey! Wir freuen uns darauf, dich in jeder Hinsicht zu unterstützen!",
                contactText2: "Kontaktiere uns jetzt und lass uns gemeinsam dein Projekt verwirklichen! Du erreichst uns per Telefon, über Social Media oder direkt vor Ort. Ob Fragen, Anfragen oder individuelle Wünsche – wir sind für dich da und freuen uns auf deine Nachricht!",
                contactTelephoneInformationTitle: "Kontakt",
                contactLocationTitle: "STANDORT",
                contactOpeningTimesTitle: "ÖFFNUNGSZEITEN",
                contactGetInTouchTitle: "Kontaktiere uns",
                contactWeekdayMonday: "Montag",
                contactWeekdayTuesday: "Dienstag",
                contactWeekdayWednesday: "Mittwoch",
                contactWeekdayThursday: "Donnerstag",
                contactWeekdayFriday: "Freitag",
                contactWeekdaySaturday: "Samstag",
                contactWeekdaySunday: "Sonntag",
                contactWeekdayClosed: "Geschlossen",

                //Olx
                find: "Finde",
                your: "Dein",
                new: "neues",
                car: "Auto",
                buttonFind: "Finden"
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
                heroImageDescription: "Vaša automehaničarska radionica za vrhunsku uslugu. Pregledi, popravke ili prilagođena rješenja – brinemo se o vašem vozilu kao da je naše.",

                // InformationCard
                firstInformationCardTitle: "Pranje i detailing",
                firstInformationCardContent: "Dajte svom automobilu tretman koji zaslužuje! Naše profesionalne usluge čišćenja i detaljnog uređivanja automobila vraćaju sjaj i svježinu vašem vozilu, iznutra i izvana. Od dubinskog čišćenja unutrašnjosti do besprijekornog poliranja eksterijera, osiguravamo savršenstvo u svakom detalju. Iskusite besprijekornu, salonsku čistoću – rezervišite svoj termin već danas!",
                secondInformationCardTitle: "Automehaničar",
                secondInformationCardContent: "Održavajte svoj automobil u savršenom stanju uz naše stručne usluge auto mehanike i servisa! Od redovnih pregleda do složenih popravki motora, naši iskusni mehaničari osiguravaju da vaše vozilo ostane pouzdano i sigurno na cesti. Koristimo visokokvalitetne dijelove i najnoviju tehnologiju za vrhunsku uslugu. Vozite bez brige – zakažite svoj termin već danas!",
                thirdInformationCardTitle: "Prodaja; automobila",
                thirdInformationCardContent: "Pronađite savršen automobil kod nas! Bilo da tražite pouzdano porodično vozilo, elegantnu limuzinu ili snažan SUV, nudimo širok izbor visokokvalitetnih automobila po najboljim cijenama. Uz jednostavan proces kupovine i odlične ponude, nikada nije bilo lakše doći do novog vozila. Posjetite nas danas i odvezite se u automobilu svojih snova!",
                carShopButton:
                    "U prodavnicu automobila",


                // Carousel
                headingCompanyPage: "Naša radnja",

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
                contactText1: "Hej! Radujemo se što vam možemo pomoći u bilo čemu!!",
                contactText2: "Kontaktirajte nas sada i zajedno ćemo realizirati vaš projekat! Možete nas dobiti putem telefona, društvenih mreža ili direktno na lokaciji. Bilo da imate pitanja, upite ili posebne želje – tu smo za vas i radujemo se vašoj poruci!",
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
                contactWeekdaySunday: "Nedjelja",
                contactWeekdayClosed: "Zatvoreno",


                //Olx
                find: "Pronađite",
                your: "svoje",
                new: "novo",
                car: "vozilo",
                buttonFind: "Pronađi"
            }
        }
    },
});


export default i18n;
