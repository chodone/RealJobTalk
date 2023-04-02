package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.domain.Member;
import com.ssafy.jobtalkbackend.dto.request.LoginRequest;
import com.ssafy.jobtalkbackend.dto.request.SignUpRequest;
import com.ssafy.jobtalkbackend.dto.response.TokenResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;

public interface MemberService {

    Member searchMember(String email);
    Boolean signUp(SignUpRequest request);
    ResponseEntity<TokenResponse> login(LoginRequest request, boolean kakaoLogin);
    Boolean checkEmail(String email);

    Boolean checkNickname(String nickname);

    String modifyNickname(String nickname, User user);

    Boolean scrapNews(Long newsId, User user);

    Boolean scrapPassReview(Long passReviewId, User user);

}
