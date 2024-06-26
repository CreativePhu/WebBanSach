package vn.thienphu.web_ban_sach_be.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import vn.thienphu.web_ban_sach_be.dao.RoleRepository;
import vn.thienphu.web_ban_sach_be.dao.UserRepository;
import vn.thienphu.web_ban_sach_be.dto.UserGenerateOTP_DTO;
import vn.thienphu.web_ban_sach_be.dto.UserInfoDTO;
import vn.thienphu.web_ban_sach_be.dto.UserRegisterDTO;
import vn.thienphu.web_ban_sach_be.dto.UserUpdateDTO;
import vn.thienphu.web_ban_sach_be.exception.UserException;
import vn.thienphu.web_ban_sach_be.model.Role;
import vn.thienphu.web_ban_sach_be.model.User;

import java.util.Date;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final EmailService emailService;
    private final JWTService jwtService;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, RoleRepository roleRepository, EmailService emailService, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }

    @Transactional
    public ResponseEntity<?> UserRegister(UserRegisterDTO userRegisterDTO) {

        if (userRepository.existsByUserName(userRegisterDTO.getUserName())) {
            throw new UserException("Tên đăng nhập đã tồn tại");
        }

        if (userRepository.existsByEmail(userRegisterDTO.getEmail())) {
            throw new UserException("Email đã tồn tại");
        }

        User user = new User(0, userRegisterDTO.getUserName(), passwordEncoder.encode(userRegisterDTO.getPassWord()), userRegisterDTO.getUserName(), null, userRegisterDTO.getEmail(), false, generateVerificationCode(), new Date(), new Date());
        Role role = roleRepository.findByRoleName("CUSTOMER");
        user.addRole(role);
        role.addUser(user);

        userRepository.save(user);
        sendVerificationEmail(user.getEmail(), user.getVerificationCode());

        return ResponseEntity.ok("Đăng ký thành công");
    }

    private String generateVerificationCode() {
        return UUID.randomUUID().toString();
    }

    private void sendVerificationEmail(String email, String verificationCode) {
        String subject = "VERIFY YOUR ACCOUNT - Fahasha";
        emailService.sendEmail("phutot28102002@gmail.com", email, subject, verificationCode);
    }

    public ResponseEntity<?> verifyUser(String email, String verificationCode) {
        boolean isVerify = userRepository.existsByEmailAndVerificationCode(email, verificationCode);
        if (isVerify) {
            User user = userRepository.findByEmail(email);
            user.setVerificationCode(null);
            user.setVerified(true);
            userRepository.save(user);
            return ResponseEntity.ok("Xác thực thành công");
        }
        return ResponseEntity.badRequest().body("Xác thực thất bại");
    }

    public ResponseEntity<?> verifyToken(String token) {
        String username = jwtService.extractUsername(token);
        User user = userRepository.findByUserName(username);
        if (user != null) {
            UserInfoDTO userInfoDTO = new UserInfoDTO(user.getUserID(), user.getUserName(), user.getFullName(), user.getPhone(), user.getEmail(), user.isVerified(), user.getCreatedAt(), user.getUpdatedAt());
            return ResponseEntity.ok(userInfoDTO);
        }
        return ResponseEntity.badRequest().body("Token không hợp lệ");
    }

    @Transactional
    public ResponseEntity<?> updateUser(String username, UserUpdateDTO userUpdateDTO) {
        User user = userRepository.findByUserName(username);
        if (user != null) {
            if (userUpdateDTO.getFullName() != null) user.setFullName(userUpdateDTO.getFullName());
            if (userUpdateDTO.getPhoneNumber() != null) user.setPhone(userUpdateDTO.getPhoneNumber());
            if (userUpdateDTO.getEmail() != null) user.setEmail(userUpdateDTO.getEmail());
            userRepository.save(user);
            return ResponseEntity.ok("Cập nhật thành công");
        }
        return ResponseEntity.badRequest().body("Người dùng không tồn tại");
    }

    public ResponseEntity<?> generateOTP(UserGenerateOTP_DTO userGenerateOTPDto) {
        User user = userRepository.findByUserName(userGenerateOTPDto.getUserName());
        if (user != null) {
            String otp = generateVerificationCode();
            user.setVerificationCode(otp);
            userRepository.save(user);
            sendVerificationEmail(userGenerateOTPDto.getEmail(), otp);
            return ResponseEntity.ok("Gửi mã OTP thành công");
        }
        return ResponseEntity.badRequest().body("Yêu cầu không hợp lệ");
    }
}
