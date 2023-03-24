package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.response.KakaoTokenDto;

public interface OAuthService {
    public KakaoTokenDto getKakaoToken(String code);

}
