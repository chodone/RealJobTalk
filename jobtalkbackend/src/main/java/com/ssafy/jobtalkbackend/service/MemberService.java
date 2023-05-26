package com.ssafy.jobtalkbackend.service;

import java.util.List;

import com.ssafy.jobtalkbackend.domain.Member;
import com.ssafy.jobtalkbackend.dto.request.LoginRequest;
import com.ssafy.jobtalkbackend.dto.request.SignUpRequest;
import com.ssafy.jobtalkbackend.dto.response.EnterpriseResponse;
import com.ssafy.jobtalkbackend.dto.response.NewsTotalResponse;
import com.ssafy.jobtalkbackend.dto.response.PassReviewTotalResponse;
import com.ssafy.jobtalkbackend.dto.response.ScrapCountResponse;
import com.ssafy.jobtalkbackend.dto.response.TokenResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;

public interface MemberService {

    Member searchMember(String email);
    Boolean signUp(SignUpRequest request);
    ResponseEntity<TokenResponse> login(LoginRequest request, boolean kakaoLogin);
    Boolean checkEmail(String email);

    ScrapCountResponse getScrapCount(User user);

    Boolean checkNickname(String nickname);

    String modifyNickname(String nickname, User user);

    NewsTotalResponse getScrapNews(Pageable pageable, User user);

    Boolean scrapNews(Long newsId, User user);

    PassReviewTotalResponse getScrapPassReview(Pageable pageable, User user);

    Boolean scrapPassReview(Long passReviewId, User user);


}
