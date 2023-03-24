package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.response.KakaoTokenResponse;
import com.ssafy.jobtalkbackend.dto.response.KakaoUserInfoResponse;
import com.ssafy.jobtalkbackend.dto.response.TokenResponse;
import org.springframework.http.ResponseEntity;

public interface OAuthService {
    public KakaoTokenResponse getKakaoToken(String code);

    public KakaoUserInfoResponse getKakaoUser(String accessToken);

    public ResponseEntity<TokenResponse> joinOrLogin(KakaoUserInfoResponse kakaoUserInfoResponse);

}
