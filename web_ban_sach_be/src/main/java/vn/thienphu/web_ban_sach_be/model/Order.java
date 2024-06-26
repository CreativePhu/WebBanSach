package vn.thienphu.web_ban_sach_be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.thienphu.web_ban_sach_be.model.enums.OrderStatus;
import vn.thienphu.web_ban_sach_be.model.enums.PaymentMethod;
import vn.thienphu.web_ban_sach_be.model.enums.PaymentStatus;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private long orderID;

    @Column(name = "order_date", nullable = false)
    private Date orderDate;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "customer_email", nullable = false)
    private String customerEmail;

    @Column(name = "customer_phone", nullable = false)
    private String customerPhone;

    @Column(name = "total", nullable = false)
    private double total;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", length = 50, nullable = false)
    private OrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", length = 50, nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", length = 50, nullable = false)
    private PaymentStatus paymentStatus;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "shipping_address_id")
    private ShippingAddress shippingAddress;

    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetails;

    public void addOrderDetail(OrderDetail orderDetail) {
        if(orderDetails == null) {
            orderDetails = new ArrayList<>();
            orderDetails.add(orderDetail);
        }else {
            orderDetails.add(orderDetail);
        }
    }
}
