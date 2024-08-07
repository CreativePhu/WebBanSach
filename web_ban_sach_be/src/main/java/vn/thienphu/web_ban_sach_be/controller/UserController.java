package vn.thienphu.web_ban_sach_be.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.thienphu.web_ban_sach_be.dto.*;
import vn.thienphu.web_ban_sach_be.service.JWTService;
import vn.thienphu.web_ban_sach_be.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager, JWTService jwtService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    private ResponseEntity<?> UserRegister(@RequestBody UserRegisterDTO userRegisterDTO) {
        return userService.UserRegister(userRegisterDTO);
    }

    @PostMapping("/verify")
    private ResponseEntity<?> verifyUser(@RequestBody UserVerifyDTO userVerifyDTO) {
        return userService.verifyUser(userVerifyDTO.getEmail(), userVerifyDTO.getVerificationCode());
    }

    @PostMapping("verify-token")
    private ResponseEntity<?> verifyToken(@RequestBody JwtDTO jwtDTO){
        return userService.verifyToken(jwtDTO.getToken());
    }

    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody UserLoginDTO userLoginDTO) {
            try {
                Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginDTO.getUserName(), userLoginDTO.getPassWord()));
                if(authentication.isAuthenticated()){
                    String token = jwtService.generateToken(userLoginDTO.getUserName());
                    return ResponseEntity.ok(new JwtDTO(token));
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponseDTO(HttpStatus.UNAUTHORIZED.value(), "Tài khoản hoặc mật khẩu không chính xác", System.currentTimeMillis()));
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponseDTO(HttpStatus.UNAUTHORIZED.value(), "Tài khoản hoặc mật khẩu không chính xác", System.currentTimeMillis()));
            }
    }

    @PatchMapping("/update")
    private ResponseEntity<?> updateUser(@RequestBody UserUpdateDTO userUpdateDTO, @RequestHeader("Authorization") String authorizationHeader){
        return userService.updateUser(authorizationHeader, userUpdateDTO);
    }

    @PostMapping("/change-password")
    private ResponseEntity<?> changePassword(@RequestBody UserChangePasswordDTO userChangePasswordDTO, @RequestHeader("Authorization") String authorizationHeader){
        return userService.changePassword(authorizationHeader, userChangePasswordDTO);
    }

    @PostMapping("/generate-otp")
    private ResponseEntity<?> generateOTP(@RequestBody GenerateOTPDTO generateOTPDTO){
        return userService.generateOTP(generateOTPDTO.getEmail());
    }

    @GetMapping("/check-is-verified/{email}")
    private ResponseEntity<?> checkIsVerified(@PathVariable String email) {
        return userService.checkIsVerified(email);
    }

    @PostMapping("/forget-password")
    private ResponseEntity<?> forgetPassword(@RequestBody UserForgetPasswordDTO userForgetPasswordDTO) {
        return userService.forgetPassword(userForgetPasswordDTO);
    }

}
