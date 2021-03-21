import React, { useState, useEffect } from "react";
import { getQuotes } from "../utils/api";
import Quote from "./Quote";
import Popup from "./Popup";
import Statistics from "./Statistics";
import { setItem, getItem } from "../utils/localstorage";
import { binary_choices, modes } from "../utils/enums";
import { useHistory } from "react-router-dom";

function Main({ mode }) {
    const history = useHistory();
    const [quotes, setQuotes] = useState([]);
    const [currentQuote, setCurrentQuote] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(true);
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
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

    const handleAnswerQuote = (author, mode, binary_choice = null) => {
        let isCorrect = currentQuote.correct_author_id === author.id;
        let rightAnswer;
        if (mode === modes.BINARY) {
            rightAnswer = isCorrect ? binary_choices.YES : binary_choices.NO;

            isCorrect = binary_choice === rightAnswer;
        } else {
            rightAnswer = currentQuote.authors.find(
                (author) => author.id === currentQuote.correct_author_id
            ).name;
        }

        const message =
            (isCorrect ? "Correct! " : "Sorry, you are wrong! ") +
            `The right answer is ${rightAnswer}`;
        setShowPopup(true);
        setIsAnswerCorrect(isCorrect);
        setPopupMessage(message);

        if (isCorrect) {
            const quiz = getItem("quiz");
            quiz.points++;
            setItem("quiz", quiz);
        }

        setTimeout(() => processQuotes(quotes), 2000);
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
                answerQuoteHandler={handleAnswerQuote}
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
