import React from "react";
import { modes, binary_choices } from "../utils/enums";

function Quote({ mode, quote, answerQuoteHandler }) {
    if (!quote) {
        return <div />;
    }
    const isMultipleMode = mode === modes.MULTIPLE;
    let author;

    if (!isMultipleMode && quote.authors.length) {
        author = quote.authors[0];
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
                <div id="authors" className="flex justify-center">
                    <ul>
                        {quote.authors.map((author) => (
                            <li
                                onClick={() =>
                                    answerQuoteHandler(author, modes.MULTIPLE)
                                }
                                className={`float-left clear-both inline-block ${
                                    isMultipleMode
                                        ? "hover-underline underline-gray cursor-pointer"
                                        : "font-bold"
                                } mt-1`}
                                key={author.id}
                            >
                                {author.name}
                            </li>
                        ))}
                    </ul>
                </div>
                {!isMultipleMode && (
                    <div className="flex justify-between items-center px-20 py-5">
                        <span
                            onClick={() =>
                                answerQuoteHandler(
                                    author,
                                    modes.BINARY,
                                    binary_choices.YES
                                )
                            }
                            className="cursor-pointer hover-underline underline-green capitalize"
                        >
                            {binary_choices.YES}
                        </span>
                        <span
                            onClick={() =>
                                answerQuoteHandler(
                                    author,
                                    modes.BINARY,
                                    binary_choices.NO
                                )
                            }
                            className="cursor-pointer hover-underline underline-red capitalize"
                        >
                            {binary_choices.NO}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Quote;
