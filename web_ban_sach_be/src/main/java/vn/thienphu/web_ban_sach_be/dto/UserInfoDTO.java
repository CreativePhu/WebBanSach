package vn.thienphu.web_ban_sach_be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDTO {
    private long userID;
    private String userName;
    private String fullName;
    private String phone;
    private String email;
    private boolean verified;
    private Date createdAt;
    private Date updatedAt;
}
