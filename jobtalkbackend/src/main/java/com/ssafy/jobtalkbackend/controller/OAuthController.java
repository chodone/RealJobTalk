package com.ssafy.jobtalkbackend.controller;

import com.ssafy.jobtalkbackend.dto.response.KakaoTokenResponse;
import com.ssafy.jobtalkbackend.dto.response.KakaoUserInfoResponse;
import com.ssafy.jobtalkbackend.dto.response.TokenResponse;
import com.ssafy.jobtalkbackend.service.OAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/kakao")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;
    @Value("${jwt.token-validity-in-milliseconds}")
    private int accessTokenValidityTime;

    @Value("${jwt.refresh-token-validity-in-milliseconds}")
    private int refreshTokenValidityTime;

    @PostMapping("/callback")
    public ResponseEntity<TokenResponse> getKakao(@RequestBody Map<String, String> code, HttpServletResponse response) {
        KakaoTokenResponse kakaoTokenResponse = oAuthService.getKakaoToken(code.get("code"));
        KakaoUserInfoResponse kakaoUserInfoResponse = oAuthService.getKakaoUser(kakaoTokenResponse.getAccessToken());
        TokenResponse tokenResponse = oAuthService.joinOrLogin(kakaoUserInfoResponse);

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + tokenResponse.getAccessToken());
        Cookie cookie = new Cookie("accessToken", tokenResponse.getAccessToken());
        cookie.setPath("/");
        cookie.setMaxAge(accessTokenValidityTime);
        response.addCookie(cookie);

        Cookie cookie2 = new Cookie("refreshToken", tokenResponse.getRefreshToken());
        cookie2.setPath("/");
        cookie2.setMaxAge(refreshTokenValidityTime);
        response.addCookie(cookie2);

        return new ResponseEntity<TokenResponse>(tokenResponse, httpHeaders, HttpStatus.OK);
    }
}
