package com.ssafy.jobtalkbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class NewsTotalResponse {
    private int totalPages;

    private List<NewsResponse> newsResponseList;
}
