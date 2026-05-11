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

        // 2. Verileri Ders Adına göre grupla ve Profesörleri virgülle birleştir
        Map<String, String> groupedData = teachesList.stream()
                .collect(Collectors.groupingBy(
                        t -> t.getCourse().getName(), // Anahtar (Key): Ders Adı
                        Collectors.mapping(
                                t -> t.getProfessor().getName(), // Değer (Value): Profesör Adı
                                Collectors.joining(", ") // Aynı dersi veren hocaları virgülle birleştir
                        )
                ));

        // 3. Gruplanmış veriyi Jasper'ın anlayacağı DTO formatına çevir
        List<ProfessorCourseDTO> reportData = groupedData.entrySet().stream()
                .map(entry -> new ProfessorCourseDTO(
                        entry.getValue(), // professorFullName (Birleştirilmiş Hoca İsimleri)
                        entry.getKey()    // courseName (Ders Adı)
                ))
                .collect(Collectors.toList());

        // 4. resources/reports/professor_courses.jrxml şablonunu oku
        InputStream reportStream = getClass().getResourceAsStream("/reports/professor_courses.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        // 5. Veri kaynağını oluştur
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(reportData);

        // 6. Parametreler (Opsiyonel)
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("ReportTitle", "Profesör - Kurs Atama Raporu");

        // 7. Raporu doldur
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // 8. PDF'i byte array olarak dışa aktar
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}