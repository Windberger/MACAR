import { useState } from "react";
import CarImage from "../../assets/images/heroImageCar.png";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import {loginUser, registerUser} from "../../services/authService.ts";
import validator from "validator";

LoginPage.propTypes = {};

function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);

    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegistering) {
            if(validator.isEmail(formData.emailOrPhone)) {
                registerUser({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.emailOrPhone,
                    phone_number: null,
                    password: formData.password,
                }).then(r => console.log(r)).catch(e => console.error(e));
            } else if(validator.isMobilePhone(formData.emailOrPhone)) {
                registerUser({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: null,
                    phone_number: formData.emailOrPhone,
                    password: formData.password,
                }).then(r => console.log(r)).catch(e => console.error(e));
            } else {
                console.error("Invalid email or phone number");
                //TODO: Fehlermeldung
            }
        } else {
            if(validator.isEmail(formData.emailOrPhone)) {
                loginUser({
                    email: formData.emailOrPhone,
                    phoneNumber: null,
                    password: formData.password,
                }).then(r => console.log(r)).catch(e => console.error(e));
            } else if(validator.isMobilePhone(formData.emailOrPhone)) {
                loginUser({
                    email: null,
                    phoneNumber: formData.emailOrPhone,
                    password: formData.password,
                }).then(r => console.log(r)).catch(e => console.error(e));
            } else {
                console.error("Invalid email or phone number");
                //TODO: Fehlermeldung
            }
        }
    };



    const isPasswordValid = (password: string) => {
        return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    };

    return (
        <div className="flex h-screen bg-gray-800">
            <div className="w-1/2 flex flex-col justify-center items-center bg-black p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">
                    {isRegistering ? "Registrieren" : "Anmelden"}
                </h2>
                <form className="space-y-4 w-72" onSubmit={handleSubmit}>
                    {isRegistering && (
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Vorname"
                                className="w-1/2 p-3 bg-gray-800 text-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Nachname"
                                className="w-1/2 p-3 bg-gray-800 text-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                            />
                        </div>
                    )}
                    <input
                        type="text"
                        name="emailOrPhone"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        placeholder="E-Mail oder Telefonnummer"
                        className="w-full p-3 bg-gray-800 text-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Passwort"
                            className="w-full p-3 bg-gray-800 text-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {isPasswordValid(formData.password) && (
                            <span className="absolute inset-y-0 right-10 flex items-center text-red-500">
                                <FaCheck />
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                        Mind. 8 Zeichen, enthält Großbuchstabe und Zahl.
                    </p>
                    <button
                        type="submit"
                        className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800"
                    >
                        {isRegistering ? "Registrieren" : "Anmelden"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-400">
                    {isRegistering ? "Bereits ein Konto?" : "Noch kein Konto?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="hover:underline"
                    >
                        {isRegistering ? "Anmelden" : "Registrieren"}
                    </button>
                </p>
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center bg-gray-600 text-white">
                <img
                    src={CarImage}
                    alt="Hero Car"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute text-center">
                    <h2 className="text-3xl font-bold">
                        {isRegistering ? "Willkommen bei der Registrierung" : "Willkommen zurück"}
                    </h2>
                    <p>
                        {isRegistering
                            ? "Erstellen Sie ein Konto, um alle Vorteile zu nutzen."
                            : "Melden Sie sich an, um fortzufahren."}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;