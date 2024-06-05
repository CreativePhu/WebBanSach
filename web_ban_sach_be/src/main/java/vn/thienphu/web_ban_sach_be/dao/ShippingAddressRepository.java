package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import vn.thienphu.web_ban_sach_be.model.ShippingAddress;

@RepositoryRestResource(path = "shipping-addresses")
public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, Long> {
}
