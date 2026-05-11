package com.example.projebackend.model;

import com.example.projebackend.dto.RequestTeachesDTO;
import com.example.projebackend.dto.ResponseTeachesDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "teaches")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Teaches {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    // Bir profesörün birden fazla ataması olabilir.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id", nullable = false)
    private Professor professor;

    // Bir dersin birden fazla ataması olabilir.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "student_count")
    private Integer studentCount;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "ending_date")
    private LocalDate endingDate;


    public Teaches(RequestTeachesDTO requestDTO, Professor professor, Course course) {
        this.professor = professor;
        this.course = course;
        this.studentCount = requestDTO.getStudentCount();
        this.startDate = requestDTO.getStartDate();
        this.endingDate = requestDTO.getEndingDate();
    }

    public ResponseTeachesDTO viewAsTeachesDTO() {
        ResponseTeachesDTO dto = new ResponseTeachesDTO();
        dto.setId(this.id);
        dto.setCourseId(this.course.getId());
        dto.setProfessorName(this.professor.getName());
        dto.setCourseName(this.course.getName());
        dto.setStudentCount(this.studentCount);
        dto.setStartDate(this.startDate);
        dto.setEndingDate(this.endingDate);
        return dto;
    }
}