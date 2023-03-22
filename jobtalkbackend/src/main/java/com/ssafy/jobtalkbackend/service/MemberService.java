package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.request.LoginRequestDto;
import com.ssafy.jobtalkbackend.dto.request.SignUpRequestDto;
import com.ssafy.jobtalkbackend.dto.response.TokenDto;
import org.springframework.http.ResponseEntity;

public interface MemberService {
    public Boolean signUp(SignUpRequestDto request);
    public ResponseEntity<TokenDto> login(LoginRequestDto request);
}
