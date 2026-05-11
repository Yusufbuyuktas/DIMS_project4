package com.example.projebackend.service;

import com.example.projebackend.dto.RequestCourseDTO;
import com.example.projebackend.dto.ResponseCourseDTO;
import com.example.projebackend.exception.ErrorMessages;
import com.example.projebackend.exception.ResourceAlreadyExistsException;
import com.example.projebackend.exception.ResourceNotFoundException;
import com.example.projebackend.model.Course;
import com.example.projebackend.repository.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // 👈 Eklendi

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }

    @Transactional
    public ResponseCourseDTO saveCourse(RequestCourseDTO requestCourseDTO) {
        String trimmedName = requestCourseDTO.getName().trim();

        // 🎯 Duyarsız kontrol
        if (courseRepository.existsByNameIgnoreCase(trimmedName)) {
            throw new ResourceAlreadyExistsException(ErrorMessages.ERROR_COURSE_ALREADY_EXIST);
        }

        Course course = new Course(requestCourseDTO);
        course.setName(trimmedName); // PrePersist bunu "Baş Harf Büyük" yapacak

        Course dbCourse = courseRepository.save(course);
        System.out.println("LOG INFO: course added -> ID: " + dbCourse.getId());
        return dbCourse.viewAsCourseDTO();
    }

    public List<ResponseCourseDTO> getAllCourses() {
        return courseRepository.findAll().stream().map(Course::viewAsCourseDTO).toList();
    }

    public ResponseCourseDTO getCourseById(Integer id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_COURSE_NOT_FOUND))
                .viewAsCourseDTO();
    }

    @Transactional
    public void deleteCourseById(Integer id) {
        courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_COURSE_NOT_FOUND));

        courseRepository.deleteById(id);
        System.out.println("LOG INFO: course deleted -> ID: " + id);
    }

    @Transactional
    public ResponseCourseDTO updateCourseById(Integer id, RequestCourseDTO requestCourseDTO) {
        Course dbCourse = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_COURSE_NOT_FOUND));

        String trimmedName = requestCourseDTO.getName().trim();

        // 🎯 Güncelleme çakışma kontrolü
        if (courseRepository.existsByNameIgnoreCaseAndIdNot(trimmedName, id)) {
            throw new ResourceAlreadyExistsException(ErrorMessages.ERROR_COURSE_ALREADY_EXIST);
        }

        dbCourse.setName(trimmedName);
        dbCourse.setCredit(requestCourseDTO.getCredit());

        Course updatedCourse = courseRepository.save(dbCourse);
        System.out.println("LOG INFO: course updated -> ID: " + updatedCourse.getId());

        return updatedCourse.viewAsCourseDTO();
    }
}