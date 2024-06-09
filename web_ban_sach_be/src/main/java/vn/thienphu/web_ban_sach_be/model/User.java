package vn.thienphu.web_ban_sach_be.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    public User(long userID, String userName, String password, String fullName, String phone, String email, Date createdAt, Date updatedAt) {
        this.userID = userID;
        this.userName = userName;
        this.password = password;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userID;

    @Column(name = "user_name", length = 100, nullable = false, unique = true)
    private String userName;

    @Column(name = "password", length = 150, nullable = false)
    private String password;

    @Column(name = "full_name", length = 150, nullable = false)
    private String fullName;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name = "created_at", length = 255, nullable = false)
    private Date createdAt;

    @Column(name = "updated_at", length = 255, nullable = false)
    private Date updatedAt;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles;

    @OneToMany(mappedBy = "user")
    private List<ShippingAddress> shippingAddresses;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @OneToMany(mappedBy = "user")
    private List<Review> reviews;

    public void addRole(Role role) {
        if(roles == null) {
            roles = new ArrayList<>();
            roles.add(role);
        }else{
            roles.add(role);
        }
    }

}
