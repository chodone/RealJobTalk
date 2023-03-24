package com.ssafy.jobtalkbackend.dto.response;

import lombok.Getter;

@Getter
public class KakaoTokenDto {

    private String accessToken;

    private String refreshToken;
}
