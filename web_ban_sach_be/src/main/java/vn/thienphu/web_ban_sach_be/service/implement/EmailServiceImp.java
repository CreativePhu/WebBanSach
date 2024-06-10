package vn.thienphu.web_ban_sach_be.service.implement;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import vn.thienphu.web_ban_sach_be.service.EmailService;

@Service
public class EmailServiceImp implements EmailService {

    private JavaMailSender javaMailSender;

    @Autowired
    public EmailServiceImp(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendEmail(String from, String to, String subject, String verificationCode) {
        try {
            MimeMessage mail = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            String content = "<h1>Fahasha - Xác thực tài khoản</h1>"
                    + "<p>Mã xác thực của bạn là: <b>" + verificationCode + "</b></p>";
            helper.setText(content, true);
            javaMailSender.send(mail);
            System.out.println("Email sent successfully to email: " + to);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
