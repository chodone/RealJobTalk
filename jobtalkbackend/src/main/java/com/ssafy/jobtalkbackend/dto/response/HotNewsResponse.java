package com.ssafy.jobtalkbackend.dto.response;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HotNewsResponse {

    private Long id;

    private String title;

    private String url;

}
