
import {useTranslation} from "react-i18next";
import InformationCard from "../../components/InformationCard.tsx";


function InformationCardsLayout() {
    const {t} = useTranslation();
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex space-x-60">
                <InformationCard title={t("firstInformationCardTitle")} description={t("firstInformationCardContent")}/>
                <InformationCard title={t("secondInformationCardTitle")} description={t("secondInformationCardContent")}/>
            </div>
        </div>
    );
}

export default InformationCardsLayout;