import { useState, useEffect, useCallback } from 'react';
import { professorService } from '../services/professorService';

const useProfessors = () => {
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await professorService.getAll();
            setProfessors(data);
        } catch (error) {
            console.error("Veri çekme hatası:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    return { professors, loading, refresh: fetchData };
};

export default useProfessors;