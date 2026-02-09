import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./general-sans.css";
import App from "./App.jsx";
import "./apiCalls/axiosSetup";

// Unregister any existing service workers to prevent stale cache issues
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      console.log("Unregistering service worker:", registration);
      registration.unregister();
    }
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
