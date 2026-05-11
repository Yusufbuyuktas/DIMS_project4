package com.example.projebackend.repository;

import com.example.projebackend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    //  İsim bazlı büyük/küçük harf duyarsız kontrol
    boolean existsByNameIgnoreCase(String name);

    //  Güncellemede kendisi dışındaki çakışmaları kontrol eder
    boolean existsByNameIgnoreCaseAndIdNot(String name, Integer id);
}