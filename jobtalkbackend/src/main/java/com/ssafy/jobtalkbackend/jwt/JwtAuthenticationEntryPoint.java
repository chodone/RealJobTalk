package com.ssafy.jobtalkbackend.jwt;

import java.io.IOException;
import java.io.OutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import exception.auth.AuthExceptionEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * AuthenticationEntryPoint

 * 인증 과정에서 실패하거나 인증을 위한 헤더정보를 보내지 않은 경우
 * 401(UnAuthorized) 에러가 발생하게 된다.
 *
 * Spring Security에서 인증되지 않은 사용자에 대한 접근 처리는 AuthenticationEntryPoint가 담당하는데,
 * commence 메소드가 실행되어 처리된다.
 */

@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException e
    ) throws IOException {
        response.setStatus(AuthExceptionEnum.AUTH_AUTHORIZATION_EXCEPTION.getHttpStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        try (OutputStream os = response.getOutputStream()) {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(os,
                    AuthExceptionEnum.convertMap(AuthExceptionEnum.AUTH_AUTHORIZATION_EXCEPTION));
            os.flush();
        }
    }

}
