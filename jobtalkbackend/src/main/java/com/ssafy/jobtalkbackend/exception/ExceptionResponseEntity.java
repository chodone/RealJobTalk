package com.ssafy.jobtalkbackend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class ExceptionResponseEntity {
    private int status;
    private String code;
    private String message;

}

