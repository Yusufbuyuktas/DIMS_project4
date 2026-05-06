const FILE_BASE_URL = 'http://localhost:8080/api/files';

export const getFileUrl = (fileName) => {
    if (!fileName) return null;
    // Resim ve PDF dosyaları için backend'deki tam yolu oluşturur
    return `${FILE_BASE_URL}/${fileName}`;
};

export const openPdfInNewTab = (fileName) => {
    const fullUrl = getFileUrl(fileName);
    if (fullUrl) {
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    }
};