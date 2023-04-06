package com.ssafy.jobtalkbackend.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ScrapCountResponse {

    private String email;

    private String nickname;

    private Long scrapNewsCount;

    private Long scrapPassReviewCount;

    private List<EnterpriseResponse> recommendEnterpriseResponses;

}
