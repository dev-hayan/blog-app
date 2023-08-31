import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const getUserPostSuggestions = async (token, id) => {
    try {
        const { data } = await axios.get(`${url}/suggestions/userPost/${id}`, {
            headers: {
                'x-auth-token': token // Set the token as a header
            }
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default getUserPostSuggestions