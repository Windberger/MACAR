import HeroImageLight from "./pages/HeroImage/HeroImageLight.tsx";
import HeaderLight from "./components/HeaderLight.tsx";
import { useTranslation } from "react-i18next";
import Carousel from "./pages/CompanyPage/Carousel.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import InformationCardsLayoutLight from "./pages/InformationCards/InformationCardsLayoutLight.tsx";
import Header from "./components/Header.tsx";
import HeroImage from "./pages/HeroImage/HeroImage.tsx";
import InformationCardsLayout from "./pages/InformationCards/InformationCardsLayout.tsx";
import Contact from "./pages/CompanyPage/Contact.tsx";

function App() {
    const { t } = useTranslation();

    return (
        <UserProvider>
            <HeaderLight />
            <div>
                <HeroImageLight />
            </div>
            {//<button onClick={() => onChangeLang("en")}>Englisch</button>
                // <button onClick={() => onChangeLang("bs")}>Bosnisch</button>
            }
                <InformationCardsLayoutLight />
                <Carousel heading={t("headingCompanyPage")} />
            <Contact />
        </UserProvider>
    );
}

export default App;