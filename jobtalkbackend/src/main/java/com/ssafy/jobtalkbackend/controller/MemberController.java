package com.ssafy.jobtalkbackend.controller;

import com.ssafy.jobtalkbackend.config.SecurityConfig;
import com.ssafy.jobtalkbackend.dto.request.LoginRequest;
import com.ssafy.jobtalkbackend.dto.request.SignUpRequest;
import com.ssafy.jobtalkbackend.dto.response.NewsTotalResponse;
import com.ssafy.jobtalkbackend.dto.response.PassReviewTotalResponse;
import com.ssafy.jobtalkbackend.dto.response.TokenResponse;
import com.ssafy.jobtalkbackend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @Value("${jwt.token-validity-in-milliseconds}")
    private int accessTokenValidityTime;

    @Value("${jwt.refresh-token-validity-in-milliseconds}")
    private int refreshTokenValidityTime;

    @PostMapping("/signup")
    public Boolean signUp(@Valid @RequestBody SignUpRequest request){
        return memberService.signUp(request);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response){
        TokenResponse tokenResponse = memberService.login(request, false);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + tokenResponse.getAccessToken());
        Cookie cookie = new Cookie("accessToken", tokenResponse.getAccessToken());
        cookie.setPath("/");
        cookie.setMaxAge(accessTokenValidityTime);
        response.addCookie(cookie);
        System.out.println(accessTokenValidityTime);

        Cookie cookie2 = new Cookie("refreshToken", tokenResponse.getRefreshToken());
        cookie2.setPath("/");
        cookie2.setMaxAge(refreshTokenValidityTime);
        response.addCookie(cookie2);
        return new ResponseEntity<TokenResponse>(tokenResponse, httpHeaders, HttpStatus.OK);
    }

    @PostMapping("/email/check")
    public Boolean checkEmail(@RequestBody Map<String, String> email) {
        return memberService.checkEmail(email.get("email"));
    }

    @PostMapping("/nickname/check")
    public Boolean checkNickname(@RequestBody Map<String, String> nickname) {
        return memberService.checkNickname(nickname.get("nickname"));
    }

    @PutMapping("/nickname/change")
    public ResponseEntity<?> changeNickname(@RequestBody Map<String, String> nickname,
                                            @AuthenticationPrincipal User user) {
        return new ResponseEntity<>(memberService.modifyNickname(nickname.get("nickname"), user), HttpStatus.OK);
    }

    @GetMapping("/scrap/news")
    public ResponseEntity<NewsTotalResponse> getScrapNews(@PageableDefault(size=5, sort="id", direction = Sort.Direction.DESC) Pageable pageable,
                                                          @AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(memberService.getScrapNews(pageable, user));
    }

    @PostMapping("/scrap/news")
    public Boolean scrapNews(@RequestBody Map<String, Long> newsId,
                         @AuthenticationPrincipal User user) {
        return memberService.scrapNews(newsId.get("newsId"), user);
    }

    @GetMapping("/scrap/pass_review")
    public ResponseEntity<PassReviewTotalResponse> getScrapPassReview(@PageableDefault(size=5, sort="id", direction = Sort.Direction.DESC) Pageable pageable,
                                                                @AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(memberService.getScrapPassReview(pageable, user));
    }

    @PostMapping("/scrap/pass_review")
    public Boolean scrapPassReview(@RequestBody Map<String, Long> passReviewId,
                                   @AuthenticationPrincipal User user) {
        return memberService.scrapPassReview(passReviewId.get("passReviewId"), user);
    }

}
