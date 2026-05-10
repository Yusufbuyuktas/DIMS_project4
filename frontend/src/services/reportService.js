import api from './api';

export const reportService = {
    downloadProfessorCoursesReport: async () => {
        try {
            const response = await api.get('/rest/api/reports/professor-courses', { // baseURL zaten /rest/api ise
                responseType: 'blob',
            });

            // Gelen binary veriyi (blob) bir URL'ye dönüştür
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            // Gizli bir link oluşturup tıklatarak indirmeyi başlat
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'profesor_kurs_atama_raporu.pdf');
            document.body.appendChild(link);
            link.click();

            // Temizlik
            link.remove();
            window.URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error("Rapor indirme hatası:", error);
            throw error;
        }
    }
};