package com.ssafy.jobtalkbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NewsResponse {
    private Long id;

    private String title;

    private String content;

    private String url;

    private Integer hotRank;

    private String dateOfIssue;

    private Boolean isScrap;


}
