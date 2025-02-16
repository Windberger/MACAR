import HeroImage from "./pages/HeroImage/HeroImage.tsx";
import Header from "./components/Header.tsx";
import {useTranslation} from "react-i18next";
import InformationCardsLayout from "./pages/InformationCards/InformationCardsLayout.tsx";
import Carousel from "./pages/CompanyPage/Carousel.tsx";
import {UserContext} from "./context/UserContext.tsx";
import {useContext, useEffect} from "react";
import {getAccessToken} from "./services/authService.ts";
import {fetchUserData} from "./services/userService.ts";
import {getAppointmentsByUser} from "./services/appointmentService.ts";
import HeaderLight from "./components/HeaderLight.tsx";
import HeroImageLight from "./pages/HeroImage/HeroImageLight.tsx";
import InformationCardsLayoutLight from "./pages/InformationCards/InformationCardsLayoutLight.tsx";
import Contact from "./pages/CompanyPage/Contact.tsx";

function App() {

    const {i18n, t} = useTranslation();
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext not found");
    }
    const {setToken, setUser, setAppointments, setIsLoggedIn} = userContext;


    useEffect(() => {
        const userLang = navigator.language || "en";
        i18n.changeLanguage(userLang);
    }, [i18n]);



    useEffect(() => {
        getAccessToken().then((accessToken) => {
            setToken(accessToken);

            if (!accessToken) {
                console.log("No token found");
                return;
            }
            fetchUserData(accessToken).then((userData) => {
                setUser(userData);
                setIsLoggedIn(true);

                getAppointmentsByUser(accessToken).then((appointments) => {
                    setAppointments(appointments);
                });
            }).catch((error) => {
                // TODO: Error handling
                console.error("Error while fetching user data:", error);
            });
        }).catch((error) => {
            console.log("No user is logged in ", error);
        });
    }, []);


    return (
        <div className={"bg-white"}>
            <HeaderLight/>
            <div>
                <HeroImageLight/>
            </div>
            {//<button onClick={() => onChangeLang("en")}>Englisch</button>
                // <button onClick={() => onChangeLang("bs")}>Bosnisch</button>
            }

            <InformationCardsLayoutLight></InformationCardsLayoutLight>
            <Carousel heading={t("headingCompanyPage")}></Carousel>
            <Contact/>
        </div>
    );
}

export default App;
