package vn.thienphu.web_ban_sach_be.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import vn.thienphu.web_ban_sach_be.dao.RoleRepository;
import vn.thienphu.web_ban_sach_be.dao.UserRepository;
import vn.thienphu.web_ban_sach_be.dto.UserRegisterDTO;
import vn.thienphu.web_ban_sach_be.model.Role;
import vn.thienphu.web_ban_sach_be.model.User;

import java.util.Date;
import java.util.UUID;

@Service
public class UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Transactional
    public ResponseEntity<?> UserRegister(UserRegisterDTO userRegisterDTO) {

        if (userRepository.existsByUserName(userRegisterDTO.getUsername())) {
            return ResponseEntity.badRequest().body("Tên đăng nhập đã tồn tại");
        }

        if (userRepository.existsByEmail(userRegisterDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        User user = new User(0, userRegisterDTO.getUsername(), passwordEncoder.encode(userRegisterDTO.getPassword()), userRegisterDTO.getUsername(), null, userRegisterDTO.getEmail(), false, generateVerificationCode(),  new Date(), new Date());
        Role role = roleRepository.findByRoleName("CUSTOMER");
        user.addRole(role);
        role.addUser(user);

        userRepository.save(user);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    private String generateVerificationCode() {
        return UUID.randomUUID().toString();
    }
}
