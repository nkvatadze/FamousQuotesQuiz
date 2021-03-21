import React, { useState } from "react";
import { modes } from "../utils/enums";

function Settings({ mode, modeChangeHandler }) {
    const [selectedMode, setSelectedMode] = useState(mode);

    const handleModeSelection = (e) => {
        setSelectedMode(e.currentTarget.value);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <span className="mr-3 text-4xl">Choose quiz mode</span>
            <span className="mt-15 ">Current Mode {mode}</span>
            <div className="flex flex-row mt-10">
                {Object.values(modes).map((value) => {
                    return (
                        <label key={value} className="radio-label m-16">
                            <input
                                type="radio"
                                value={value}
                                name="modes"
                                onChange={handleModeSelection}
                                defaultChecked={selectedMode === value}
                            />
                            <span>{value}</span>
                        </label>
                    );
                })}
            </div>
            <button
                onClick={() => modeChangeHandler(selectedMode)}
                className="mt-20 bg-transparent hover:bg-gray-600 hover:text-white text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded"
            >
                Change Mode
            </button>
        </div>
    );
}

export default Settings;
