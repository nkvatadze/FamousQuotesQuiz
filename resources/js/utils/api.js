import axios from "axios";
const BACKEND_URL = process.env.MIX_BACKEND_URL;

const getQuotes = async (mode) => {
    console.log(mode);
    try {
        const res = await axios.get(`${BACKEND_URL}/api/quotes?mode=${mode}`);
        const { data } = await res;
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
        }
    }
};

export { getQuotes };
