package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import vn.thienphu.web_ban_sach_be.model.User;

@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUserName(String username);

    boolean existsByEmail(String email);

    User findByUserName(String username);

    boolean existsByEmailAndVerificationCode(String email, String verificationCode);

    User findByEmail(String email);

}
