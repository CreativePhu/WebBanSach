package vn.thienphu.web_ban_sach_be.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_detail_id")
    private long oderDetailID;

    @Column(name = "unit_price", columnDefinition = "double default 1000.0")
    private double unitPrice;

    @Column(name = "quantity", columnDefinition = "int default 1")
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
}
