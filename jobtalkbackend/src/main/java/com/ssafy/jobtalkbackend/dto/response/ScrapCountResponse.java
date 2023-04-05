package com.ssafy.jobtalkbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ScrapCountResponse {

    private String email;

    private String nickname;

    private Long scrapNewsCount;

    private Long scrapPassReviewCount;

}
