package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestBody;
import vn.thienphu.web_ban_sach_be.model.Order;

@RepositoryRestResource(path = "orders")
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findOrdersByUser_UserName(@RequestBody String userName, Pageable pageable);
}
