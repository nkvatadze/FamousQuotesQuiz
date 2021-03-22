import axios from "axios";
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

export { getQuotes };
