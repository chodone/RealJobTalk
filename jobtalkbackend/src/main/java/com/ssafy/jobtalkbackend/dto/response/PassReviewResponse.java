package com.ssafy.jobtalkbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PassReviewResponse {

    private Long id;

    private String title;

    private String url;

    private String dateOfIssue;

    private Boolean isScrap;

}
