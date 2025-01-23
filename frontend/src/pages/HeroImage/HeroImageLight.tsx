import ferrariHalf from "../../assets/images/ferrariHalf.png";
import "../../App.css";
import {useTranslation} from "react-i18next";

function HeroImageLight() {

    const {t} = useTranslation();

    return (
        <div className="relative h-screen w-full flex flex-col md:flex-row items-center justify-center bg-white">
            <div className="relative z-10 text-center text-black mt-32 w-full md:w-2/3 md:order-2">
                <h1 className="macar text-5xl text-red-700 md:text-7xl font-bold mb-6">
                    MA<span className="macar text-black">CAR</span>
                </h1>
                <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto hidden md:block">
                    {t("heroImageDescription")}
                </p>
            </div>
            <div
                className="relative w-full md:w-1/3 h-1/2 md:h-full flex justify-start md:order-1"
                style={{
                    backgroundImage: `url(${ferrariHalf})`,
                    backgroundPosition: "left bottom",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>
        </div>
    );
}

export default HeroImageLight;