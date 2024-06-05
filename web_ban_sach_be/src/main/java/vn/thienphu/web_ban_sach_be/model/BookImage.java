package vn.thienphu.web_ban_sach_be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "book_image")
public class BookImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_image_id")
    private long bookImageID;

    @Column(name = "book_image", length = 255, nullable = false)
    private String bookImage;

    @Column(name = "is_primary", nullable = false)
    private boolean isPrimary;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
}
