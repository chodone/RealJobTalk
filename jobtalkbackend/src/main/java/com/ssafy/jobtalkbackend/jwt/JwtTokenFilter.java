package com.ssafy.jobtalkbackend.jwt;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtTokenFilter extends OncePerRequestFilter {
    private JwtTokenProvider jwtTokenProvider;

    @Value("${jwt.secret}")
    private String secret_key;
    @Value("${jwt.token-validity-in-milliseconds}")
    private int accessTokenValidityTime;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain

    ) throws ServletException, IOException {

        String accessToken = null;
        String refreshToken = null;

        try {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("accessToken".equals(cookie.getName())) {
                        accessToken = cookie.getValue();
                    }
                    if ("refreshToken".equals(cookie.getName())) {
                        refreshToken = cookie.getValue();
                    }
                }
            }
        } catch (Exception ex) {
            throw new RuntimeException("JwtFilter -> get Cookies error");
        }

        if (refreshToken != null) {
            if (accessToken != null) {
                if (jwtTokenProvider.validateToken(accessToken)) {
                    Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } else {
                if (jwtTokenProvider.validateToken(refreshToken)) {
                    Claims claims = Jwts.parser().setSigningKey(secret_key).parseClaimsJws(refreshToken).getBody();
                    String newAccessToken = jwtTokenProvider.createAccessToken(claims);
                    response.setHeader("Authorization", "Bearer " + newAccessToken);

                    Cookie cookie = new Cookie("accessToken", newAccessToken);
                    cookie.setPath("/");
                    cookie.setMaxAge(accessTokenValidityTime);
                    response.addCookie(cookie);

                    Authentication authentication = jwtTokenProvider.getAuthentication(newAccessToken);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}