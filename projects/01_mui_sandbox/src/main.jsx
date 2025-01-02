import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import labs from "./labs.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App labs={labs} />
    </StrictMode>
);
