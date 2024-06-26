package vn.thienphu.web_ban_sach_be.config;

import java.util.List;

public class EndPoint {

    public static final String ALLOWED_ORIGIN = "http://localhost:3000";

    public static final String[] PUBLIC_GET_ENDPOINT = {
            "/books",
            "/book-images",
            "/categories",
            "/discounts",
            "/publishers",
            "/reviews",
            "/districts",
            "/provinces",
            "/wards",
            "/orders",
            "/order-book",
    };

    public static final String[] PUBLIC_POST_ENDPOINT = {
            "/users/register",
            "/users/verify",
            "/users/verify/token",
            "/users/login",
            "/orders",
    };

    public static final String[] USER_PUT_ENDPOINT = {
            "/users/**",
    };

    public static final String[] USER_POST_ENDPOINT = {
            "/users/generate-otp",
    };

    public static final String[] ADMIN_GET_ENDPOINT = {
            "/users"
    };

    public static final String[] ALLOWED_METHODS = {
            "GET",
            "POST",
            "PUT",
            "DELETE"
    };
}
