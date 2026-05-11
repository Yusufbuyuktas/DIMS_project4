package com.example.projebackend.repository;

import com.example.projebackend.model.Teaches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

// Virgül tehlikesi olmadan verileri doğrudan Projection'a aktarır
@Repository
public interface TeachesRepository extends JpaRepository<Teaches, Integer> {

    boolean existsByProfessorIdAndCourseId(Integer professorId, Integer courseId);

    @Query(value = "SELECT t.id AS teachesId, " +
            "p.name AS professorName, " +
            "c.name AS courseName, " +
            "t.student_count AS studentCount, " +
            "t.start_date AS startDate, " +
            "t.ending_date AS endingDate " +
            "FROM teaches t " +
            "JOIN professors p ON t.professor_id = p.id " +
            "JOIN courses c ON t.course_id = c.id",
            nativeQuery = true)
    List<TeachesProjection> getAllTeachesWithJoins();

}