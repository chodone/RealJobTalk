package com.ssafy.jobtalkbackend.controller;

import com.ssafy.jobtalkbackend.dto.request.LoginRequestDto;
import com.ssafy.jobtalkbackend.dto.request.SignUpRequestDto;
import com.ssafy.jobtalkbackend.dto.response.TokenDto;
import com.ssafy.jobtalkbackend.repository.MemberRepository;
import com.ssafy.jobtalkbackend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @PostMapping("/signup")
    public Boolean signUp(@Valid @RequestBody SignUpRequestDto request){
        return memberService.signUp(request);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@Valid @RequestBody LoginRequestDto request){
        return memberService.login(request);
    }
}
