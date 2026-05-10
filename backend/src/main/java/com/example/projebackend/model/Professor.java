package com.example.projebackend.model;

import com.example.projebackend.dto.RequestProfessorDTO;
import com.example.projebackend.dto.ResponseProfessorDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "professors")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Professor {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "department")
    private String department;

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Teaches> teaches;

    @Column(name = "image_name")
    private String imageName;



    // yeni kayıt oluştururken Request DTO'yu Entity'ye çeviren Constructor
    public Professor(RequestProfessorDTO requestDTO) {
        this.name = requestDTO.getName();
        this.department = requestDTO.getDepartment();
        this.imageName = requestDTO.getImageName();
    }

    public ResponseProfessorDTO viewAsProfessorDTO() { // entity'den response'a
        ResponseProfessorDTO dto = new ResponseProfessorDTO();
        dto.setId(this.id);
        dto.setName(this.name);
        dto.setDepartment(this.department);
        dto.setImageName(this.imageName);

        if (this.teaches != null) {
            dto.setTeaches(this.teaches.stream().map(Teaches::viewAsTeachesDTO).toList());
        }

        return dto;
    }
}