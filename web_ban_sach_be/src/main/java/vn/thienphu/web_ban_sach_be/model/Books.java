package vn.thienphu.web_ban_sach_be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "books")
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private long bookID;

    @Column(name = "book_title", length = 255, nullable = false)
    private String bookTitle;

    @Column(name = "book_price", nullable = false)
    private double bookPrice;

    @Column(name = "book_description", length = 255, nullable = false)
    private String bookDescription;

    @Column(name = "book_isbn", length = 255, nullable = false)
    private String bookISBN;

    @ManyToMany
    @JoinTable(
            name = "book_authors",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set<Authors> authors;

    @ManyToMany
    @JoinTable(
            name = "book_categories",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Categories> categories;

    @ManyToOne
    @JoinColumn(name = "publisher_id", nullable = false)
    private Publishers publisher;

    @OneToMany(mappedBy = "book")
    private Set<OrderDetails> orderDetails;

    @OneToMany(mappedBy = "book")
    private Set<Reviews> reviews;

    @OneToMany(mappedBy = "book")
    private Set<BookImages> bookImages;

    @ManyToMany
    @JoinTable(
            name = "book_discounts",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "discount_id")
    )
    private Set<Discounts> discounts;
}
