package vn.thienphu.web_ban_sach_be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.thienphu.web_ban_sach_be.model.enums.PaymentMethod;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderBookDTO {
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private int userID;
    private PaymentMethod paymentMethod;
    private int provinceID;
    private int districtID;
    private int wardID;
    private String address;
    private Set<ListBookOrderDTO> listBookOrder;
}
