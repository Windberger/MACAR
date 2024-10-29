import "./App.css";
import InformationCard from "./components/InformationCard.tsx";
import HeroImage from "./pages/HeroImage/HeroImage.tsx";
import Header from "./components/Header.tsx";
import {useTranslation} from "react-i18next";

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

            <div style={{padding: "20px"}}>
                <InformationCard
                    title="Auto Waschanlage und Detailing"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget dictum magna, ac lobortis tortor. Mauris ut lorem eu auctor eleifend."
                />
            </div>

        </>
    );
}

export default App;
