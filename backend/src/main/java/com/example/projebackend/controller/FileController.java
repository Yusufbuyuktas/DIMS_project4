package com.example.projebackend.controller;


import com.example.projebackend.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:5173") // Frontend portuna izin ver
@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileService.uploadFile(file);
        return ResponseEntity.ok(fileName);
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]> getFile(@PathVariable String fileName) {
        byte[] file = fileService.getFile(fileName);

        // Basit bir mantıkla uzantıya göre içerik tipi belirleyebiliriz
        MediaType mediaType = MediaType.IMAGE_JPEG; // Varsayılan
        if (fileName.toLowerCase().endsWith(".png")) mediaType = MediaType.IMAGE_PNG;
        if (fileName.toLowerCase().endsWith(".gif")) mediaType = MediaType.IMAGE_GIF;

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .contentType(mediaType) // 👈 Burası kritik
                .body(file);
    }
}