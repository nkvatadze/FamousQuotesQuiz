import React, { useState, useEffect } from "react";
import { getQuotes, checkIfCorrect } from "../utils/api";
import Quote from "./Quote";
import Popup from "./Popup";
import Statistics from "./Statistics";
import { setItem, getItem, removeObject } from "../utils/localstorage";

function Main({ mode, errorExist, errorExistChangeHandler }) {
    const session = getItem("session");

    const [quotes, setQuotes] = useState(session?.quotes || []);
    const [quotesLength, setQuotesLength] = useState(session?.quotes_length || 0);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(session?.quote_index || 0);
    
    const [currentQuote, setCurrentQuote] = useState(null);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [startAgain, setStartAgain] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await getQuotes(mode)
                const quotes = await response.quotes
                setItem("statistics", { count: quotes.length, points: 0 });
                setQuotesLength(quotes.length);
                processNextQuote(quotes);
            }catch(err){
                errorExistChangeHandler();
                setShowPopup(true);
                setPopupMessage(err.message);
            }
        }
        
        if (!quotes.length) {
            fetchData()
        } else {
            processNextQuote(quotes);
        }
    }, [startAgain]);

    const processNextQuote = (quotes) => {
        if (quotes.length) {
            setItem("session", {
                quote_index: currentQuoteIndex,
                quotes: quotes,
                quotes_length: session?.quotes_length || quotes.length,
            });
            const firstQuote = quotes.shift();
            setCurrentQuote(firstQuote);
            setCurrentQuoteIndex(currentQuoteIndex + 1);
            setQuotes([...quotes]);
            setShowPopup(false);
        } else {
            setIsQuizFinished(true);
            removeObject("session");
        }
    };

    const handleQuoteAnswer = async (author, mode, binaryChoice = null) => {

        if (showPopup) {
            return;
        }

        const {is_correct, correct_answer} = await checkIfCorrect(currentQuote.id, mode, author.id, binaryChoice)
        console.log(is_correct, correct_answer);

        const message =`${is_correct ? "Correct! " : "Sorry, you are wrong! "} The right answer is ${correct_answer}`;
        setShowPopup(true);
        setIsAnswerCorrect(is_correct);
        setPopupMessage(message);

        if (is_correct) {
            const quiz = getItem("statistics");
            quiz.points++;
            setItem("statistics", quiz);
        }

        setTimeout(() => processNextQuote(quotes), 2000);
    };

    const handleStartAgain = () => {
        removeObject("session");
        setStartAgain(!startAgain);
        setIsQuizFinished(false);
        setCurrentQuoteIndex(0);
    };

    if (isQuizFinished) {
        return (
            <div>
                <Statistics startAgainHandler={handleStartAgain} />
            </div>
        );
    }

    if (errorExist) {
        return (
            <div className="flex flex-col items-center">
                {showPopup && (
                    <Popup isSuccess={false} message={popupMessage} />
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div>
                {currentQuoteIndex} / {quotesLength}
            </div>
            <Quote
                mode={mode}
                quote={currentQuote}
                quoteAnswerHandler={handleQuoteAnswer}
            />
            {showPopup && (
                <Popup isSuccess={isAnswerCorrect} message={popupMessage} />
            )}
        </div>
    );
}

export default Main;
