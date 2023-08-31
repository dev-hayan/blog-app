import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const loginUser = async (args) => {
    try {
        const { data } = await axios.post(`${url}/login`, args);
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default loginUser