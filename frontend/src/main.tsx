import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts"
import {UserProvider} from "./homepage/context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UserProvider>
            <App/>
        </UserProvider>
    </StrictMode>,
);
