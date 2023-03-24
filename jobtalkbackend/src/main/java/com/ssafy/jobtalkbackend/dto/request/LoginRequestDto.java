package com.ssafy.jobtalkbackend.dto.request;

import lombok.Getter;

@Getter
public class LoginRequestDto {

    private String email;

    private String password;
}
