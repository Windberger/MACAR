import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/images/logo.png";
import { UserContext } from "../context/UserContext.tsx";
import { RiCalendarLine, RiGlobeLine } from "react-icons/ri";

function Header() {
    const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // Language menu toggle state
    const { t, i18n } = useTranslation(); // Translation function and i18n instance
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("useUser must be used within a UserProvider");
    }
    const { isLoggedIn } = userContext; // User login state

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLoginRedirect = () => {
        window.location.href = "/login"; // Redirect to login page
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "meeting":
                return <RiCalendarLine size={20} />;
            // Add more cases as needed
            default:
                return null;
        }
    };

    const toggleLanguageMenu = () => {
        setIsLanguageMenuOpen(!isLanguageMenuOpen);
    };

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setIsLanguageMenuOpen(false); // Close the menu after selection
    };

    return (
        <header className="w-full text-white fixed top-0 left-0 z-50 bg-white">
            <div className="w-full flex justify-between items-center h-16">
                <div className="flex items-center ml-6 space-x-4">
                    <img src={logo} alt="Logo" className="h-14 w-14"/>
                    <div className="relative">
                        <RiGlobeLine
                            size={24}
                            className="text-black hover:text-red-700 cursor-pointer"
                            onClick={toggleLanguageMenu}
                            title={t("changeLanguage")}
                        />
                        {isLanguageMenuOpen && (
                            <div className="absolute mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg">
                                <button
                                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                    onClick={() => changeLanguage("en")}
                                >
                                    English
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                    onClick={() => changeLanguage("de")}
                                >
                                    Deutsch
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                    onClick={() => changeLanguage("bs")}
                                >
                                    Bosanski
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden md:flex space-x-8">
                    <a href="#wash-detailing"
                       className="text-black hover:text-red-700">{t("headerWashAndDetailing")}</a>
                    <a href="#mechanic" className="text-black hover:text-red-700">{t("headerMechanic")}</a>
                    <a href="#carousel" className="text-black hover:text-red-700">{t("headerAboutUs")}</a>
                    <a href="#contact" className="text-black hover:text-red-700">{t("headerContact")}</a>
                </div>

                <div className="relative mr-6 flex items-center z-10 space-x-4">
                    {isLoggedIn ? (
                        <RiCalendarLine
                            size={24}
                            className="text-black hover:text-red-700 cursor-pointer"
                            onClick={toggleSidebar}
                        />
                    ) : (
                        <button
                            onClick={handleLoginRedirect}
                            className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded"
                        >
                            {t("headerLogin")}
                        </button>
                    )}
                </div>
            </div>

            {/* Sidebar */}
            {isLoggedIn && (
                <div
                    className={`fixed top-0 right-0 h-full bg-black text-white transform transition-all duration-700 ease-in-out ${
                        isOpen ? "translate-x-0 w-80" : "translate-x-full"
                    }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Sidebar content for appointments */}
                        <div className="mt-16 text-center">
                            <h2 className="text-2xl font-bold">{userContext.user.first_name} {userContext.user.last_name}</h2>
                            <p className="text-sm">{userContext.user.email || userContext.user.phone_number}</p>
                        </div>
                        <div className="flex flex-col items-center my-4 flex-grow justify-center space-y-4">
                            {userContext.appointments.map((appointment, index) => (
                                <div key={index} className="flex flex-col items-center space-y-1">
                                    <div className="flex items-center space-x-2">
                                        {getIcon(appointment.type)}
                                        <span>{appointment.datetimeString}</span>
                                    </div>
                                    <span className="ml-8">{appointment.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;