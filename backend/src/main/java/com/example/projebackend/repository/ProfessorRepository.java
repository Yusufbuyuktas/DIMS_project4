package com.example.projebackend.repository;

import com.example.projebackend.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Integer> {

    // Büyük/küçük harf duyarsız isim kontrolü
    boolean existsByNameIgnoreCase(String name);

    // Güncelleme yaparken kendisi hariç çakışma kontrolü
    boolean existsByNameIgnoreCaseAndIdNot(String name, Integer id);
}