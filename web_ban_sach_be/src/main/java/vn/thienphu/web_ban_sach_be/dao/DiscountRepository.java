package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import vn.thienphu.web_ban_sach_be.model.Discount;

@RepositoryRestResource(path = "discounts")
public interface DiscountRepository extends JpaRepository<Discount, Long>{
}
