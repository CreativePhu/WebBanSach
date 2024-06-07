package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;
import vn.thienphu.web_ban_sach_be.model.Book;

@RepositoryRestResource(path = "books")
public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findByBookTitleIsContainingIgnoreCase(@RequestParam("bookTitle") String bookTitle, Pageable pageable);
}
