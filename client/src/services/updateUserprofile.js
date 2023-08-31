import axios from 'axios';
import errorHandler from './errorHandler';
const url = process.env.REACT_APP_API_URL;

const upDateUser = async (formData, id, token) => {
    try {
        const { data } = await axios.put(`${url}/users/${id}/`, formData, {
            headers: {
                'x-auth-token': token
            },
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};
export default upDateUser