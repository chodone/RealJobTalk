package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.response.KakaoTokenResponse;

public interface OAuthService {
    public KakaoTokenResponse getKakaoToken(String code);

}
