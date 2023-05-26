package com.ssafy.jobtalkbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HotPassReviewResponse {

    private Long id;

    private String title;

    private String url;

    private Integer count;

    private Boolean isScrap;

}
