package com.example.projebackend.exception;

public class ErrorMessages {

    // ProfessorService için olanlar
    public static final String ERROR_PROFESSOR_NOT_FOUND = "Profesör bulunamadı.";
    public static final String ERROR_PROFESSOR_ALREADY_EXIST = "Bu profesör zaten sistemde mevcut.";

    // CourseService için olanlar
    public static final String ERROR_COURSE_NOT_FOUND = "Kurs bulunamadı.";
    public static final String ERROR_COURSE_ALREADY_EXIST = "Bu kurs zaten sistemde mevcut.";

    // TeachesService (Eşleşme) için olanlar
    public static final String ERROR_TEACH_NOT_FOUND = "Profesör-Kurs eşleşmesi bulunamadı.";
    public static final String ERROR_TEACH_ALREADY_EXIST = "Bu eşleşme zaten sistemde mevcut.";

    // Tarih Doğrulaması için YENİ EKLENEN
    public static final String ERROR_INVALID_DATE_RANGE = "Başlangıç tarihi, bitiş tarihinden sonra olamaz.";
}