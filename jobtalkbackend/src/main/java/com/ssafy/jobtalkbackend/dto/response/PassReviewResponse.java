package com.ssafy.jobtalkbackend.dto.response;

import lombok.Getter;

@Getter
public class PassReviewResponse {
    private Long id;
    private String title;
    private String url;
    private String dateOfIssue;

    public void updateDto(Long id, String title, String url, String dateOfIssue) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.dateOfIssue = dateOfIssue;
    }
}
