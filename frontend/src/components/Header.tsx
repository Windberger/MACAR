import {useContext, useState} from 'react';
import logo from "../assets/images/logo.png";
import { Sling as Hamburger } from 'hamburger-react';
import { RiSettingsFill, RiTempColdLine, RiTempHotLine, RiThunderstormsLine } from "react-icons/ri";
import LoginPage from "../pages/LoginPage/LoginPage";
import { useTranslation } from "react-i18next";
import {UserContext} from "../context/UserContext.tsx";
import {nullUser} from "../types/UserData.ts";
import {logoutUser} from "../services/authService.ts";

// interface Appointment {
//     type: string;
//     date: string;
//     time: string;
//     description: string;
// }
//
// const appointments: Appointment[] = [
//     { type: "cold", date: "2023-12-01", time: "10:00 AM", description: "Cold weather event" },
//     { type: "hot", date: "2023-12-02", time: "2:00 PM", description: "Hot weather event" },
//     { type: "storm", date: "2023-12-03", time: "6:00 PM", description: "Storm event" },
// ];


function Header() {
    const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

    const userContext = useContext(UserContext);

    if(!userContext){
        throw new Error("useUser must be used within a UserProvider");
    }
    const {isLoggedIn, setIsLoggedIn, setToken, user, setUser, appointments, setAppointments} = userContext// User login state



    const [isExpanded, setIsExpanded] = useState(false); // Sidebar expansion state
    const { t } = useTranslation();

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

    //TODO add text: "Bonus: 5/8"
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
        <header className="w-full text-white fixed top-0 left-0 z-50">
            <div className="w-full flex justify-between items-center h-16">
                <div className="flex items-center ml-3">
                    <img src={logo} alt="Logo" className="h-14 w-14" />
                </div>

                <div className="mr-3 flex items-center hover:glow-red z-10">
                    <Hamburger toggled={isOpen} toggle={toggleSidebar} color="#000000" />
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full bg-black text-white transform transition-all duration-700 ease-in-out ${
                    isOpen ? (isExpanded ? "translate-x-0 w-full" : "translate-x-0 w-64") : "translate-x-full"
                }`}
            >
                <div className="flex flex-col p-4 h-full">
                    {isExpanded ? (
                        isLoggedIn ? (
                            <div className="flex flex-col h-full">
                                <div className="mt-16">
                                    <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
                                    <p className="text-sm">{!user.email ? user.phone_number : user.email}</p>
                                </div>
                                <div className="flex flex-col items-start my-4 flex-grow justify-center space-y-4">
                                    {appointments.map((appointment, index) => (
                                        <div key={index} className="flex flex-col items-start space-y-1">
                                            <div className="flex items-center space-x-2">
                                                {getIcon(appointment.type)}
                                                <span>{appointment.datetimeString}</span>
                                            </div>
                                            <span className="ml-8">{appointment.description}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-auto">
                                    <div className="grid grid-cols-4 gap-2">
                                        {icons}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded w-full mt-4"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <LoginPage />
                        )
                    ) : (
                        <>
                            {isLoggedIn ? (
                                <div className="flex flex-col h-full">
                                    <div className="mt-16">
                                        <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
                                        <p className="text-sm">{!user.email ? user.phone_number : user.email}</p>
                                    </div>
                                    <div className="flex flex-col items-start my-4 flex-grow justify-center space-y-4">
                                        {appointments.map((appointment, index) => (
                                            <div key={index} className="flex flex-col items-start space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    {getIcon(appointment.type)}
                                                    <span>{appointment.datetimeString}</span>
                                                </div>
                                                <span className="ml-8">{appointment.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-auto">
                                        <div className="grid grid-cols-4 gap-2">
                                            {icons}
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full mt-4"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full mt-auto"
                                >
                                    Login
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;