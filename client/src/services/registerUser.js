import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const registerUser = async (args) => {
    try {
        const { data } = await axios.post(`${url}/users`, args);
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default registerUser