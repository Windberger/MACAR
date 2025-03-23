import { useContext, useState, useEffect } from 'react';
import logo from "../assets/images/logo.png";
import { Sling as Hamburger } from 'hamburger-react';
import { RiSettingsFill, RiTempColdLine, RiTempHotLine, RiThunderstormsLine, RiGlobalLine } from "react-icons/ri";
import LoginPageLight from "../pages/LoginPage/LoginPageLight.tsx";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContext.tsx";
import { nullUser } from "../types/UserData.ts";
import { logoutUser } from "../services/authService.ts";

function Header() {
    const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state
    const [isExpanded, setIsExpanded] = useState(false); // Sidebar expansion state
    const [showDropdown, setShowDropdown] = useState(false); // Dropdown menu state

    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("useUser must be used within a UserProvider");
    }
    const { isLoggedIn, setIsLoggedIn, setToken, user, setUser, appointments, setAppointments } = userContext; // User login state
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (isExpanded && isLoggedIn) {
            setIsExpanded(false); // Minimize sidebar when logged in
        }
    }, [isExpanded, isLoggedIn]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsExpanded(false); // Reset expansion state when opening the sidebar
        }
    };

    const handleLogout = () => {
        logoutUser().then(() => {
            setIsLoggedIn(false);// Simulate logout
            setToken(null);
            setUser(nullUser);
            setAppointments([]);
            setIsExpanded(false); // Close sidebar
        }).catch((error) => {
            console.error("Error while logging out:", error);
        });
    };

    const handleLogin = () => {
        setIsExpanded(true); // Expand sidebar to show login page
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setShowDropdown(false);
    };

    const icons = Array.from({ length: 8 }).map((_, index) => (
        <RiSettingsFill
            key={index}
            className={`text-3xl ${index < user.bonus ? "text-red-700" : "text-gray-500"}`}
        />
    ));

    const getIcon = (type: string) => {
        switch (type) {
            case "cold":
                return <RiTempColdLine className="text-2xl" />;
            case "hot":
                return <RiTempHotLine className="text-2xl" />;
            case "storm":
                return <RiThunderstormsLine className="text-2xl" />;
            default:
                return null;
        }
    };

    return (
        <header className="w-full text-white fixed top-0 left-0 z-50 bg-white">
            <div className="w-full flex justify-between items-center h-16">
                <div className="flex items-center ml-6">
                    <img src={logo} alt="Logo" className="h-14 w-14" />
                    <div
                        className="relative ml-4 cursor-pointer text-black hover:text-red-700"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <RiGlobalLine size={24} />
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg">
                                <div className="py-1">
                                    <div className="block px-4 py-2 text-black hover:bg-gray-200 cursor-pointer" onClick={() => changeLanguage('en')}>English</div>
                                    <div className="block px-4 py-2 text-black hover:bg-gray-200 cursor-pointer" onClick={() => changeLanguage('de')}>Deutsch</div>
                                    <div className="block px-4 py-2 text-black hover:bg-gray-200 cursor-pointer" onClick={() => changeLanguage('bs')}>Bosanski</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden md:flex space-x-8">
                    <a href="#wash-detailing" className="text-black hover:text-red-700">{t("headerWashAndDetailing")}</a>
                    <a href="#mechanic" className="text-black hover:text-red-700">{t("headerMechanic")}</a>
                    <a href="#carousel" className="text-black hover:text-red-700">{t("headerAboutUs")}</a>
                    <a href="#contact" className="text-black hover:text-red-700">{t("headerContact")}</a>
                </div>

                <div className="relative mr-6 flex items-center hover:glow-red z-10">
                    <Hamburger toggled={isOpen} toggle={toggleSidebar} color={isOpen ? "#FFFFFF" : "#000000"} />
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full bg-black text-white transform transition-all duration-700 ease-in-out ${
                    isOpen ? (isExpanded ? "translate-x-0 w-full" : "translate-x-0 w-80") : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    {isExpanded ? (
                        isLoggedIn ? (
                            <div className="flex flex-col h-full items-center">
                                <div className="mt-16 text-center">
                                    <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
                                    <p className="text-sm">{!user.email ? user.phone_number : user.email}</p>
                                </div>
                                <div className="flex flex-col items-center my-4 flex-grow justify-center space-y-4">
                                    {appointments.map((appointment, index) => (
                                        <div key={index} className="flex flex-col items-center space-y-1">
                                            <div className="flex items-center space-x-2">
                                                {getIcon(appointment.type)}
                                                <span>{appointment.datetimeString}</span>
                                            </div>
                                            <span className="ml-8">{appointment.description}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-auto w-full">
                                    <div className="grid grid-cols-4 gap-2 justify-items-center">
                                        {icons}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <LoginPageLight />
                        )
                    ) : (
                        <>
                            {isLoggedIn ? (
                                <div className="flex flex-col h-full items-center">
                                    <div className="mt-16 text-center">
                                        <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
                                        <p className="text-sm">{!user.email ? user.phone_number : user.email}</p>
                                    </div>
                                    <div className="flex flex-col items-center my-4 flex-grow justify-center space-y-4">
                                        {appointments.map((appointment, index) => (
                                            <div key={index} className="flex flex-col items-center space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    {getIcon(appointment.type)}
                                                    <span>{appointment.datetimeString}</span>
                                                </div>
                                                <span className="ml-8">{appointment.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-auto w-full">
                                        <div className="grid grid-cols-4 gap-2 justify-items-center">
                                            {icons}
                                        </div>
                                        <div className="px-4">
                                            <button
                                                onClick={handleLogout}
                                                className="hover:bg-red-700 text-white py-3 rounded w-full mt-8 p-4 mb-4"
                                            >
                                                {t("headerLogout")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full justify-end px-4 w-full">
                                    <button
                                        onClick={handleLogin}
                                        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded w-full p-4 mb-4"
                                    >
                                        {t("headerLogin")}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;