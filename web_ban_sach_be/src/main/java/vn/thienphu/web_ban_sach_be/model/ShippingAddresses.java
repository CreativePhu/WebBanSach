package vn.thienphu.web_ban_sach_be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shipping_addresses")
public class ShippingAddresses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipping_address_id")
    private long shippingAddressID;

    @Column(name = "shipping_address", length = 100, nullable = false)
    private String shippingAddress;

    @Column(name = "shipping_city", length = 50, nullable = false)
    private String shippingCity;

    @Column(name = "shipping_state", length = 50, nullable = false)
    private String shippingState;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @OneToOne
    private Orders order;

}
