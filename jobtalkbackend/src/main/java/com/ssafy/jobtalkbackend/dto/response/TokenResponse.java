package com.ssafy.jobtalkbackend.dto.response;

import lombok.Getter;

@Getter
public class TokenResponse {
    private String type;
    private String accessToken;
    private String refreshToken;

    public TokenResponse(String accessToken, String refreshToken) {
        this.type = "Bearer";
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
