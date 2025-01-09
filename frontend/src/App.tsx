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

function App() {

    const {i18n, t} = useTranslation();

    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext not found");
    }

    const {setToken, setUser, setAppointments, setIsLoggedIn} = userContext;

    const onChangeLang = (lang: string) => {
        i18n.changeLanguage(lang);
    };


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
        <>
            <Header/>
            <div>
                <HeroImage/>
            </div>
            {//<button onClick={() => onChangeLang("en")}>Englisch</button>
                // <button onClick={() => onChangeLang("bs")}>Bosnisch</button>
            }

            <InformationCardsLayout></InformationCardsLayout>
            <Carousel heading={t("headingCompanyPage")}></Carousel>
        </>
    );
}

export default App;
