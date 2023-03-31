package com.ssafy.jobtalkbackend.exception.enterprise;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum EnterpriseExceptionEnum {

    ENTERPRISE_EXIST_EXCEPTION(HttpStatus.FORBIDDEN, "E0001", "해당 기업이 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String errorMessage;
}
