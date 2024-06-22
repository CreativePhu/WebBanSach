package vn.thienphu.web_ban_sach_be.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.thienphu.web_ban_sach_be.dao.UserRepository;
import vn.thienphu.web_ban_sach_be.model.Role;
import vn.thienphu.web_ban_sach_be.model.User;
import vn.thienphu.web_ban_sach_be.service.UserDTService;

import java.util.Collection;
import java.util.List;

@Service
public class UserDTImp implements UserDTService {

    private final UserRepository userRepository;

    @Autowired
    public UserDTImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByUserName(String username) {
        return userRepository.findByUserName(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException("Không tìm thấy tài khoản");
        }
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), getAuthorities(user.getRoles()));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(List<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getRoleName())).collect(java.util.stream.Collectors.toList());
    }
}
