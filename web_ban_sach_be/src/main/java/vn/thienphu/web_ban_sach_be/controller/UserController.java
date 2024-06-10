package vn.thienphu.web_ban_sach_be.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.thienphu.web_ban_sach_be.dto.UserRegisterDTO;
import vn.thienphu.web_ban_sach_be.dto.UserVerifyDTO;
import vn.thienphu.web_ban_sach_be.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    private ResponseEntity<?> UserRegister(@RequestBody UserRegisterDTO userRegisterDTO) {
        return userService.UserRegister(userRegisterDTO);
    }

    @PostMapping("/verify")
    private ResponseEntity<?> verifyUser(@RequestBody UserVerifyDTO userVerifyDTO) {
        return userService.verifyUser(userVerifyDTO.getEmail(), userVerifyDTO.getVerificationCode());
    }

}
