package com.ssafy.jobtalkbackend.controller;

import com.ssafy.jobtalkbackend.dto.request.LoginRequestDto;
import com.ssafy.jobtalkbackend.dto.request.SignUpRequestDto;
import com.ssafy.jobtalkbackend.dto.response.TokenDto;
import com.ssafy.jobtalkbackend.repository.MemberRepository;
import com.ssafy.jobtalkbackend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

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
    @GetMapping("/test")
    public String test() {
        return "hello";
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

}
