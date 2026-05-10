package com.example.projebackend.service;

import com.example.projebackend.dto.RequestProfessorDTO;
import com.example.projebackend.dto.ResponseProfessorDTO;
import com.example.projebackend.exception.ErrorMessages;
import com.example.projebackend.exception.ResourceAlreadyExistsException;
import com.example.projebackend.exception.ResourceNotFoundException;
import com.example.projebackend.model.Professor;
import com.example.projebackend.repository.ProfessorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository){
        this.professorRepository =professorRepository;
    }


    public List<ResponseProfessorDTO> getAllProfessor() {
        return professorRepository.findAll().stream().map(Professor::viewAsProfessorDTO).toList();
    }

    public ResponseProfessorDTO getProfessorById(Integer id) {
        return professorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_PROFESSOR_NOT_FOUND))
                .viewAsProfessorDTO();
    }


    public ResponseProfessorDTO saveProfessor(RequestProfessorDTO requestProfessorDTO) {
        if (professorRepository.existsByName(requestProfessorDTO.getName())) {
            throw new ResourceAlreadyExistsException(ErrorMessages.ERROR_PROFESSOR_ALREADY_EXIST);
        }

        Professor professor = new Professor(requestProfessorDTO);
        Professor dbProfessor = professorRepository.save(professor);

        System.out.println("LOG INFO: professor added -> ID: " + dbProfessor.getId() + ", Professor: " + dbProfessor.getName());
        return dbProfessor.viewAsProfessorDTO();
    }

    public void deleteProfessor(Integer id) {
        professorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_PROFESSOR_NOT_FOUND));

        professorRepository.deleteById(id);
        System.out.println("LOG INFO: professor deleted -> ID: " + id);
    }


    public ResponseProfessorDTO updateProfessor(Integer id, RequestProfessorDTO requestProfessorDTO) {
        Professor dbProfessor = professorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_PROFESSOR_NOT_FOUND));


        // request'den gelen bilgiler ile güncelle
        dbProfessor.setName(requestProfessorDTO.getName());
        dbProfessor.setDepartment(requestProfessorDTO.getDepartment());
        if (requestProfessorDTO.getImageName() != null && !requestProfessorDTO.getImageName().isEmpty()) {
            dbProfessor.setImageName(requestProfessorDTO.getImageName());
        }

        Professor updatedProfessor = professorRepository.save(dbProfessor);
        System.out.println("LOG INFO: professor updated -> ID: " + updatedProfessor.getId());

        return updatedProfessor.viewAsProfessorDTO();
    }


}