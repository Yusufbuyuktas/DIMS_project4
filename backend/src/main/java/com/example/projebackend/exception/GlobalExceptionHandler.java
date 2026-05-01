package com.example.projebackend.exception;

import net.sf.jasperreports.engine.JRException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // 1. Senin JasperReports Hatanı Yakalar
    @ExceptionHandler(JRException.class)
    public ResponseEntity<Map<String, String>> handleJasperException(JRException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Rapor oluşturulurken bir hata meydana geldi.");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR); // 500
    }

    // 2. Bulunamadı Hatalarını Yakalar (ResourceNotFoundException)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Kayıt Bulunamadı");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); // 404
    }

    // 3. Zaten Var Hatalarını Yakalar (ResourceAlreadyExistsException)
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleResourceAlreadyExistsException(ResourceAlreadyExistsException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Çakışma / Zaten Mevcut");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.CONFLICT); // 409
    }

    // 4. Diğer Tüm Genel Hataları Yakalar
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Sunucu kaynaklı genel bir hata oluştu.");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR); // 500
    }

    // Tarih Aralığı Hatalarını Yakalar (InvalidDateRangeException)
    @ExceptionHandler(InvalidDateRangeException.class)
    public ResponseEntity<Map<String, String>> handleInvalidDateRangeException(InvalidDateRangeException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Geçersiz Tarih Aralığı");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); // 400
    }
}