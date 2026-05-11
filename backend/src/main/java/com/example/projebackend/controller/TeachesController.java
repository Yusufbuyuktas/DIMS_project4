package com.example.projebackend.controller;

import com.example.projebackend.dto.RequestTeachesDTO;
import com.example.projebackend.dto.ResponseTeachesDTO;
import com.example.projebackend.service.TeachesService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/rest/api/teaches")
public class TeachesController {


    private final TeachesService teachesService;

    public TeachesController(TeachesService teachesService) {
        this.teachesService = teachesService;
    }


    @PostMapping("/save")
    public ResponseEntity<ResponseTeachesDTO> saveTeaches(@Valid @RequestBody RequestTeachesDTO request) {
        ResponseTeachesDTO response = teachesService.saveTeaches(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/list")
    public ResponseEntity<List<ResponseTeachesDTO>> getAllTeaches() {
        return ResponseEntity.ok(teachesService.getAllTeaches());
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<ResponseTeachesDTO> getTeachesById(@PathVariable Integer id) {
        return ResponseEntity.ok(teachesService.getTeachesById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseTeachesDTO> updateTeaches(@PathVariable Integer id, @Valid @RequestBody RequestTeachesDTO request) {
        return ResponseEntity.ok(teachesService.updateTeachesById(id, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTeaches(@PathVariable Integer id) {
        teachesService.deleteTeachesById(id);
        return ResponseEntity.ok().build();
    }
}