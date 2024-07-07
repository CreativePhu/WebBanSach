package vn.thienphu.web_ban_sach_be.config;

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
            "/order-book",
            "/users/generate-otp",
    };

    public static final String[] PUBLIC_POST_ENDPOINT = {
            "/users/register",
            "/users/verify",
            "/users/verify/token",
            "/users/login",
            "/users/forgot-password",
            "/orders",
    };

    public static final String[] USER_PATCH_ENDPOINT = {
            "/users/update",
    };

    public static final String[] USER_POST_ENDPOINT = {
            "/users/check-is-verified/**",
            "/users/change-password",
    };

    public static final String[] USER_GET_ENDPOINT = {
            "/orders",
    };

    public static final String[] ADMIN_GET_ENDPOINT = {
            "/users"
    };

    public static final String[] ALLOWED_METHODS = {
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "PATCH"
    };
}
