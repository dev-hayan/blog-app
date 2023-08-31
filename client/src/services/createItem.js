import axios from 'axios';
import errorHandler from './errorHandler';

const addItem = async (formData, url, token) => {
    try {
        const { data } = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
                'x-auth-token': token
            },
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};

export default addItem