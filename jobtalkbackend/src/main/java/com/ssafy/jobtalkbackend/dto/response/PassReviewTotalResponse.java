package com.ssafy.jobtalkbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PassReviewTotalResponse {

    private int totalPages;

    private List<PassReviewResponse> passReviewResponseList;
}
