#  DIMS_project4 | Akademik Portal & Ders Yönetim Sistemi

<img width="1600" height="767" alt="DersAtamaMerkezi" src="https://github.com/user-attachments/assets/93c94262-6440-4680-8cc8-5c60e41ca3eb" />

DIMS_project4, bir üniversite fakültesindeki profesörleri, dersleri ve bu iki unsur arasındaki akademik atama ilişkilerini (`teaches`) yönetmek amacıyla uçtan uca tasarlanmış, **4 katmanlı (4-Tier) bir Web Otomasyon Sistemidir**. 

Proje; esneklik, genişletilebilirlik, performans ve temiz kod (Clean Code) prensipleri en üst düzeyde tutularak geliştirilmiştir.

---

##  Teknolojik Yığın (Tech Stack)

###  Backend (Arka Plan)
* **Framework:** Spring Boot (Java 17+)
* **Veri Tabanı Erişimi:** Spring Data JPA & Hibernate
* **Güvenlik & Validasyon:** Jakarta Validation API, @Transactional
* **Veri Dönüşümü:** DTO (Data Transfer Object) Tasarım Kalıbı & Spring Projection (Interface-based mapping)

###  Veri Tabanı
* **RDBMS:** PostgreSQL
* **Sorgu Optimizasyonu:** Native SQL (Çoklu tablo JOIN ilişkileri)

###  Frontend (Arayüz)
* **Kütüphane / Derleyici:** React & Vite
* **Tasarım Konsepti:** Tailwind CSS (Modern Dark-Theme Tasarımı)
* **İkon Kütüphanesi:** Lucide React

---

##  Mimari Yapı (4-Tier Architecture)

Sorumlulukların Ayrılması (Separation of Concerns) ilkesine tam uyum sağlayan mimari katmanlarımız:

1. **Sunum Katmanı (Presentation):** React ile izole edilmiş kullanıcı arayüzü. `components`, `hooks`, `pages` ve `services` alt modülleriyle tamamen modülerdir.
2. **Mantık Katmanı (Business Logic):** `service` paketi altındaki Spring Boot servisleri. İş kuralları ve sistem mantığı burada işletilir.
3. **Veri Erişim Katmanı (Data Access / Repository):** Spring Data JPA soyutlaması ve PostgreSQL üzerinde koşan optimize Native SQL sorguları.
4. **Veri Katmanı (Data/Database):** PostgreSQL ilişkisel veritabanı tablosu şemaları (`professors`, `courses`, `teaches`).

---

##  Öne Çıkan Gelişmiş Özellikler

###  Akıllı Fiziksel Dosya ve Çöp Temizliği (Cleanup Mechanism)
Sistemde profesörlere ait profil resimleri kaynak kod dizinlerinden bağımsız olarak projenin kök dizininde (`root/uploads`) güvenle saklanır. Bir profesör silindiğinde ya da resmi güncellendiğinde, sistem otomatik olarak eski resmi algılar ve sunucu diskinden (dosya sisteminden) fiziksel olarak siler. Böylece sunucuda "hayalet (çöp) dosya" birikmesi engellenmiş olur.

###  Performanslı Veri Listeleme & Güvenli Mapping
İlişkisel tabloları (`JOIN`) birleştirirken oluşabilecek veri sızıntılarını ve performans kayıplarını engellemek için **Interface Projections** kullanılmıştır. Veriler veritabanından doğrudan güvenli bir kalıba aktarılarak DTO seviyesinde taşınır.

###  Global Exception Handling (Merkezi Hata Yönetimi)
API üzerinde oluşabilecek tüm hatalar (Örn: `ResourceNotFoundException`, `ResourceAlreadyExistsException`) merkezi bir interceptor tarafından yakalanır. Kullanıcıya her zaman anlamlı ve standartlaştırılmış JSON hata mesajları döner.

---

## 📂 Dosya Hiyerarşisi

```text
proje-backend/ (Root)
├── backend/          # Spring Boot Java Projesi
│   ├── src/main/java/com/example/projebackend/
│   │   ├── config/      # CORS ve Yapılandırma Sınıfları
│   │   ├── controller/  # REST Endpoints
│   │   ├── dto/         # Request & Response DTOs
│   │   ├── exception/   # Global Hata Sınıfları
│   │   ├── model/       # JPA Entity Sınıfları
│   │   ├── repository/  # JpaRepository & Native Queries
│   │   └── service/     # Business Servisleri
│   └── pom.xml
├── frontend/         # React, Vite & Tailwind Projesi
│   ├── src/
│   │   ├── components/  # Yeniden Kullanılabilir Arayüz Elemanları
│   │   ├── pages/       # Sayfa Bileşenleri (Professors, Courses, Teaches)
│   │   ├── services/    # API İsteklerini Yöneten Servisler
│   │   └── hooks/       # Özel React Hook'ları
│   └── package.json
└── uploads/          # Sunucuda Biriken Fiziksel Dosyalar (GitIgnore Edilmiştir)
    └── professors/
🛠️ Kurulum ve Çalıştırma
1. Ön Gereksinimler
Java 17 veya üzeri SDK

PostgreSQL (Port: 5432)

Node.js (v18+) & npm

2. Veritabanı Yapılandırması
PostgreSQL üzerinde final_proje_db adında bir veritabanı oluşturun ve backend/src/main/resources/application.properties dosyasından veritabanı kullanıcı adı ve şifrenizi güncelleyin:

Properties
spring.datasource.url=jdbc:postgresql://localhost:5432/final_proje_db
spring.datasource.username=YOUR_POSTGRES_USERNAME
spring.datasource.password=YOUR_POSTGRES_PASSWORD
3. Backend Projesini Başlatma
backend klasörüne gidin ve projeyi derleyip çalıştırın:

Bash
cd backend
mvn clean install
mvn spring-boot:run
4. Frontend Projesini Başlatma
frontend klasörüne gidin, bağımlılıkları yükleyin ve projeyi lokalde ayağa kaldırın:

Bash
cd frontend
npm install
npm run dev
🤝 Katkıda Bulunanlar (Geliştirici Ekibi)
Bu proje, başarılı bir takım çalışması ve Git iş akışı (Git Flow) yönetimiyle hayata geçirilmiştir:

Yusuf (Backend Entegrasyon, Dosya Temizlik Sistemleri, Dosya Yönetimi, Frontend State & Atama Mantığı)

Ali (Professor, Course ve File Servis Entegrasyon ve Test Süreçleri)

Ahmet Hilmi (Teaches/Ders Atama Altyapısı, Native SQL Temelleri)

Hüseyin (İlk Sürüm Dosya Yükleme Sistem Taslakları)

Faruk  (Jasper ReportController, PDF Raporlama Altyapısı ve Servisleri)
