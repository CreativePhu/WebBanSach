package vn.thienphu.web_ban_sach_be;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import vn.thienphu.web_ban_sach_be.dao.AuthorRepository;
import vn.thienphu.web_ban_sach_be.dao.BookRepository;
import vn.thienphu.web_ban_sach_be.dao.CategoryRepository;
import vn.thienphu.web_ban_sach_be.dao.PublisherRepository;
import vn.thienphu.web_ban_sach_be.model.Authors;
import vn.thienphu.web_ban_sach_be.model.Books;
import vn.thienphu.web_ban_sach_be.model.Categories;
import vn.thienphu.web_ban_sach_be.model.Publishers;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class WebBanSachBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebBanSachBeApplication.class, args);
	}

}
