package com.example.projebackend.service;

import com.example.projebackend.model.Teaches;
import com.example.projebackend.repository.TeachesRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final TeachesRepository teachesRepository;

    // Jaspersoft'taki Field'lar ile birebir eşleşecek DTO sınıfı
    @Data
    @AllArgsConstructor
    public static class ProfessorCourseDTO {
        private String professorFullName;
        private String courseName;
    }

    public byte[] generateProfessorCoursesPdf() throws JRException {
        // 1. Veritabanından Profesör-Kurs eşleşmelerini çek
        List<Teaches> teachesList = teachesRepository.findAll();

        // 2. Verileri Jasper'ın anlayacağı formata çevir (BURASI GÜNCELLENDİ)
        List<ProfessorCourseDTO> reportData = teachesList.stream()
                .map(t -> new ProfessorCourseDTO(
                        t.getProfessor().getName(), // Artık sadece getName() kullanıyoruz
                        t.getCourse().getName()
                ))
                .collect(Collectors.toList());

        // 3. resources/reports/professor_courses.jrxml şablonunu oku
        InputStream reportStream = getClass().getResourceAsStream("/reports/professor_courses.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        // 4. Veri kaynağını oluştur
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(reportData);

        // 5. Parametreler (Opsiyonel)
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("ReportTitle", "Profesör - Kurs Atama Raporu");

        // 6. Raporu doldur
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // 7. PDF'i byte array olarak dışa aktar
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}