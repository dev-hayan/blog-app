import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const patchComment = async (token, id, body) => {
    try {
        const { data } = await axios.patch(`${url}/comments/${id}/`, body, {
            headers: {
                'x-auth-token': token
            }
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default patchComment