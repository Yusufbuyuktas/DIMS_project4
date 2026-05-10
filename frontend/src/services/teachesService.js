import api from './api';

export const teachesService = {
    assign: async (assignmentData) => {
        // assignmentData: { professorId, courseId, startDate, studentCount, endingDate }
        const res = await api.post('/rest/api/teaches/save', assignmentData);
        return res.data;
    },
    delete: async (teachesId) => {
        await api.delete(`/rest/api/teaches/delete/${teachesId}`);
    }
};