import { Link } from 'react-scroll';
import logo from "../assets/images/logo.jpg";
import { Sling as Hamburger } from 'hamburger-react';

function Header() {
    return (
        <header className="w-full bg-black text-white shadow-lg fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
                </div>

                <nav className="hidden md:flex flex-1 justify-center space-x-8">
                    <Link
                        to="cards"
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-red-500 hover:text-white hover:glow-red transition-all"
                    >
                        Cards
                    </Link>
                    <Link
                        to="pictures"
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-red-500 hover:text-white hover:glow-red transition-all"
                    >
                        Pictures
                    </Link>
                    <Link
                        to="else"
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-red-500 hover:text-white hover:glow-red transition-all"
                    >
                        Else
                    </Link>
                </nav>

                <div className="ml-auto flex items-center hover:glow-red">
                    <Hamburger />
                </div>
            </div>
        </header>
    );
}

export default Header;