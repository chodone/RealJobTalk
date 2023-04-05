package com.ssafy.jobtalkbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KeywordResponse {

	private String name;

	private Long count;
}
