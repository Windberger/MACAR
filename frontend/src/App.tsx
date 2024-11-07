import "./App.css";
import HeroImage from "./pages/HeroImage/HeroImage.tsx";
import Header from "./components/Header.tsx";
import {useTranslation} from "react-i18next";
import InformationCardsLayout from "./pages/InformationCards/InformationCardsLayout.tsx";

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
            <div>{t("appTitle")}</div>

            <button onClick={() => onChangeLang("en")}>Englisch</button>
            <button onClick={() => onChangeLang("bs")}>Bosnisch</button>


               <InformationCardsLayout></InformationCardsLayout>


        </>
    );
}

export default App;
