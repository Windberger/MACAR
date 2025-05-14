import {useTranslation} from "react-i18next";
import {UserContext} from "./homepage/context/UserContext.tsx";
import {useContext, useEffect} from "react";
import {getAccessToken} from "./homepage/services/authService.ts";
import {fetchUserData} from "./homepage/services/userService.ts";
import {getAppointmentsByUser} from "./homepage/services/appointmentService.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./homepage/Homepage.tsx";
import AdminPage from "./admin_page/AdminPage.tsx";
import LoginPageLight from "./homepage/pages/LoginPage/LoginPageLight.tsx";

function App() {

    const {i18n} = useTranslation();
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext not found");
    }
    const {setToken, user, setUser, setAppointments, setIsLoggedIn} = userContext;


    useEffect(() => {
        const userLang = navigator.language || "en";
        i18n.changeLanguage(userLang);
    }, [i18n]);



    useEffect(() => {
        getAccessToken().then((accessToken) => {
            setToken(accessToken);

            if (!accessToken) {
                console.log("No token found");
                return;
            }
            fetchUserData(accessToken).then((userData) => {
                setUser(userData);
                setIsLoggedIn(true);
                getAppointmentsByUser(accessToken, user.user_id).then((appointments) => {
                    setAppointments(appointments);
                });
            }).catch((error) => {
                // TODO: Error handling
                console.error("Error while fetching user data:", error);
            });
        }).catch((error) => {
            console.log("No user is logged in ", error);
        });
    }, []);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/admin" element={
                    <AdminPage/>

                }/>
                <Route path="/login" element={<LoginPageLight/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
