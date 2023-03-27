package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.request.LoginRequest;
import com.ssafy.jobtalkbackend.dto.request.SignUpRequest;
import com.ssafy.jobtalkbackend.dto.response.TokenResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;

public interface MemberService {
    public Boolean signUp(SignUpRequest request);
    public ResponseEntity<TokenResponse> login(LoginRequest request);
    public Boolean checkEmail(String email);

    public Boolean checkNickname(String nickname);

    public String modifyNickname(String nickname, User user);

}
