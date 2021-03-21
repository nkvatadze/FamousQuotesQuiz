import React from "react";

const Popup = ({ message, isAnswerCorrect }) => {
    const color = isAnswerCorrect ? "green" : "red";
    return (
        <div
            className={`bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded mt-12`}
            role="alert"
        >
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default Popup;
