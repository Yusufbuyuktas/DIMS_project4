package com.example.projebackend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import jakarta.validation.constraints.Min;

@Data
public class RequestTeachesDTO {

    @NotNull(message = "professor id cannot be null")
    private Integer professorId;
    @NotNull(message = "course id cannot be null")
    private Integer courseId;
    @Min(value = 0, message = "Öğrenci sayısı negatif olamaz")
    private Integer studentCount;
    @NotNull(message = "start date cannot be null")
    private LocalDate startDate;
    private LocalDate endingDate;
}