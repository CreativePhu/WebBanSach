package vn.thienphu.web_ban_sach_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.thienphu.web_ban_sach_be.model.ShippingAddresses;

@Repository
public interface ShippingAddressRepository extends JpaRepository<ShippingAddresses, Long> {
}
