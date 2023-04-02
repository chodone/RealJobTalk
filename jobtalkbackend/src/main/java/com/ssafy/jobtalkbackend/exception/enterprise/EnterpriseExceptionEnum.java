package com.ssafy.jobtalkbackend.exception.enterprise;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum EnterpriseExceptionEnum {

    ENTERPRISE_EXIST_EXCEPTION(HttpStatus.FORBIDDEN, "E0001", "해당 기업이 존재하지 않습니다."),
    ENTERPRISE_NEWS_NOT_EXIST_EXCEPTION(HttpStatus.BAD_REQUEST, "E0002", "해당 뉴스가 존재하지 않습니다."),
    ENTERPRISE_PASSREVIEW_NOT_EXIST_EXCEPTION(HttpStatus.BAD_REQUEST, "E0003", "해당 합격후기가 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String errorMessage;
}
