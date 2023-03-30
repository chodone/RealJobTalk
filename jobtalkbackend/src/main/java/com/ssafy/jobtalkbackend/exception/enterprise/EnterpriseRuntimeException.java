package com.ssafy.jobtalkbackend.exception.enterprise;

import lombok.Getter;

@Getter
public class EnterpriseRuntimeException extends RuntimeException{
    private EnterpriseExceptionEnum errorEnum;

    public EnterpriseRuntimeException(EnterpriseExceptionEnum errorEnum) {
        super(errorEnum.getErrorMessage());
        this.errorEnum = errorEnum;
    }
}
