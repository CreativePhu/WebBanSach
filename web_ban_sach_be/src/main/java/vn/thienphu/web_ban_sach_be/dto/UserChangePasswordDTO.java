package vn.thienphu.web_ban_sach_be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserChangePasswordDTO {
    private String password;
    private String newPassword;
}
