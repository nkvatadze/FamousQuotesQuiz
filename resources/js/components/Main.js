import React, { useState, useEffect } from "react";
import { getQuotes } from "../utils/api";
import Quote from "./Quote";
function Main({ mode }) {
    const [quotes, setQuotes] = useState([]);
    const [currentQuote, setCurrentQuote] = useState(null);

    useEffect(() => {
        getQuotes(mode).then(({ quotes }) => {
            setQuotes(quotes);
            setCurrentQuote(quotes[0]);
        });
    }, []);

    const handleQuoteAnswer = () => {};

    return (
        <div className="flex justify-center align-center">
            <Quote mode={mode} quote={currentQuote} />
        </div>
    );
}

export default Main;
