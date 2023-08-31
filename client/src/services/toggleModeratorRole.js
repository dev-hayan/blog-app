import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const changeModeratorRole = async (token, id, body) => {
    try {
        const { data } = await axios.patch(`${url}/users/${id}/toggleRole`, body, {
            headers: {
                'x-auth-token': token // Set the token as a header
            }
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default changeModeratorRole