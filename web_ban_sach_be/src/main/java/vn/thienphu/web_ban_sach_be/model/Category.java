package vn.thienphu.web_ban_sach_be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private long categoryID;

    @Column(name = "category_name", length = 50, nullable = false, unique = true)
    private String categoryName;

    @ManyToMany(mappedBy = "categories")
    private List<Book> books;
}
