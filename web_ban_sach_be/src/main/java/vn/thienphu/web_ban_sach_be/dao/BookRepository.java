package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.thienphu.web_ban_sach_be.model.Books;

@Repository
public interface BookRepository extends JpaRepository<Books, Long> {
}
