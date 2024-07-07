package vn.thienphu.web_ban_sach_be.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.thienphu.web_ban_sach_be.dto.OrderBookDTO;
import vn.thienphu.web_ban_sach_be.service.OrderService;

@RestController
@RequestMapping("/order-book")
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderBookDTO orderBookDTO) {
        return orderService.createOrder(orderBookDTO);
    }
}
