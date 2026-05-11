import api from './api';

export const professorService = {
    getAll: async () => {
        const res = await api.get('/professor/list');
        return res.data;
    },
    // Hüseyin'in FileController'ını kullanarak resim yükleme
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await api.post('/api/files/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data; // Dönen dosya adını verir
    },
    save: async (data) => {
        const res = await api.post('/professor/save', data);
        return res.data;
    },
    update: async (id, data) => {
        const res = await api.put(`/professor/update/${id}`, data);
        return res.data;
    },
    delete: async (id) => {
        await api.delete(`/professor/delete/${id}`);
    }
};