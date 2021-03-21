import React, { useState, useEffect } from "react";
import { getQuotes } from "../utils/api";

function Main({ mode }) {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        const quotes = getQuotes(mode);
        console.log(quotes);

        // setQuotes(quotes);
    }, []);
    return <div>Hello</div>;
}

export default Main;
