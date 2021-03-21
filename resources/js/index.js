import App from "./components/App";
import ReactDOM from "react-dom";
import React from "react";

if (document.getElementById("root")) {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById("root")
    );
}
