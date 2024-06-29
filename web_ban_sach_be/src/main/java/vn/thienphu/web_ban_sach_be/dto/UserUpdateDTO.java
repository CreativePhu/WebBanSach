package vn.thienphu.web_ban_sach_be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {
    private String fullName;
    private String phoneNumber;
    private String email;
}
