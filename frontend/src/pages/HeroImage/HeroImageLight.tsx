import ferrariHalf from "../../assets/images/ferrariHalf.png";
import "../../App.css";
import {useTranslation} from "react-i18next"; // Ensure this import is present to include the CSS

function HeroImageLight() {

    const {t} = useTranslation();

    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-white">
            <div
                className="absolute left-0 h-full w-1/2"
                style={{
                    backgroundImage: `url(${ferrariHalf})`,
                    backgroundPosition: "left bottom",
                    backgroundSize: "80% auto",
                    backgroundRepeat: "no-repeat",
                    marginTop: "10%"
                }}
            ></div>

            <div className="relative z-10 flex flex-col text-center text-black mt-32 w-1/2 ml-auto">
                <h1 className="macar text-5xl text-red-700 md:text-7xl font-bold mb-6">
                    MA<span className="macar text-black">CAR</span>
                </h1>
                <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
                    {t("heroImageDescription")}
                </p>
            </div>
        </div>
    );
}

export default HeroImageLight;