package vn.thienphu.web_ban_sach_be.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.thienphu.web_ban_sach_be.dto.UserRegisterDTO;
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

}
