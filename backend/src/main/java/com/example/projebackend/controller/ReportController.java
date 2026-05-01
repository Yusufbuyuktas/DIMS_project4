package com.example.projebackend.controller;

import com.example.projebackend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports") // Tüm rapor istekleri bu adresten başlayacak
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/professor-courses")
    public ResponseEntity<byte[]> getProfessorCoursesReport() {
        try {
            // Servisimizden PDF'in byte (veri) halini alıyoruz
            byte[] pdfBytes = reportService.generateProfessorCoursesPdf();

            // Tarayıcının bunun bir PDF dosyası olduğunu anlaması için başlıkları(headers) ayarlıyoruz
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);

            // "attachment" kısmı, PDF'in tarayıcıda sekme olarak açılmak yerine doğrudan bilgisayara inmesini sağlar
            headers.setContentDispositionFormData("attachment", "profesor_kurs_eslesmeleri.pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            // Bir hata olursa konsola yazdır ve 500 hatası dön
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}