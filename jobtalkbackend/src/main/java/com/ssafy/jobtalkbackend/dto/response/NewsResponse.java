package com.ssafy.jobtalkbackend.dto.response;

import lombok.Getter;

@Getter
public class NewsResponse {
    private Long id;

    private String title;

    private String url;

    private Integer hotRank;

    private String dateOfIssue;

    public void updateDto(Long id, String title, String url, Integer hotRank, String dateOfIssue) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.hotRank = hotRank;
        this.dateOfIssue = dateOfIssue;
    }
}
