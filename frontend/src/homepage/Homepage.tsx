import HeaderLight from "./components/HeaderLight.tsx";
import HeroImageLight from "./pages/HeroImage/HeroImageLight.tsx";
import InformationCardsLayoutLight from "./pages/InformationCards/InformationCardsLayoutLight.tsx";
import Carousel from "./pages/CompanyPage/Carousel.tsx";
import Contact from "./pages/CompanyPage/Contact.tsx";
import OlxImageComponent from "./components/OlxContainer.tsx";

function Homepage() {
    return (
        <div className={"bg-white"}>
            <HeaderLight/>
            <div className="mb-12 mt-12">
                <HeroImageLight/>
            </div>
            <div className="mb-12 mt-12">
                <InformationCardsLayoutLight></InformationCardsLayoutLight>
            </div>
            <div>
                <OlxImageComponent/>
            </div>
            <div className="mb-12 mt-12 bg-gray-100">
                <Carousel></Carousel>
                <div className="mt-12 bg-gray-100">
                    <Contact/>
                </div>

            </div>

        </div>
    );
}

export default Homepage;