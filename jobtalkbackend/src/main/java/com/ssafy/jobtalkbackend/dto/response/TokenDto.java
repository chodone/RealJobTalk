package com.ssafy.jobtalkbackend.dto.response;

import lombok.Getter;

@Getter
public class TokenDto {
    private String type;
    private String accessToken;
    private String refreshToken;

    public TokenDto(String accessToken, String refreshToken) {
        this.type = "Bearer";
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
