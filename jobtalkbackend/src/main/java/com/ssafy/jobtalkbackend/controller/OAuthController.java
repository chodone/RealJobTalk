package com.ssafy.jobtalkbackend.controller;

import com.ssafy.jobtalkbackend.dto.response.KakaoTokenDto;
import com.ssafy.jobtalkbackend.service.MemberService;
import com.ssafy.jobtalkbackend.service.OAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/kakao")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;

    @PostMapping("/callback")
    public ResponseEntity<?> test(@RequestBody Map<String, String> code) {
        KakaoTokenDto kakaoTokenDto = oAuthService.getKakaoToken(code.get("code"));


        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
