package com.example.projebackend.config;

import com.example.projebackend.model.Course;
import com.example.projebackend.model.Professor;
import com.example.projebackend.repository.CourseRepository;
import com.example.projebackend.repository.ProfessorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProfessorRepository professorRepository;
    private final CourseRepository courseRepository;

    public DataInitializer(ProfessorRepository professorRepository, CourseRepository courseRepository) {
        this.professorRepository = professorRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // 1. Veritabanı kontrolü: Eğer hoca yoksa default verileri ekle
        if (professorRepository.count() == 0) {
            System.out.println("LOG INFO: Veritabanı boş, örnek veriler yükleniyor...");

            // --- PROFESÖRLER ---
            Professor yusuf = new Professor();
            yusuf.setName("Yusuf Büyüktaş");
            yusuf.setDepartment("Yazılım Mühendisliği");
            yusuf.setImageName("default-avatar.png");
            professorRepository.save(yusuf);

            Professor ahmet = new Professor();
            ahmet.setName("Ahmet Hilmi");
            ahmet.setDepartment("Yazılım Mühendisliği");
            ahmet.setImageName("default-avatar.png");
            professorRepository.save(ahmet);

            Professor huseyin = new Professor();
            huseyin.setName("Hüseyin Yılmaz");
            huseyin.setDepartment("Yazılım Mühendisliği");
            huseyin.setImageName("default-avatar.png");
            professorRepository.save(huseyin);

            // --- KURSLAR ---
            if (courseRepository.count() == 0) {
                Course c1 = new Course();
                c1.setName("Algoritmalar ve Veri Yapıları");
                c1.setCredit(6);
                courseRepository.save(c1);

                Course c2 = new Course();
                c2.setName("Veritabanı Yönetim Sistemleri");
                c2.setCredit(5);
                courseRepository.save(c2);

                Course c3 = new Course();
                c3.setName("Web Programlama");
                c3.setCredit(4);
                courseRepository.save(c3);
            }

            System.out.println("LOG INFO: Başlangıç verileri başarıyla sisteme işlendi.");
        } else {
            System.out.println("LOG INFO: Veritabanı zaten dolu, başlangıç verisi atlanıyor.");
        }
    }
}