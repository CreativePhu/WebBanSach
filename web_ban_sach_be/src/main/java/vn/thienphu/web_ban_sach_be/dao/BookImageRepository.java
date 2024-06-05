package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import vn.thienphu.web_ban_sach_be.model.BookImage;

@RepositoryRestResource(path = "book-images")
public interface BookImageRepository extends JpaRepository<BookImage, Long> {
}
