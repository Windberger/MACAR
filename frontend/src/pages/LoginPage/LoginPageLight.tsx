import React, { useContext, useState } from "react";
import CarImage from "../../assets/images/heroImageCar.png";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { loginUser, registerUser } from "../../services/authService.ts";
import validator from "validator";
import { Alert, Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext.tsx";
import { fetchUserData } from "../../services/userService.ts";
import { getAppointmentsByUser } from "../../services/appointmentService.ts";

function LoginPageDark() {
    const [isRegistering, setIsRegistering] = useState(false);

    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { t } = useTranslation();
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext must be used within a UserContextProvider");
    }

    const { setIsLoggedIn, setToken, setUser, setAppointments } = userContext;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleErrors = (e: { response: { data: { message: string } } } | string) => {
        const messageText = typeof e === "string" ? e : e.response.data.message;
        setErrorMessage(messageText);
        setError(true);
    };

    const handleLogin = (token: string) => {
        setToken(token);
        fetchUserData(token)
            .then((r) => {
                setUser(r);
                setIsLoggedIn(true);

                getAppointmentsByUser(token)
                    .then((appointments) => {
                        setAppointments(appointments);
                    })
                    .catch((e) => handleErrors(e));
            })
            .catch((e) => handleErrors(e));
    };

    const login = () => {
        if (validator.isEmail(formData.emailOrPhone)) {
            loginUser({
                email: formData.emailOrPhone,
                phoneNumber: null,
                password: formData.password,
            })
                .then((r) => handleLogin(r.accessToken))
                .catch((e) => handleErrors(e));
        } else if (validator.isMobilePhone(formData.emailOrPhone)) {
            loginUser({
                email: null,
                phoneNumber: formData.emailOrPhone,
                password: formData.password,
            })
                .then((r) => handleLogin(r.accessToken))
                .catch((e) => handleErrors(e));
        } else {
            handleErrors("Invalid email");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.emailOrPhone || !formData.password) {
            handleErrors("All fields are required");
            return;
        }

        if (isRegistering) {
            if (validator.isEmail(formData.emailOrPhone)) {
                registerUser({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.emailOrPhone,
                    phone_number: null,
                    password: formData.password,
                })
                    .then(() => login())
                    .catch((e) => handleErrors(e));
            } else if (validator.isMobilePhone(formData.emailOrPhone)) {
                registerUser({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: null,
                    phone_number: formData.emailOrPhone,
                    password: formData.password,
                })
                    .then(() => login())
                    .catch((e) => handleErrors(e));
            } else {
                handleErrors("Invalid email");
            }
        } else {
            login();
        }
    };

    const isPasswordValid = (password: string) => {
        return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    };

    return (
        <div className="flex h-screen bg-black">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-black text-white">
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
                                className="w-1/2 p-3 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Nachname"
                                className="w-1/2 p-3 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    )}
                    <input
                        type="text"
                        name="emailOrPhone"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        placeholder="E-Mail oder Telefonnummer"
                        className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Passwort"
                            className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {isPasswordValid(formData.password) && (
                            <span className="absolute inset-y-0 right-10 flex items-center text-green-400">
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
                        className="hover:underline text-red-500 focus:outline-none"
                    >
                        {isRegistering ? "Anmelden" : "Registrieren"}
                    </button>
                </p>
            </div>
            <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-gray-800 text-white">
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
            <div>
                <Snackbar
                    open={error}
                    autoHideDuration={6000}
                    onClose={() => setError(false)}
                >
                    <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
            </div>
        </div>
    );
}

export default LoginPageDark;
