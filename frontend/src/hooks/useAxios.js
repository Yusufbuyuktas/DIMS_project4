import { useState } from 'react';
import api from '../services/api';

const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (config) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api(config);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "İşlem sırasında bir hata oluştu.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { sendRequest, loading, error };
};

export default useAxios;