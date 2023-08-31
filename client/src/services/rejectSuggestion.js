import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const rejectSuggestion = async (token, id) => {
    try {
        const { data } = await axios.patch(`${url}/suggestions/${id}/reject`, null, {
            headers: {
                'x-auth-token': token // Set the token as a header
            }
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default rejectSuggestion