package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.request.LoginRequest;
import com.ssafy.jobtalkbackend.dto.response.KakaoTokenResponse;
import com.ssafy.jobtalkbackend.dto.response.KakaoUserInfoResponse;
import com.ssafy.jobtalkbackend.dto.response.TokenResponse;
import org.springframework.http.ResponseEntity;

public interface OAuthService {
    KakaoTokenResponse getKakaoToken(String code);

    KakaoUserInfoResponse getKakaoUser(String accessToken);

    ResponseEntity<TokenResponse> joinOrLogin(KakaoUserInfoResponse kakaoUserInfoResponse);


}
