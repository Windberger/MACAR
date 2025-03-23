import HeaderLight from "./components/HeaderLight.tsx";
import HeroImageLight from "./pages/HeroImage/HeroImageLight.tsx";
import InformationCardsLayoutLight from "./pages/InformationCards/InformationCardsLayoutLight.tsx";
import Carousel from "./pages/CompanyPage/Carousel.tsx";
import Contact from "./pages/CompanyPage/Contact.tsx";

function Homepage() {
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
            <Carousel></Carousel>
            <Contact/>
        </div>
    );
}

export default Homepage;