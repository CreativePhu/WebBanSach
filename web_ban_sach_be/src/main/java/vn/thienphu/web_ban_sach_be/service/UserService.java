package vn.thienphu.web_ban_sach_be.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import vn.thienphu.web_ban_sach_be.dao.RoleRepository;
import vn.thienphu.web_ban_sach_be.dao.UserRepository;
import vn.thienphu.web_ban_sach_be.dto.*;
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
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, RoleRepository roleRepository, EmailService emailService, JWTService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.emailService = emailService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
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

        return ResponseEntity.ok(new JwtDTO(jwtService.generateToken(user.getUserName())));
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
        return ResponseEntity.badRequest().body(new ErrorResponseDTO(HttpStatus.BAD_REQUEST.value(), "Mã xác thực không hợp lệ", System.currentTimeMillis()));
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
    public ResponseEntity<?> updateUser(String authorizationHeader, UserUpdateDTO userUpdateDTO) {
        String jwt = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
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

    public ResponseEntity<?> generateOTP(String authorizationHeader) {
        String jwt = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        User user = userRepository.findByUserName(username);
        if (user != null) {
            String otp = generateVerificationCode();
            user.setVerificationCode(otp);
            userRepository.save(user);
            sendVerificationEmail(user.getEmail(), otp);
            return ResponseEntity.ok("Gửi mã OTP thành công");
        }
        return ResponseEntity.badRequest().body("Người dùng không tồn tại");
    }

    public ResponseEntity<?> checkIsVerified(String email) {
        boolean isVerified = userRepository.existsByEmailAndIsVerifiedTrue(email);
        if (isVerified) {
            return ResponseEntity.ok("Email đã được xác thực.");
        } else {
            return ResponseEntity.badRequest().body("Email chưa được xác thực.");
        }
    }

    public ResponseEntity<?> changePassword(String authorizationHeader, UserChangePasswordDTO userChangePasswordDTO) {
        String jwt = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, userChangePasswordDTO.getPassword()));
            if (authentication.isAuthenticated()) {
                User user = userRepository.findByUserName(username);
                if (user != null) {
                    if (userChangePasswordDTO.getPassword() != null)
                        user.setPassword(passwordEncoder.encode(userChangePasswordDTO.getNewPassword()));
                    userRepository.save(user);
                    return ResponseEntity.ok("Cập nhật thành công");
                }
                return ResponseEntity.badRequest().body("Người dùng không tồn tại");
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponseDTO(HttpStatus.UNAUTHORIZED.value(), "Tài khoản hoặc mật khẩu không chính xác", System.currentTimeMillis()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponseDTO(HttpStatus.UNAUTHORIZED.value(), "Tài khoản hoặc mật khẩu không chính xác", System.currentTimeMillis()));
        }
    }
}
