package com.ssafy.jobtalkbackend.controller;

import com.ssafy.jobtalkbackend.dto.response.KakaoTokenResponse;
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
    public ResponseEntity<?> getKakaoToken(@RequestBody Map<String, String> code) {
        KakaoTokenResponse kakaoTokenResponse = oAuthService.getKakaoToken(code.get("code"));

        System.out.println(kakaoTokenResponse.getAccessToken());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
