import axios from 'axios';
import errorHandler from './errorHandler';

const upDateItem = async (formData, url, token) => {
    try {
        const { data } = await axios.patch(url, formData, {
            headers: {
                'x-auth-token': token
            },
        });
        return data;
    } catch (err) {
        errorHandler(err);
    }
};
export default upDateItem