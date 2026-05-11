import api from './api';

export const courseService = {
    getAll: async () => {
        const res = await api.get('/course/list');
        return res.data;
    },
    save: async (data) => {
        const res = await api.post('/course/save', data);
        return res.data;
    },
    update: async (id, data) => {
        const res = await api.put(`/course/update/${id}`, data);
        return res.data;
    },
    delete: async (id) => {
        await api.delete(`/course/delete/${id}`);
    }
};