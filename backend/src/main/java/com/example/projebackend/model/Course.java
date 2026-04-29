package com.example.projebackend.model;

import com.example.projebackend.dto.RequestCourseDTO;
import com.example.projebackend.dto.ResponseCourseDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "credit")
    private Integer credit;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true) // course silşinidğinde ilgili teach de silinmeli.
    private List<Teaches> teaches;// course hakkında bilgi almak için.

    // yeni kayıt oluştururken Request DTO'yu Entity'ye çeviren Constructor
    public Course(RequestCourseDTO requestDTO) {
        this.name = requestDTO.getName();
        this.credit = requestDTO.getCredit();
    }

    public ResponseCourseDTO viewAsCourseDTO() { // entity'den response'a
        ResponseCourseDTO dto = new ResponseCourseDTO();
        dto.setId(this.id);
        dto.setName(this.name);
        dto.setCredit(this.credit);

        if (this.teaches != null) {
            dto.setTeaches(this.teaches.stream().map(Teaches::viewAsTeachesDTO).toList());
        }

        return dto;
    }

}
