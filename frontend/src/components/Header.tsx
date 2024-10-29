import {useState} from 'react';
import {Link} from 'react-scroll';
import logo from "../assets/images/logo.png";
import {Sling as Hamburger} from 'hamburger-react';
import LoginPage from "../pages/LoginPage/LoginPage";
import {useTranslation} from "react-i18next";

function Header() {
    const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state
    const [isExpanded, setIsExpanded] = useState(false); // Sidebar expansion state
    const {t} = useTranslation();

    // Toggle function for the sidebar
    const toggleSidebar = () => {
        if (isOpen) {
            setIsOpen(false); // Close the sidebar if it's currently open
            setIsExpanded(false); // Reset expansion state
        } else {
            setIsOpen(true); // Open the sidebar
        }
    };

    // Function to expand the sidebar to full width
    const expandSidebar = () => {
        setIsExpanded(true); // Expand sidebar to full width
    };

    return (
        <header className="w-full bg-black text-white shadow-lg fixed top-0 left-0 z-50">
            <div className="w-full flex justify-between items-center h-16">
                {/* Logo on the far left */}
                <div className="flex items-center ml-3">
                    <img src={logo} alt="Logo" className="h-14 w-14"/>
                </div>

                {/* Navigation links in the center */}
                <nav className="hidden md:flex flex-1 justify-center space-x-8">
                    <Link
                        to="cards"
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-red-500 hover:text-white hover:glow-red transition-all"
                    >
                        {t("headerCard")}
                    </Link>
                    <Link
                        to="pictures"
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-red-500 hover:text-white hover:glow-red transition-all"
                    >
                        {t("headerPictures")}
                    </Link>
                    <Link
                        to="else"
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-red-500 hover:text-white hover:glow-red transition-all"
                    >
                        {t("headerElse")}
                    </Link>
                </nav>

                {/* Hamburger menu icon to toggle sidebar */}
                <div className="mr-3 flex items-center hover:glow-red z-10">
                    <Hamburger toggled={isOpen} toggle={toggleSidebar}/>
                </div>
            </div>

            {/* Sidebar that slides in from the right */}
            <div
                className={`fixed top-0 right-0 h-full bg-red-950 text-white transform transition-all duration-700 ease-in-out ${isOpen ? (isExpanded ? 'translate-x-0 w-full' : 'translate-x-0 w-64') : 'translate-x-full'}`}>
                <div className="flex flex-col p-4">
                    {/* Show LoginPage content only */}
                    {isExpanded ? (
                        <LoginPage/>
                    ) : (
                        <button
                            onClick={expandSidebar}
                            className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
