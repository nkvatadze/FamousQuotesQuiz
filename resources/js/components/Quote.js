import React, { useState, useEffect } from "react";

function Quote({ mode, quote, quoteAnswerHandler }) {
    if (!quote) {
        return <div />;
    }

    return (
        <div className="flex flex-col">
            <div className="inline-block">
                <div className="card-legend">Who said it?</div>
            </div>

            <div className="max-w-sm bg-white border-2 border-gray-300 p-6 rounded-md shadow-md">
                <div id="quote">
                    <q className="italic text-gray-600">{quote.text}</q>
                </div>
                <div id="options" className="flex justify-center">
                    <ul className="">
                        {quote.authors.map((author) => (
                            <li
                                onClick={() => quoteAnswerHandler(author)}
                                className="cursor-pointer float-left clear-both inline-block hover-underline mt-1"
                                key={author.id}
                            >
                                {author.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Quote;
