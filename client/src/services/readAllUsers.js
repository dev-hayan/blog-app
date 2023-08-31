import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const getAllUsers = async (token) => {
    try {
        const { data } = await axios.get(`${url}/users/`, {
            headers: {
                'x-auth-token': token 
            }
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default getAllUsers