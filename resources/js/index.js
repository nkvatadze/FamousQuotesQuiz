import App from "./components/App";
import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

if (document.getElementById("root")) {
    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>,
        document.getElementById("root")
    );
}
