import { useTranslation } from "react-i18next";
import InformationCardLight from "../../components/InformationCardLight.tsx";
import carwash from "../../assets/images/carwash.jpg";
import carmechanic from "../../assets/images/carmechanic.jpg";

function InformationCardsLayout() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center h-auto bg-white space-y-10" id="wash-detailing">
            <div className="flex justify-center items-center bg-white w-4/5 space-x-10 shadow-2xl p-5 z-10 mt-12">
                <InformationCardLight left={true} title={t("firstInformationCardTitle")}
                                      description={t("firstInformationCardContent")}/>
                <img src={carwash} alt="Car Wash" className="w-1/2 h-full z-10"/>
            </div>
            <div className="flex justify-center items-center bg-white w-4/5 space-x-10 shadow-2xl p-5 z-10" id="mechanic">
                <img src={carmechanic} alt="Car Mechanic" className="w-1/2 h-full z-10"/>
                <InformationCardLight left={false} title={t("secondInformationCardTitle")}
                                      description={t("secondInformationCardContent")}/>
            </div>
            <div className="mb-12"></div>
        </div>
    );
}

export default InformationCardsLayout;