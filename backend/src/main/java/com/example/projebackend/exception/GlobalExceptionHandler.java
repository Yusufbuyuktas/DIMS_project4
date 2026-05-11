package com.example.projebackend.exception;

import net.sf.jasperreports.engine.JRException;
import org.springframework.dao.DataIntegrityViolationException; // 👈 Bu importu ekle
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // 🎯 VERİTABANI UNIQUE CONSTRAINT HATASINI YAKALAR
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Kayıt Çakışması");
        response.put("message", "Bu isimde bir profesör sistemde zaten mevcut.");
        return new ResponseEntity<>(response, HttpStatus.CONFLICT); // 409
    }

    // --- Mevcut Diğer Handler'ların (Jasper, ResourceNotFound vb.) aynen kalsın ---
    @ExceptionHandler(JRException.class)
    public ResponseEntity<Map<String, String>> handleJasperException(JRException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Rapor oluşturulurken bir hata meydana geldi.");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Kayıt Bulunamadı");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleResourceAlreadyExistsException(ResourceAlreadyExistsException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Çakışma / Zaten Mevcut");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Sunucu kaynaklı genel bir hata oluştu.");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InvalidDateRangeException.class)
    public ResponseEntity<Map<String, String>> handleInvalidDateRangeException(InvalidDateRangeException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Geçersiz Tarih Aralığı");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}