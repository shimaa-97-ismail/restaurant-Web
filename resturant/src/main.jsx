import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/Auth/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/theme/ThemeProvider";
import "./index.css";
import App from "./App.jsx";
import { MenuOrderProvider } from "./context/MenuOrderContext/MenuOrderProvider";

import { LanguageProvider } from "./context/Language/LanguageProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
          <AuthProvider>
            <MenuOrderProvider>
              <LanguageProvider>
            <App />
            </LanguageProvider>
            </MenuOrderProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
