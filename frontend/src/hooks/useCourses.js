import { useState, useEffect, useCallback } from 'react';
import { courseService } from '../services/courseService';

const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await courseService.getAll();
            setCourses(data);
        } catch (error) {
            console.error("Kurs çekme hatası:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    return { courses, loading, refresh: fetchData };
};

export default useCourses;