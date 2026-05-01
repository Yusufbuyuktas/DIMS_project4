
package com.example.projebackend.controller;

import com.example.projebackend.dto.RequestProfessorDTO;
import com.example.projebackend.dto.ResponseProfessorDTO;
import com.example.projebackend.model.Professor;
import com.example.projebackend.repository.ProfessorRepository;
import com.example.projebackend.service.FileService;
import com.example.projebackend.service.ProfessorService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
        import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/professor")
public class ProfessorController {

    private static final Logger logger = LoggerFactory.getLogger(ProfessorController.class);

    private final ProfessorService professorService;
    private final FileService fileService;
    private final ProfessorRepository professorRepository;

    public ProfessorController(ProfessorService professorService,
                               FileService fileService,
                               ProfessorRepository professorRepository) {
        this.professorService = professorService;
        this.fileService = fileService;
        this.professorRepository = professorRepository;
    }

    @GetMapping(path = "/list")
    public ResponseEntity<List<ResponseProfessorDTO>> getAllProfessor() {
        return new ResponseEntity<>(professorService.getAllProfessor(), HttpStatus.OK);
    }

    @GetMapping(path = "/list/{id}")
    public ResponseEntity<ResponseProfessorDTO> getProfessorById(@PathVariable(name = "id") Integer id) {
        if (id == null || id == 0) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        logger.info("Get professor by id {}", id);
        return new ResponseEntity<>(professorService.getProfessorById(id), HttpStatus.OK);
    }

    @PostMapping(path = "/save")
    public ResponseEntity<ResponseProfessorDTO> saveProfessor(@Valid @RequestBody RequestProfessorDTO requestProfessorDTO) {
        ResponseProfessorDTO response = professorService.saveProfessor(requestProfessorDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable(name = "id") Integer id) {
        if (id == null || id == 0) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        professorService.deleteProfessor(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<ResponseProfessorDTO> updateProfessor(
            @PathVariable(name = "id") Integer id,
            @Valid @RequestBody RequestProfessorDTO requestProfessorDTO) {

        if (id == null || id == 0 || requestProfessorDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(professorService.updateProfessor(id, requestProfessorDTO), HttpStatus.OK);
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<String> uploadProfessorImage(
            @PathVariable Integer id,
            @RequestParam("file") MultipartFile file) {

        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor not found"));

        String fileName = fileService.uploadFile(file);

        professor.setImageName(fileName);
        professorRepository.save(professor);

        return ResponseEntity.ok("Resim yüklendi: " + fileName);
    }
}