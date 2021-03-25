import axios from "axios";
import { binary_choices } from "./enums";
const BACKEND_URL = process.env.MIX_BACKEND_URL;

const getQuotes = async (mode) => {
    try {
        const res = await axios.get(`${BACKEND_URL}/api/quotes?mode=${mode}`);
        return res.data;
    } catch (err) {
        if (err.response) {
            let errorMessage = "Failed to load quotes, please refresh the page.";
            if (err.response.status < 500) {
                const errors = err.response.data.errors;
                if (errors) {
                    errorMessage +="\n Reason: \n"
                    for (let error of Object.values(errors)) {
                        errorMessage += error + "\n";
                    }
                }
            }
            throw new Error(errorMessage);
        }
    }
};

const checkIfCorrect = async (quote_id, mode, author_id, binary_choice) => {
    try{
        const res = await axios.post(`${BACKEND_URL}/api/quotes/${quote_id}/answers/check`, {
          mode,
          author_id,
          binary_choice: binary_choice === binary_choices.YES
        })
        return res.data;
    } catch (err) {
        if (err.response) {
            let errorMessage = "Failed to load quotes, please refresh the page.";
            if (err.response.status < 500) {
                const errors = err.response.data.errors;
                if (errors) {
                    errorMessage +="\n Reason: \n"
                    for (let error of Object.values(errors)) {
                        errorMessage += error + "\n";
                    }
                }
            }
            throw new Error(errorMessage);
        }
    }
}

export { getQuotes,checkIfCorrect };
