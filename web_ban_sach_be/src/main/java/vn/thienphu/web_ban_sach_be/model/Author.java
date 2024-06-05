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
@Table(name = "author")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "author_id")
    private long authorID;

    @Column(name = "author_name", length = 50, nullable = false)
    private String authorName;

    @ManyToMany(mappedBy = "authors")
    private List<Book> books;
}
