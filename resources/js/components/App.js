import React, {useState} from "react";
import {Switch, Route, Link, useHistory} from "react-router-dom";
import Main from "./Main";
import Settings from "./Settings";
import {modes} from "../utils/enums";
import {getItem, removeObject, setItem} from "../utils/localstorage";

function App() {
    const history = useHistory();
    const [mode, setMode] = useState(getItem("mode") || modes.BINARY);
    const [errorExist, setErrorExist] = useState(false);

    const handleErrorExistChange = () => {
        setErrorExist(true);
    };

    const handleModeChange = (newMode) => {
        history.push("/");

        if (mode === newMode) {
            return;
        }

        setItem("mode", newMode);
        removeObject("session");
        setMode(newMode);
        setErrorExist(false);
    };

    return (
        <div className="h-full">
            <nav className="py-10 px-32">
                <ul className="flex flex-row justify-end">
                    <li className="hover-underline underline-gray mr-5">
                        <Link to="/">Start Quiz</Link>
                    </li>
                    <li className="hover-underline underline-gray">
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route path="/settings">
                    <Settings
                        mode={mode}
                        modeChangeHandler={handleModeChange}
                    />
                </Route>
                <Route path="/">
                    <Main
                        errorExist={errorExist}
                        errorExistChangeHandler={handleErrorExistChange}
                        mode={mode}
                    />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
