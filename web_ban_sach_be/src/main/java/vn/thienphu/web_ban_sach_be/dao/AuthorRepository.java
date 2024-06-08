package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import vn.thienphu.web_ban_sach_be.model.Author;

import java.util.List;

@RepositoryRestResource(path = "authors")
public interface AuthorRepository extends JpaRepository<Author, Long> {
    List<Author> findByBooksBookID(long bookID);
}
