package com.example.projebackend.service;

import com.example.projebackend.dto.RequestCourseDTO;
import com.example.projebackend.dto.ResponseCourseDTO;
import com.example.projebackend.exception.ErrorMessages;
import com.example.projebackend.exception.ResourceAlreadyExistsException;
import com.example.projebackend.exception.ResourceNotFoundException;
import com.example.projebackend.model.Course;
import com.example.projebackend.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }

    public ResponseCourseDTO saveCourse(RequestCourseDTO requestCourseDTO) {
        if (courseRepository.existsByName(requestCourseDTO.getName())) {
            throw new ResourceAlreadyExistsException(ErrorMessages.ERROR_COURSE_ALREADY_EXIST);
        }

        Course course = new Course(requestCourseDTO);
        Course dbCourse = courseRepository.save(course);

        System.out.println("LOG INFO: course added -> ID: " + dbCourse.getId() + ", Course: " + dbCourse.getName());
        return dbCourse.viewAsCourseDTO();
    }


    public List<ResponseCourseDTO> getAllCourses() {
        return courseRepository.findAll().stream().map(Course::viewAsCourseDTO).toList();

        /*
        // Lambda gösterimi (Uzun yol)
        .map(course -> course.viewAsCourseDTO()) // akıştan gelen her bir nesne için bunu yapar map

        // Method Reference gösterimi (Kısa yol)
        .map(Course::viewAsCourseDTO)
        */
    }

    public ResponseCourseDTO getCourseById(Integer id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_COURSE_NOT_FOUND))
                .viewAsCourseDTO();
    }

    public void deleteCourseById(Integer id) {
        courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_COURSE_NOT_FOUND));

        courseRepository.deleteById(id);
        System.out.println("LOG INFO: course deleted -> ID: " + id);
    }

    public ResponseCourseDTO updateCourseById(Integer id, RequestCourseDTO requestCourseDTO) {
        Course dbCourse = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_COURSE_NOT_FOUND));


        // request'den gelen bilgiler ile güncelle
        dbCourse.setName(requestCourseDTO.getName());
        dbCourse.setCredit(requestCourseDTO.getCredit());

        Course updatedCourse = courseRepository.save(dbCourse);
        System.out.println("LOG INFO: course updated -> ID: " + updatedCourse.getId());

        return updatedCourse.viewAsCourseDTO();
    }

}