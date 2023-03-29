package com.ssafy.jobtalkbackend.exception.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MemberExceptionEnum {

    MEMBER_ACCESS_EXCEPTION(HttpStatus.FORBIDDEN, "M0001", "접근 권한이 없습니다."),
    MEMBER_EXIST_EMAIL_EXCEPTION(HttpStatus.BAD_REQUEST, "M0002", "이미 존재하는 이메일입니다."),
    MEMBER_EXIST_NICKNAME_EXCEPTION(HttpStatus.BAD_REQUEST, "M0003", "이미 존재하는 닉네임 입니다."),
    MEMBER_NOT_EXIST_EXCEPTION(HttpStatus.BAD_REQUEST, "M0004", "존재하지않는 유저입니다."),
    MEMBER_PASSWORD_EXCEPTION(HttpStatus.BAD_REQUEST, "M0005", "비밀번호를 확인해주세요."),
    MEMBER_KAKAO_EMAIL_EXCEPTION(HttpStatus.BAD_REQUEST, "M0006", "이메일 동의를 해주셔야 합니다."),
    MEMBER_NEED_KAKAO_LOGIN(HttpStatus.BAD_REQUEST, "M0007", "카카오 로그인 회원입니다.");

    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String errorMessage;
}
