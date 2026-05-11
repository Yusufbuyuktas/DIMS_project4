package com.example.projebackend.model;

import com.example.projebackend.dto.RequestCourseDTO;
import com.example.projebackend.dto.ResponseCourseDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Locale; // 👈 Eklendi

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

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Teaches> teaches;

    // 🚀 OTOMATİK FORMATLAMA: Veritabanına gitmeden hemen önce çalışır
    @PrePersist
    @PreUpdate
    public void validateAndFormat() {
        if (this.name != null) {
            this.name = formatToTitleCase(this.name);
        }
    }

    private String formatToTitleCase(String input) {
        if (input == null || input.isBlank()) return input;
        Locale tr = new Locale("tr", "TR");
        String[] words = input.trim().toLowerCase(tr).split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (String word : words) {
            if (!word.isEmpty()) {
                sb.append(Character.toUpperCase(word.charAt(0)))
                        .append(word.substring(1))
                        .append(" ");
            }
        }
        return sb.toString().trim();
    }

    public Course(RequestCourseDTO requestDTO) {
        this.name = requestDTO.getName();
        this.credit = requestDTO.getCredit();
    }

    public ResponseCourseDTO viewAsCourseDTO() {
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