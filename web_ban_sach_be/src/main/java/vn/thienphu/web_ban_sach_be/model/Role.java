package vn.thienphu.web_ban_sach_be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private long roleID;

    @Column(name = "role_name", length = 50, nullable = false, unique = true)
    private String roleName;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;

    public void addUser(User user) {
        if(users == null) {
            users = new ArrayList<>();
            users.add(user);
        }else{
            users.add(user);
        }
    }
}
