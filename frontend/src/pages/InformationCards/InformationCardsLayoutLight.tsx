import { useTranslation } from "react-i18next";
import InformationCardLight from "../../components/InformationCardLight.tsx";
import carwash from "../../assets/images/carwash.jpg";
import carmechanic from "../../assets/images/carmechanic.jpg";

function InformationCardsLayoutLight() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center h-auto bg-white space-y-10" id="wash-detailing">
            <div className="flex flex-col sm:flex-row md:flex-col justify-center items-center bg-white w-full sm:w-4/5 md:w-full space-y-5 sm:space-y-0 md:space-y-5 sm:space-x-10 md:space-x-0 p-5 z-10 mt-12 rounded-none sm:rounded-xl shadow-lg">
                <InformationCardLight
                    left={true}
                    title={t("firstInformationCardTitle")}
                    description={t("firstInformationCardContent")}
                    className="shadow-none sm:shadow-none md:text-lg"
                />
                <img src={carwash} alt="Car Wash" className="hidden sm:block md:hidden w-1/2 h-full z-10" />
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col justify-center items-center bg-white w-full sm:w-4/5 md:w-full space-y-5 sm:space-y-0 md:space-y-5 sm:space-x-10 md:space-x-0 p-5 z-10 rounded-none sm:rounded-xl shadow-lg" id="mechanic">
                <img src={carmechanic} alt="Car Mechanic" className="hidden sm:block md:hidden w-1/2 h-full z-10" />
                <InformationCardLight
                    left={false}
                    title={t("secondInformationCardTitle")}
                    description={t("secondInformationCardContent")}
                    className="shadow-none sm:shadow-none md:text-lg"
                />
            </div>
            <div className="mb-12"></div>
        </div>
    );
}

export default InformationCardsLayoutLight;