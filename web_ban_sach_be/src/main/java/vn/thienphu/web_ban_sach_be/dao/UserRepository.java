package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import vn.thienphu.web_ban_sach_be.model.Users;

@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<Users, Long> {
}
