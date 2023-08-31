import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const getPendingPosts = async (token) => {
    try {
        const { data } = await axios.get(`${url}/posts/pending`, {
            headers: {
                'x-auth-token': token // Set the token as a header
            }
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default getPendingPosts