import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import InformationCardLight from "../../components/InformationCardLight.tsx";
import cleancar from "../../assets/images/cleanCar.jpg";
import reifen from "../../assets/images/reifen.jpg";
import porsche from "../../assets/images/porsche.jpg";
import { useInView } from "react-intersection-observer";
import {BiSolidCarWash, BiSolidCarMechanic} from "react-icons/bi";
import {FaCar} from "react-icons/fa";

function InformationCardsLayoutLight() {
    const { t } = useTranslation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center h-auto bg-white space-y-10"
            id="wash-detailing"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="flex flex-col sm:flex-row md:flex-row justify-center items-center bg-white w-full sm:w-4/5 md:w-11/12 space-y-5 sm:space-y-0 md:space-y-0 sm:space-x-10 md:space-x-10 p-5 z-10 mt-12 rounded-none sm:rounded-xl shadow-lg"
            >
                <InformationCardLight
                    left={true}
                    title={t("firstInformationCardTitle")}
                    description={t("firstInformationCardContent")}
                    className="shadow-none sm:shadow-none md:text-lg"
                    icon={<BiSolidCarWash size={48} color="#b91c1c" />}
                />
                <img src={cleancar} alt="Car Wash" className="hidden sm:block md:block lg:block w-1/3 h-auto z-10" />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                className="flex flex-col sm:flex-row md:flex-row justify-center items-center bg-white w-full sm:w-4/5 md:w-11/12 space-y-5 sm:space-y-0 md:space-y-0 sm:space-x-10 md:space-x-10 p-5 z-10 rounded-none sm:rounded-xl shadow-lg"
                id="mechanic"
            >
                <img src={reifen} alt="Car Mechanic" className="hidden sm:block md:block lg:block w-1/3 h-auto z-10" />
                <InformationCardLight
                    left={false}
                    title={t("secondInformationCardTitle")}
                    description={t("secondInformationCardContent")}
                    className="shadow-none sm:shadow-none md:text-lg"
                    icon={<BiSolidCarMechanic size={48} color="#b91c1c" />}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                className="flex flex-col sm:flex-row md:flex-row justify-center items-center bg-white w-full sm:w-1/2 md:w-11/12 space-y-5 sm:space-y-0 md:space-y-0 sm:space-x-10 md:space-x-10 p-5 z-10 rounded-none sm:rounded-xl shadow-lg"
                id="mechanic"
            >
                <InformationCardLight
                    left={true}
                    title={t("thirdInformationCardTitle")}
                    description={t("thirdInformationCardContent")}
                    className="shadow-none sm:shadow-none md:text-lg"
                    icon={<FaCar size={48} color="#b91c1c" />}
                    button={<button className={"accent-red-800"} />}
                />
                <img src={porsche} alt="Car Mechanic" className="hidden sm:block md:block lg:block w-1/3 h-auto z-10" />
            </motion.div>

            <div className="mb-12"></div>
        </motion.div>
    );
}

export default InformationCardsLayoutLight;