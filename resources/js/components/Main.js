import React, { useState, useEffect } from "react";
import { getQuotes } from "../utils/api";
import Quote from "./Quote";
import Popup from "./Popup";
import Statistics from "./Statistics";
import { setItem, getItem } from "../utils/localstorage";

function Main({ mode }) {
    const [quotes, setQuotes] = useState([]);
    const [currentQuote, setCurrentQuote] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(true);
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
        console.log("useEffectCalled");
        getQuotes(mode).then(({ quotes }) => {
            setItem("quiz", { count: quotes.length, points: 0 });
            processQuotes(quotes);
        });
    }, []);

    const processQuotes = (quotes) => {
        if (quotes.length) {
            const firstQuote = quotes.shift();
            setQuotes([...quotes]);
            setCurrentQuote(firstQuote);
            setShowPopup(false);
        } else {
            setIsQuizFinished(true);
        }
    };

    const handleQuoteAnswer = (author) => {
        const isCorrect = currentQuote.correct_author_id === author.id;
        const message =
            (isCorrect ? "Correct! " : "Sorry, you are wrong! ") +
            `The right answer is ${author.name}`;
        setShowPopup(true);
        setIsAnswerCorrect(isCorrect);
        setPopupMessage(message);

        if (isCorrect) {
            const quiz = getItem("quiz");
            quiz.points++;
            setItem("quiz", quiz);
        }

        setTimeout(() => processQuotes(quotes), 1000);
    };

    if (isQuizFinished) {
        return (
            <div>
                <Statistics />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <Quote
                mode={mode}
                quote={currentQuote}
                quoteAnswerHandler={handleQuoteAnswer}
            />

            {showPopup && (
                <Popup
                    isAnswerCorrect={isAnswerCorrect}
                    message={popupMessage}
                />
            )}
        </div>
    );
}

export default Main;
