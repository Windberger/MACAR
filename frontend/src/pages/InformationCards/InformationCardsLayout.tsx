
import {useTranslation} from "react-i18next";
import InformationCard from "../../components/InformationCard.tsx";


function InformationCardsLayout() {
    const {t} = useTranslation();
    return (
        <div className="flex justify-center items-center h-screen mb-5 bg-red-950">
            <div className="flex space-x-60">
                <InformationCard left = {true} title={t("firstInformationCardTitle")} description={t("firstInformationCardContent")}/>
                <InformationCard left={false} title={t("secondInformationCardTitle")} description={t("secondInformationCardContent")}/>
            </div>
        </div>
    );
}

export default InformationCardsLayout;