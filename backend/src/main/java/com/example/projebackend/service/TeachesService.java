package com.example.projebackend.service;

import com.example.projebackend.dto.RequestTeachesDTO;
import com.example.projebackend.dto.ResponseTeachesDTO;
import com.example.projebackend.model.Course;
import com.example.projebackend.model.Professor;
import com.example.projebackend.model.Teaches;
import com.example.projebackend.repository.CourseRepository;
import com.example.projebackend.repository.ProfessorRepository;
import com.example.projebackend.repository.TeachesProjection;
import com.example.projebackend.repository.TeachesRepository;
import org.springframework.stereotype.Service;



import java.util.List;

@Service
public class TeachesService {

    private final TeachesRepository teachesRepository;
    private final ProfessorRepository professorRepository;
    private final CourseRepository courseRepository;

    public TeachesService(TeachesRepository teachesRepository,
                          ProfessorRepository professorRepository,
                          CourseRepository courseRepository) {
        this.teachesRepository = teachesRepository;
        this.professorRepository = professorRepository;
        this.courseRepository = courseRepository;
    }

    
    public ResponseTeachesDTO saveTeaches(RequestTeachesDTO request) {
        validateDateRange(request);

        if (teachesRepository.existsByProfessorIdAndCourseId(request.getProfessorId(), request.getCourseId())) {
            throw new ResourceAlreadyExistsException(ErrorMessages.ERROR_TEACH_ALREADY_EXIST);
        }

        Professor prof = professorRepository.findById(request.getProfessorId()) // teach içerisinde gelen professor db'de kayıtlı mı
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_PROFESSOR_NOT_FOUND));

        Course course = courseRepository.findById(request.getCourseId()) // teach içerisinde gelen course db'de kayıtlı mı
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_COURSE_NOT_FOUND));

        Teaches teaches = new Teaches(request, prof, course);
        Teaches dbTeaches = teachesRepository.save(teaches);

        System.out.println("LOG INFO: teach added -> ID: " + dbTeaches.getId());

        return dbTeaches.viewAsTeachesDTO();
    }

    
    public List<ResponseTeachesDTO> getAllTeaches() {
        // Native SQL'den güvenli Projection listesini al
        List<TeachesProjection> projections = teachesRepository.getAllTeachesWithJoins();

        // Projection verilerini Response DTO'ya dönüştür
        return projections.stream().map(proj -> {
            ResponseTeachesDTO dto = new ResponseTeachesDTO();
            dto.setId(proj.getTeachesId());
            dto.setProfessorName(proj.getProfessorName());
            dto.setCourseName(proj.getCourseName());
            dto.setStudentCount(proj.getStudentCount());
            dto.setStartDate(proj.getStartDate());
            dto.setEndingDate(proj.getEndingDate());
            return dto;
        }).toList();
    }

    
    public ResponseTeachesDTO getTeachesById(Integer id) {
        return teachesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_TEACH_NOT_FOUND))
                .viewAsTeachesDTO();
    }

    
    public void deleteTeachesById(Integer id) {
        teachesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_TEACH_NOT_FOUND));

        teachesRepository.deleteById(id);
        System.out.println("LOG INFO: teach deleted -> ID: " + id);

    }

    
    public ResponseTeachesDTO updateTeachesById(Integer id, RequestTeachesDTO request) {
        validateDateRange(request);

        Teaches dbTeaches = teachesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_TEACH_NOT_FOUND));

        Professor prof = professorRepository.findById(request.getProfessorId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_PROFESSOR_NOT_FOUND));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_COURSE_NOT_FOUND));

        dbTeaches.setProfessor(prof);
        dbTeaches.setCourse(course);
        dbTeaches.setStudentCount(request.getStudentCount());
        dbTeaches.setStartDate(request.getStartDate());
        dbTeaches.setEndingDate(request.getEndingDate());

        Teaches updated = teachesRepository.save(dbTeaches);
        System.out.println("LOG INFO: teach updated -> ID: " + updated.getId());

        return updated.viewAsTeachesDTO();
    }


    private void validateDateRange(RequestTeachesDTO request) {
        if (request.getStartDate() != null
                && request.getEndingDate() != null
                && request.getStartDate().isAfter(request.getEndingDate())) {
            throw new InvalidDateRangeException(ErrorMessages.ERROR_INVALID_DATE_RANGE);
        }
    }


}