package com.example.projebackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File; // 👈 Klasik File kütüphanesini de kontrol için ekledik
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String uploadFile(MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            // 🎯 Dosyayı tam (Absolute) yoluna oturtuyoruz
            Path path = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Dosya yüklenemedi: " + e.getMessage());
        }
    }

    public void deleteFile(String fileName) {
        if (fileName == null || fileName.equals("default-avatar.png") || fileName.isEmpty()) {
            return;
        }

        try {
            // 🎯 Silme anında dosyanın tam konumunu tekrar hesapla
            Path filePath = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(fileName);
            File file = filePath.toFile();

            if (file.exists()) {
                if (file.delete()) {
                    System.out.println("LOG SUCCESS: Fiziksel dosya silindi -> " + filePath);
                } else {
                    System.err.println("LOG ERROR: Dosya var ama silinemedi (Kilitli olabilir) -> " + fileName);
                }
            } else {
                System.out.println("LOG WARNING: Dosya diskte bulunamadı -> " + filePath);
            }
        } catch (Exception e) {
            System.err.println("LOG ERROR: Silme sırasında beklenmedik hata -> " + e.getMessage());
        }
    }

    public byte[] getFile(String fileName) {
        try {
            Path path = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(fileName);
            return Files.readAllBytes(path);
        } catch (IOException e) {
            throw new RuntimeException("Dosya bulunamadı!");
        }
    }
}