package com.example.projebackend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ResponseTeachesDTO {
    private Integer id;
    private String professorName;
    private String courseName;
    private Integer studentCount;
    private LocalDate startDate;
    private LocalDate endingDate;
}
