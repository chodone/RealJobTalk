package com.ssafy.jobtalkbackend.dto.response;

import java.util.List;

import com.ssafy.jobtalkbackend.domain.Keyword;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EnterpriseDetailResponse {
    private Long id;

    private String name;

    private String imgUrl;

    private String homepageUrl;

    private String recruitpageUrl;

    private String blogUrl;

    private String youtubeUrl;

    private String businessInformation;

    private String idealTalent;

}
