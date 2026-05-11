package com.example.projebackend.repository;

import java.time.LocalDate;

// Veritabanından gelen Native SQL sonucunu tutacak güvenli kalıp
public interface TeachesProjection {
    Integer getTeachesId();
    String getProfessorName();
    String getCourseName();
    Integer getStudentCount();
    LocalDate getStartDate();
    LocalDate getEndingDate();
}