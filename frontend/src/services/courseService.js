import api from './api';

export const courseService = {
    // Tüm dersleri getirir
    getAllCourses: async () => {
        const response = await api.get('/course/list');
        return response.data;
    },

    // ID'ye göre ders getirir
    getCourseById: async (id) => {
        const response = await api.get(`/course/list/${id}`);
        return response.data;
    },

    // Yeni ders kaydeder
    saveCourse: async (courseData) => {
        const response = await api.post('/course/save', courseData);
        return response.data;
    },

    // Ders günceller
    updateCourse: async (id, courseData) => {
        const response = await api.put(`/course/update/${id}`, courseData);
        return response.data;
    }
};