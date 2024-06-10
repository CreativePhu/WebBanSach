package vn.thienphu.web_ban_sach_be.service;

public interface EmailService {

    public void sendEmail(String from, String to, String subject, String message);

}
