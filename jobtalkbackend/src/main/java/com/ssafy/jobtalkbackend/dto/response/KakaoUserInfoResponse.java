package com.ssafy.jobtalkbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoUserInfoResponse {

    private Long id;
    private String email;
    private String nickname;
    private String profileImg;
}
