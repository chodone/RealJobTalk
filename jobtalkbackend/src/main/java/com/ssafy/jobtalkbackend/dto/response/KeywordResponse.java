package com.ssafy.jobtalkbackend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KeywordResponse {

	private Long id;

	private String name;

	private Long count;
}
