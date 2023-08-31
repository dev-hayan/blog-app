import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const patchSuggestion = async (token, id, body) => {
    try {
        const { data } = await axios.patch(`${url}/suggestions/${id}/`, body, {
            headers: {
                'x-auth-token': token // Set the token as a header
            }
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default patchSuggestion