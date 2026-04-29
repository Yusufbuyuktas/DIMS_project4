package com.example.projebackend.repository;

import com.example.projebackend.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Integer> { // ilk parametre işlem yapacağımız entity'yi belirtir.
    // ikinci parametre ilgili entity'nin id'sinin (@Id) türünü belirtir.

    boolean existsByName(String name);

}
