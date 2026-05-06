import { toast } from 'react-toastify';

// Başarılı işlemler için yeşil bildirim
export const showSuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
    });
};

// Hatalı işlemler için kırmızı bildirim
export const showError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 4000,
    });
};