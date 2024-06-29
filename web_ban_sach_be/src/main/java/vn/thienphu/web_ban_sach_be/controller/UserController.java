package vn.thienphu.web_ban_sach_be.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JWTService jwtService;

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
    private ResponseEntity<?> verifyToken(@RequestBody JwtDTO jwtDTO) {
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
                return ResponseEntity.badRequest().body("Tài khoản hoặc mật khẩu không chính xác");
            }catch (Exception e){
                return ResponseEntity.badRequest().body("Lỗi đăng nhập");
            }
    }

    @PutMapping("/{username}/update")
    private ResponseEntity<?> updateUser(@PathVariable String username ,@RequestBody UserUpdateDTO userUpdateDTO) {
        return userService.updateUser(username, userUpdateDTO);
    }

}
