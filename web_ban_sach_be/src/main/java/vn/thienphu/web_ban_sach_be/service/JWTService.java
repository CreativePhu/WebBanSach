package vn.thienphu.web_ban_sach_be.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import vn.thienphu.web_ban_sach_be.dao.UserRepository;
import vn.thienphu.web_ban_sach_be.model.Role;
import vn.thienphu.web_ban_sach_be.model.User;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTService {

    private static final String SECRET = "LKJSLJKEKJFSDOIFJALKWJELASKJDFLASJEOIFJASLDFALKSEOIJLKADJSFOKAWENDF";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;
    private final UserRepository userRepository;

    @Autowired
    public JWTService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        User user = userRepository.findByUserName(username);
        boolean isAdmin = false;
        boolean isUser = false;

        if(user != null && !user.getRoles().isEmpty()){
            for (Role role : user.getRoles()) {
                if(role.getRoleName().equals("ROLE_ADMIN")){
                    isAdmin = true;
                }
                if(role.getRoleName().equals("ROLE_USER")){
                    isUser = true;
                }
            }
        }

        claims.put("isAdmin", isAdmin);
        claims.put("isUser", isUser);

        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String username) {
        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(hmacShaKeyFor(SECRET))
                .compact();
    }

    private Key hmacShaKeyFor(String secret) {
        byte[] bytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(bytes);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(hmacShaKeyFor(SECRET)).build().parseClaimsJws(token).getBody();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
