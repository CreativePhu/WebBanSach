package vn.thienphu.web_ban_sach_be.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.thienphu.web_ban_sach_be.dao.*;
import vn.thienphu.web_ban_sach_be.dto.ListBookOrderDTO;
import vn.thienphu.web_ban_sach_be.dto.OrderBookDTO;
import vn.thienphu.web_ban_sach_be.model.*;
import vn.thienphu.web_ban_sach_be.model.enums.OrderStatus;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class OrderService {

    private final ShippingAddressRepository shippingAddressRepository;
    private OrderRepository orderRepository;
    private OrderDetailRepository orderDetailRepository;
    private UserRepository userRepository;
    private ProvinceRepository provinceRepository;
    private DistrictRepository districtRepository;
    private WardRepository wardRepository;
    private BookRepository bookRepository;

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
        System.out.println(orderBookDTO.toString());
        User user = userRepository.findById((long) orderBookDTO.getUserID()).orElse(null);

        Province province = provinceRepository.findById((long) orderBookDTO.getProvinceID()).get();
        District district = districtRepository.findById((long) orderBookDTO.getDistrictID()).get();
        Ward ward = wardRepository.findById((long) orderBookDTO.getWardID()).get();

        ShippingAddress shippingAddress = new ShippingAddress();
        shippingAddress.setProvince(province);
        shippingAddress.setDistrict(district);
        shippingAddress.setWard(ward);
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

        Set<ListBookOrderDTO> listBookOrder = orderBookDTO.getListBookOrder();
        List<OrderDetail> orderDetails = new ArrayList<>();
        listBookOrder.forEach(bookOrder -> {
            Book book = bookRepository.findById((long) bookOrder.getBookID()).orElse(null);

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setBook(book);
            orderDetail.setQuantity(bookOrder.getQuantity());
            orderDetail.setUnitPrice(book.getBookPrice()*bookOrder.getQuantity());
            orderDetail.setOrder(order);

            order.addOrderDetail(orderDetail);

            orderDetails.add(orderDetail);
        });

        order.setTotal(calculateTotal(orderDetails));
        orderRepository.save(order);
        shippingAddressRepository.save(shippingAddress);
        orderDetails.forEach(orderDetailRepository::save);

        return ResponseEntity.ok("Đặt hàng thành công");
    }

    private double calculateTotal(List<OrderDetail> orderDetails){
        double total = 0;
        for (OrderDetail orderDetail : orderDetails) {
            total += orderDetail.getUnitPrice();
        }
        return total;
    }
}
