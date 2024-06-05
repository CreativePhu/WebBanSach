package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import vn.thienphu.web_ban_sach_be.model.Book;

@RepositoryRestResource(path = "books")
public interface BookRepository extends JpaRepository<Book, Long> {
}
