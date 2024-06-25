package vn.thienphu.web_ban_sach_be.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.thienphu.web_ban_sach_be.dao.*;
import vn.thienphu.web_ban_sach_be.dto.ListBookOrderDTO;
import vn.thienphu.web_ban_sach_be.dto.OrderBookDTO;
import vn.thienphu.web_ban_sach_be.exception.UserException;
import vn.thienphu.web_ban_sach_be.model.*;
import vn.thienphu.web_ban_sach_be.model.enums.OrderStatus;
import vn.thienphu.web_ban_sach_be.model.enums.PaymentStatus;

import java.util.*;

@Service
public class OrderService {

    private final ShippingAddressRepository shippingAddressRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final UserRepository userRepository;
    private final ProvinceRepository provinceRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;
    private final BookRepository bookRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderDetailRepository orderDetailRepository, UserRepository userRepository, ProvinceRepository provinceRepository, DistrictRepository districtRepository, WardRepository wardRepository, BookRepository bookRepository, ShippingAddressRepository shippingAddressRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.userRepository = userRepository;
        this.provinceRepository = provinceRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.bookRepository = bookRepository;
        this.shippingAddressRepository = shippingAddressRepository;
    }

    @Transactional
    public ResponseEntity<?> createOrder(OrderBookDTO orderBookDTO) {
        User user = userRepository.findById((long) orderBookDTO.getUserID()).orElse(null);

        if(user == null && orderBookDTO.getUserID() > 0){
            throw new UserException("Người dùng với id=" + orderBookDTO.getUserID() + " không tồn tại");
        }

        Optional<Province> province = provinceRepository.findById((long) orderBookDTO.getProvinceID());
        Optional<District> district = districtRepository.findById((long) orderBookDTO.getDistrictID());
        Optional<Ward> ward = wardRepository.findById((long) orderBookDTO.getWardID());

        ShippingAddress shippingAddress = new ShippingAddress();
        shippingAddress.setProvince(province.orElseThrow(() -> new UserException("Tỉnh/Thành phố với id=" + orderBookDTO.getProvinceID() + " không tồn tại")));
        shippingAddress.setDistrict(district.orElseThrow(() -> new UserException("Quận/Huyện với id=" + orderBookDTO.getDistrictID() + " không tồn tại")));
        shippingAddress.setWard(ward.orElseThrow(() -> new UserException("Phường/Xã với id=" + orderBookDTO.getWardID() + " không tồn tại")));
        shippingAddress.setShippingAddress(orderBookDTO.getAddress());

        Order order = new Order();
        order.setOrderDate(new Date());
        order.setUser(user);
        order.setCustomerName(orderBookDTO.getCustomerName());
        order.setCustomerEmail(orderBookDTO.getCustomerEmail());
        order.setCustomerPhone(orderBookDTO.getCustomerPhone());
        order.setPaymentMethod(orderBookDTO.getPaymentMethod());
        order.setShippingAddress(shippingAddress);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);

        List<OrderDetail> orderDetails = createOrderDetails(orderBookDTO.getListBookOrder(), order);

        order.setTotal(calculateTotal(orderDetails));
        orderRepository.save(order);
        shippingAddressRepository.save(shippingAddress);
        orderDetailRepository.saveAll(orderDetails);

        return ResponseEntity.ok("Đặt hàng thành công");
    }

    private double calculateTotal(List<OrderDetail> orderDetails){
        double total = 0;
        for (OrderDetail orderDetail : orderDetails) {
            total += orderDetail.getUnitPrice();
        }
        return total;
    }

    private List<OrderDetail> createOrderDetails(Set<ListBookOrderDTO> listBookOrder, Order order) {
        List<OrderDetail> orderDetails = new ArrayList<>();
        listBookOrder.forEach(bookOrder -> {
            Book book = bookRepository.findById(bookOrder.getBookID()).orElse(null);

            if(book == null){
                throw new UserException("Sách với id=" + bookOrder.getBookID() + " không tồn tại");
            }

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setBook(book);
            orderDetail.setQuantity(bookOrder.getQuantity());
            orderDetail.setUnitPrice(book.getBookPrice()*bookOrder.getQuantity());
            orderDetail.setOrder(order);

            order.addOrderDetail(orderDetail);
            orderDetails.add(orderDetail);
        });
        return orderDetails;
    }
}
