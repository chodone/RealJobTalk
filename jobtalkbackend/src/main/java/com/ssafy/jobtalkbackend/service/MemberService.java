package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.request.LoginRequestDto;
import com.ssafy.jobtalkbackend.dto.request.SignUpRequestDto;
import com.ssafy.jobtalkbackend.dto.response.KakaoTokenDto;
import com.ssafy.jobtalkbackend.dto.response.TokenDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;

public interface MemberService {
    public Boolean signUp(SignUpRequestDto request);
    public ResponseEntity<TokenDto> login(LoginRequestDto request);
    public Boolean checkEmail(String email);

    public Boolean checkNickname(String nickname);

    public String modifyNickname(String nickname, User user);

}
