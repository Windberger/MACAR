import HeroImage from "./pages/HeroImage/HeroImage.tsx";
import Header from "./components/Header.tsx";
import {useTranslation} from "react-i18next";
import InformationCardsLayout from "./pages/InformationCards/InformationCardsLayout.tsx";
import Carousel from "./pages/CompanyPage/Carousel.tsx";

function App() {

    const {i18n, t} = useTranslation();
    const onChangeLang = (lang: string) => {
        i18n.changeLanguage(lang);
    };

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
