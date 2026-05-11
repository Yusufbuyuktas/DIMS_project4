package com.example.projebackend.service;

import com.example.projebackend.dto.RequestProfessorDTO;
import com.example.projebackend.dto.ResponseProfessorDTO;
import com.example.projebackend.exception.ErrorMessages;
import com.example.projebackend.exception.ResourceAlreadyExistsException;
import com.example.projebackend.exception.ResourceNotFoundException;
import com.example.projebackend.model.Professor;
import com.example.projebackend.repository.ProfessorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;
    private final FileService fileService;

    public ProfessorService(ProfessorRepository professorRepository, FileService fileService) {
        this.professorRepository = professorRepository;
        this.fileService = fileService;
    }

    public List<ResponseProfessorDTO> getAllProfessor() {
        return professorRepository.findAll().stream()
                .map(Professor::viewAsProfessorDTO)
                .toList();
    }

    public ResponseProfessorDTO getProfessorById(Integer id) {
        return professorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_PROFESSOR_NOT_FOUND))
                .viewAsProfessorDTO();
    }

    @Transactional
    public ResponseProfessorDTO saveProfessor(RequestProfessorDTO requestProfessorDTO) {
        String trimmedName = requestProfessorDTO.getName().trim();

        if (professorRepository.existsByNameIgnoreCase(trimmedName)) {
            throw new ResourceAlreadyExistsException(ErrorMessages.ERROR_PROFESSOR_ALREADY_EXIST);
        }

        Professor professor = new Professor(requestProfessorDTO);
        Professor dbProfessor = professorRepository.save(professor);
        return dbProfessor.viewAsProfessorDTO();
    }

    @Transactional
    public void deleteProfessor(Integer id) {
        // 1. Önce hocayı bul (Resim ismini almak için şart)
        Professor dbProfessor = professorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_PROFESSOR_NOT_FOUND));

        // 2. Fiziksel dosya adını al ve FileService'e gönder
        String fileNameToDelete = dbProfessor.getImageName();
        fileService.deleteFile(fileNameToDelete);

        // 3. Veritabanından kaydı sil
        professorRepository.delete(dbProfessor);

        System.out.println("LOG INFO: Professor ID " + id + " database and disk cleanup completed.");
    }

    @Transactional
    public ResponseProfessorDTO updateProfessor(Integer id, RequestProfessorDTO requestProfessorDTO) {
        Professor dbProfessor = professorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.ERROR_PROFESSOR_NOT_FOUND));

        String trimmedName = requestProfessorDTO.getName().trim();

        if (professorRepository.existsByNameIgnoreCaseAndIdNot(trimmedName, id)) {
            throw new ResourceAlreadyExistsException(ErrorMessages.ERROR_PROFESSOR_ALREADY_EXIST);
        }

        String oldImageName = dbProfessor.getImageName();
        dbProfessor.setName(trimmedName);
        dbProfessor.setDepartment(requestProfessorDTO.getDepartment());

        // 3. ADIM: Gelişmiş Resim Yönetimi
        String newImageName = requestProfessorDTO.getImageName();

        if (newImageName != null && !newImageName.isEmpty() && !newImageName.equals(oldImageName)) {
            // Eğer yeni bir resim geldiyse ve eskisi default değilse, eski dosyayı fiziksel olarak sil
            if (!"default-avatar.png".equals(oldImageName)) {
                fileService.deleteFile(oldImageName);
            }
            dbProfessor.setImageName(newImageName);
        }

        return professorRepository.save(dbProfessor).viewAsProfessorDTO();
    }
}