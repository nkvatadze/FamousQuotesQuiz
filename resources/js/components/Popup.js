import React from "react";

const Popup = ({ message, isSuccess }) => {
    const color = isSuccess ? "green" : "red";
    return (
        <div className={`flex flex-col justify-center items-center bg-${color}-100 border border-${color}-400 
        text-${color}-700 px-4 py-3 rounded mt-12`} role="alert">
            {message.split("\n").map((str) => (
                <span key={str} className="block">
                    {str}
                </span>
            ))}
        </div>
    );
};

export default Popup;
