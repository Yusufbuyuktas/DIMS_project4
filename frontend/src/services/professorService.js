import api from './api';

export const professorService = {
    // Tüm profesörleri getirir
    getAllProfessors: async () => {
        const response = await api.get('/professor/list');
        return response.data;
    },

    // ID'ye göre profesör getirir
    getProfessorById: async (id) => {
        const response = await api.get(`/professor/list/${id}`);
        return response.data;
    },

    // Yeni profesör kaydeder
    saveProfessor: async (professorData) => {
        const response = await api.post('/professor/save', professorData);
        return response.data;
    },

    // Profesör siler
    deleteProfessor: async (id) => {
        await api.delete(`/professor/delete/${id}`);
    }
};