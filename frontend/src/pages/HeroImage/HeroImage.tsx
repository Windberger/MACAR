import heroBackground from "../../assets/images/heroImageCar.png";
import "../../App.css";
import {useTranslation} from "react-i18next"; // Ensure this import is present to include the CSS

function HeroImage() {

    const {t} = useTranslation();

    return (
        <div className="relative h-screen w-full bg-black flex items-center justify-center">
            <div
                className="absolute inset-0 fade-in"
                style={{
                    backgroundImage: `url(${heroBackground})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            ></div>

            <div className="relative z-10 flex flex-col text-center text-white mt-32">
                <h1 className="macar text-5xl text-red-700 md:text-7xl font-bold mb-6">
                    MA<span className="macar text-white">CAR</span>
                </h1>
                <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
                    {t("heroImageDescription")}
                </p>
            </div>
        </div>
    );
}

export default HeroImage;