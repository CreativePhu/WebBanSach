package vn.thienphu.web_ban_sach_be.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import vn.thienphu.web_ban_sach_be.service.UserDTService;

import java.util.Arrays;

@Configuration
public class AuthenConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserDTService userDTService) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDTService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(configurer -> configurer
                .requestMatchers(HttpMethod.GET, EndPoint.PUBLIC_GET_ENDPOINT).permitAll()
                .requestMatchers(HttpMethod.POST, EndPoint.PUBLIC_POST_ENDPOINT).permitAll()
                .requestMatchers(HttpMethod.GET, EndPoint.ADMIN_GET_ENDPOINT).hasAuthority("ADMIN")
                .anyRequest().permitAll()
        );
        http.httpBasic(Customizer.withDefaults());
        http.cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.addAllowedOrigin(EndPoint.ALLOWED_ORIGIN);
            corsConfiguration.setAllowedMethods(Arrays.stream(EndPoint.ALLOWED_METHODS).toList());
            corsConfiguration.addAllowedHeader("*");
            return corsConfiguration;
        }));
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }
}

