import React, { useContext, useState } from "react";
import CarImage from "../../assets/images/heroImageCar.png";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { loginUser, registerUser } from "../../services/authService.ts";
import validator from "validator";
import { Alert, Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext.tsx";
import { fetchUserData } from "../../services/userService.ts";
import { getAppointmentsByUser } from "../../services/appointmentService.ts";
import { useNavigate } from "react-router-dom";

function LoginPageLight() {
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
    const navigate = useNavigate();

    if (!userContext) {
        throw new Error("UserContext must be used within a UserContextProvider");
    }

    const { setIsLoggedIn, setToken, user, setUser, setAppointments } = userContext;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleErrors = (e: { response: { data: { message: string } } } | string) => {
        const messageText = typeof e === "string" ? e : e.response.data.message;

        if (messageText === "Token required" || messageText === "Invalid token") {
            setErrorMessage(t("loginPageErrorToken"));
        }

        if (isRegistering) {
            if (messageText === "Invalid email") {
                setErrorMessage(t("loginPageErrorInvalidKey"));
            } else if (messageText === "Invalid phone number") {
                setErrorMessage(t("loginPageErrorInvalidKey"));
            } else if (messageText === "Invalid password") {
                setErrorMessage(t("loginPageErrorInvalidPassword"));
            } else if (messageText === "All fields are required") {
                setErrorMessage(t("loginPageErrorAllFieldsRequired"));
            } else if (messageText === "Email is already in use") {
                setErrorMessage(t("loginPageErrorEmailInUse"));
            } else if (messageText === "Phone number is already in use") {
                setErrorMessage(t("loginPageErrorPhoneNumberInUse"));
            } else if (messageText === "Error registering user") {
                setErrorMessage(t("loginPageErrorGeneralError"));
            } else {
                setErrorMessage(t("loginPageErrorGeneralError"));
            }
        } else {
            if (messageText === "Invalid email") {
                setErrorMessage(t("loginPageErrorInvalidKey"));
            } else if (messageText === "Not all fields provided") {
                setErrorMessage(t("loginPageErrorAllFieldsRequired"));
            } else if (messageText === "User not found") {
                setErrorMessage(t("loginPageErrorUserNotFound"));
            } else if (messageText === "Invalid credentials") {
                setErrorMessage(t("loginPageErrorInvalidCredentials"));
            } else if (messageText === "Error logging in") {
                setErrorMessage(t("loginPageErrorGeneralError"));
            } else {
                setErrorMessage(t("loginPageErrorGeneralError"));
            }
        }

        setError(true);
    };

    const handleLogin = (token: string) => {
        setToken(token);
        fetchUserData(token)
            .then((r) => {
                setUser(r);
                setIsLoggedIn(true);

                getAppointmentsByUser(token, user.user_id)
                    .then((appointments) => {
                        setAppointments(appointments);
                        window.location.href = "/"; // Redirect to homepage
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
        <div className="flex h-screen bg-white text-black relative">
            {/* Back Arrow */}
            <button
                onClick={() => navigate("/")}
                className="absolute top-4 left-4 text-black hover:text-red-500 focus:outline-none bg-transparent"
                title="Go to Homepage"
            >
                <FaArrowLeft size={24} />
            </button>

            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white text-black">
                <h2 className="text-2xl font-bold mb-6">
                    {isRegistering ? t("loginPageIsRegistering") : t("loginPageIsLoggingIn")}
                </h2>
                <form className="space-y-4 w-72" onSubmit={handleSubmit}>
                    {isRegistering && (
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder={t("loginPageFormFirstName")}
                                className="w-1/2 p-3 bg-gray-100 text-black placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder={t("loginPageFormLastName")}
                                className="w-1/2 p-3 bg-gray-100 text-black placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>
                    )}
                    <input
                        type="text"
                        name="emailOrPhone"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        placeholder={t("loginPageFormEmail")}
                        className="w-full p-3 bg-gray-100 text-black placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={t("loginPageFormPassword")}
                            className="w-full p-3 bg-gray-100 text-black placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {isPasswordValid(formData.password) && (
                            <span className="absolute inset-y-0 right-10 flex items-center text-green-500">
                                <FaCheck />
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        {t("loginPageFormPasswordRequirements")}
                    </p>
                    <button
                        type="submit"
                        className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        {isRegistering ? t("loginPageIsRegistering") : t("loginPageIsLoggingIn")}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    {isRegistering ? t("loginPageFormChangeToLogin") : t("loginPageFormChangeToRegister")}&nbsp;
                    <button
                        type="button"
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="hover:underline bg-red-100 text-red-500 focus:outline-none"
                    >
                        {isRegistering ? t("loginPageIsLoggingIn") : t("loginPageIsRegistering")}
                    </button>
                </p>
            </div>
            <div className="hidden md:flex w-1/2 flex-col items-center justify-center text-black relative">
                <img
                    src={CarImage}
                    alt="Hero Car"
                    className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute text-center text-white p-4 rounded shadow">
                    <h2 className="text-3xl font-bold">
                        {isRegistering ? t("loginPageHeaderRegistering") : t("loginPageHeaderLogin")}
                    </h2>
                    <p>
                        {isRegistering ? t("loginPageDescriptionRegister") : t("loginPageDescriptionLogin")}
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

export default LoginPageLight;