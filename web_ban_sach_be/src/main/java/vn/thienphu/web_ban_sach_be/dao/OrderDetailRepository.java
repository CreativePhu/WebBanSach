package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.thienphu.web_ban_sach_be.model.OrderDetails;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetails, Long> {
}