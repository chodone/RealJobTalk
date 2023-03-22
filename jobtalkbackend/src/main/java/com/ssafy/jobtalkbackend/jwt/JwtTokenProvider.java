package com.ssafy.jobtalkbackend.jwt;

import com.ssafy.jobtalkbackend.dto.response.TokenDto;
import exception.auth.AuthExceptionEnum;
import exception.auth.AuthRuntimeException;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String secret_key;

    @Value("${jwt.token-validity-in-milliseconds}")
    private long accessTokenValidityTime;

    @Value("${jwt.refresh-token-validity-in-milliseconds}")
    private long refreshTokenValidityTime;

    @Autowired
    private UserDetailsService userDetailsService;

    public TokenDto createToken(Authentication authentication) {

        Claims claims = Jwts.claims().setSubject(authentication.getName());

        Date now = new Date();
        Date expiresIn = new Date(now.getTime() + refreshTokenValidityTime);

        String accessToken = createAccessToken(claims);

        String refreshToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiresIn)
                .signWith(SignatureAlgorithm.HS512, secret_key)
                .compact();

        return new TokenDto(accessToken, refreshToken);
    }

    public String createAccessToken(Claims claims) {

        Date now = new Date();
        Date expiresIn = new Date(now.getTime() + accessTokenValidityTime);

        String accessToken =  Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiresIn)
                .signWith(SignatureAlgorithm.HS512, secret_key)
                .compact();

        return accessToken;
    }

    public Authentication getAuthentication(String token) {
        String username = Jwts.parser().setSigningKey(secret_key).parseClaimsJws(token).getBody().getSubject();
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret_key).parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
            throw new AuthRuntimeException(AuthExceptionEnum.AUTH_JWT_SIGNATURE_EXCEPTION);
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
            throw new AuthRuntimeException(AuthExceptionEnum.AUTH_JWT_EXPIRED_EXCEPTION);
        } catch (UnsupportedJwtException e) {
            log.info("지원하지 않는 JWT토큰입니다.");
            throw new AuthRuntimeException(AuthExceptionEnum.AUTH_JWT_SUPPORT_EXCEPTION);
        } catch (IllegalArgumentException e) {
            log.info("JWT토큰이 잘못되었습니다.");
            throw new AuthRuntimeException(AuthExceptionEnum.AUTH_JWT_SIGNATURE_EXCEPTION);
        }

    }
}
