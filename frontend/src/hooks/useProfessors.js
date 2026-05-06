import { useState, useEffect } from 'react';
import { professorService } from '../services/professorService'; // Süslü parantez ekledik çünkü 'export const' kullandık

const useProfessors = () => {
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProfessors = async () => {
        try {
            setLoading(true);
            // Servis zaten response.data'yı döndürdüğü için direkt sonucu alıyoruz
            const data = await professorService.getAllProfessors();
            setProfessors(data);
        } catch (error) {
            console.error("Profesörler yüklenirken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfessors();
    }, []);

    return { professors, loading, refreshProfessors: fetchProfessors };
};

export default useProfessors;