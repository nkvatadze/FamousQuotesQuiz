import React from "react";
import { getItem } from "../utils/localstorage";

const Statistics = ({ startAgainChangeHandler }) => {
    const quizStatistic = getItem("quiz");

    return (
        <div className="flex flex-col justify-center items-center">
            <span className="text-3xl">
                Your have answered correctly {quizStatistic.points} /{" "}
                {quizStatistic.count}
            </span>
            <button
                onClick={startAgainChangeHandler}
                className="mt-20 bg-transparent hover:bg-gray-600 hover:text-white text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded"
            >
                Start Again
            </button>
        </div>
    );
};

export default Statistics;
