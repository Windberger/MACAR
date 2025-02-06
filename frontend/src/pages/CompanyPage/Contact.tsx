import { motion } from "framer-motion";
import { IOpeningTimes } from "../../interfaces/IOpeningTimes.ts";
import { BsInstagram } from "react-icons/bs";
import { SiGooglemaps } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import {t} from "i18next";

function Contact() {
    const address = 'Stjena bb, 77224\nBosnia and Herzegovina';
    const phone = '+387 61 674285';
    const businessHours: IOpeningTimes[] = [
        { weekDay: t("contactWeekdaySunday"), startTime: '08:00', endTime: '14:00' },
        { weekDay: t("contactWeekdayMonday"), startTime: '08:00', endTime: '17:00' },
        { weekDay: t("contactWeekdayTuesday"), startTime: '08:00', endTime: '17:00' },
        { weekDay: t("contactWeekdayWednesday"), startTime: '08:00', endTime: '17:00' },
        { weekDay: t("contactWeekdayThursday"), startTime: '08:00', endTime: '17:00' },
        { weekDay: t("contactWeekdayFriday"), startTime: 'Closed', endTime: '' },
        { weekDay: t("contactWeekdaySaturday"), startTime: '08:00', endTime: '17:00' },
    ];

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });


    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            id="contact"
            className="flex flex-col md:flex-row justify-center items-start md:items-center p-6 bg-gray-100 text-gray-800 space-y-4 md:space-y-0 md:space-x-6"
        >
            {/* Left Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="md:w-1/2 text-left px-4 max-w-md"
            >
                <h2 className="text-2xl font-bold mb-2 text-red-700">{t("contactGetInTouchTitle")}</h2>
                <p className="text-lg font-medium mb-3">
                    {t("contactText1")}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                    {t("contactText2")}
                </p>

                <div>
                    <h3 className="text-lg font-bold">{t("contactTelephoneInformationTitle")}</h3>
                    <p className="text-sm">{phone}</p>
                </div>

                <div className="flex space-x-4 mt-4">
                    <a href="https://www.instagram.com/macar.ba" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-700">
                        <BsInstagram size={24} />
                    </a>
                    <a href="https://maps.app.goo.gl/tq3WHoafEfVPmujB6" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-700">
                        <SiGooglemaps size={24} />
                    </a>
                </div>
            </motion.div>
            {/* Right Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                className="md:w-1/2 text-left px-4 max-w-md space-y-3"
            >
                <div>
                    <h3 className="text-lg font-bold">{t("contactLocationTitle")}</h3>
                    <p className="text-sm whitespace-pre-line">{address}</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold">{t("contactOpeningTimesTitle")}</h3>
                    <ul className="text-sm space-y-1">
                        {businessHours.map((hour, index) => (
                            <li key={index} className={`flex justify-between ${hour.weekDay === today ? 'text-red-700' : ''}`}>
                                <span>{hour.weekDay}</span>
                                <span className="ml-2">{hour.startTime}{hour.endTime && `–${hour.endTime}`}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Contact;