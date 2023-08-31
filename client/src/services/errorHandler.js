import { AxiosError } from "axios";
const errorHandler = (err) => {
    if (err instanceof AxiosError) {
        throw new Error(err?.response?.data);
    } else {
        throw err;
    }
};

export default errorHandler



