import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "./Main";
import Settings from "./Settings";

function App() {
    const [mode, setMode] = useState("binary");

    const modeChangeHandler = (mode) => {
        setMode(mode);
    };
    return (
        <Router>
            <div className="h-full">
                <nav className="p-10">
                    <ul className="flex flex-row">
                        <li className="mr-5">
                            <Link to="/">Start Quiz</Link>
                        </li>
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/settings">
                        <Settings mode={mode} />
                    </Route>
                    <Route path="/">
                        <Main mode={mode} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
