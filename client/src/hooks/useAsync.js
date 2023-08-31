import { AxiosError } from 'axios';
import { useState } from 'react';


const useAsync = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = async (
        req,
        ...args
    ) => {
        setLoading(true);
        setError(null);
        try {
            const res = await req(...args);
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error?.response?.data);
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred.');
            }
            return undefined;
        } finally {
            setLoading(false);
        }
    };

    return [loading, execute, error];
};

export default useAsync