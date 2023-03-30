package com.ssafy.jobtalkbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EnterpriseResponse {
    private Long id;
    private String name;
    private String imgUrl;

}
