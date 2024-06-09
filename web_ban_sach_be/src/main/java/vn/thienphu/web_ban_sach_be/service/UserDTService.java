package vn.thienphu.web_ban_sach_be.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import vn.thienphu.web_ban_sach_be.model.User;

public interface UserDTService extends UserDetailsService {

    public User findByUserName(String username);

}
