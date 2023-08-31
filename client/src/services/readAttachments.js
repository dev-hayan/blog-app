import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const getAttachments = async (token, id, type) => {
    try {
        const { data } = await axios.get(`${url}/attachments/`, {
            params: {
                id,
                type
            }
        }, {
            headers: {
                'x-auth-token': token // Set the token as a header
            }
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default getAttachments