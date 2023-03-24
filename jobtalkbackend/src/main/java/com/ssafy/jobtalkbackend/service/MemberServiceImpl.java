package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.domain.Member;
import com.ssafy.jobtalkbackend.domain.Role;
import com.ssafy.jobtalkbackend.dto.request.LoginRequestDto;
import com.ssafy.jobtalkbackend.dto.request.SignUpRequestDto;
import com.ssafy.jobtalkbackend.dto.response.KakaoTokenDto;
import com.ssafy.jobtalkbackend.dto.response.TokenDto;
import com.ssafy.jobtalkbackend.jwt.JwtTokenProvider;
import com.ssafy.jobtalkbackend.repository.MemberRepository;
import com.ssafy.jobtalkbackend.exception.member.MemberExceptionEnum;
import com.ssafy.jobtalkbackend.exception.member.MemberRuntimeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    @Override
    public Boolean signUp(SignUpRequestDto request){
        if (memberRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new MemberRuntimeException(MemberExceptionEnum.MEMBER_EXIST_EMAIL_EXCEPTION);
        }

        if (memberRepository.findByNickname(request.getNickname()).isPresent()) {
            throw new MemberRuntimeException(MemberExceptionEnum.MEMBER_EXIST_NICKNAME_EXCEPTION);
        }

        Member member = Member.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .role(Role.ROLE_USER)
                .build();

        memberRepository.save(member);

        return true;
    }

    @Override
    @Transactional
    public ResponseEntity<TokenDto> login(LoginRequestDto request) {

        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));
        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new MemberRuntimeException(MemberExceptionEnum.MEMBER_PASSWORD_EXCEPTION);
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        TokenDto tokenDto = jwtTokenProvider.createToken(authentication);

        return new ResponseEntity<>(tokenDto, HttpStatus.OK);
    }

    @Override
    public Boolean checkEmail(String email) {
        if (memberRepository.findByEmail(email).isPresent()) {
            throw new MemberRuntimeException(MemberExceptionEnum.MEMBER_EXIST_EMAIL_EXCEPTION);
        }
        return true;
    }

    @Override
    public Boolean checkNickname(String nickname) {
        if (memberRepository.findByNickname(nickname).isPresent()) {
            throw new MemberRuntimeException(MemberExceptionEnum.MEMBER_EXIST_NICKNAME_EXCEPTION);
        }
        return true;
    }

    @Transactional
    @Override
    public String modifyNickname(String nickname, User user) {
        Member member = memberRepository.findByEmail(String.valueOf(user.getUsername())).orElse(null);
        checkNickname(nickname);
        member.modifyNickname(nickname);
        return nickname;
    }


}
