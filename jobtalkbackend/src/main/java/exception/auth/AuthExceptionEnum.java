package exception.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@Getter
@AllArgsConstructor
public enum AuthExceptionEnum {
    AUTH_AUTHORIZATION_EXCEPTION(HttpStatus.UNAUTHORIZED, "A0001", "Jwt EntryPoint에서 막혔습니다."), //권한 관련
    AUTH_ACCESS_EXCEPTION(HttpStatus.FORBIDDEN, "A0002", "접근 권한이 없습니다."),
    AUTH_JWT_EXPIRED_EXCEPTION(HttpStatus.UNAUTHORIZED, "A0003", "JWT 토큰이 만료됐습니다."),
    AUTH_JWT_SUPPORT_EXCEPTION(HttpStatus.UNAUTHORIZED, "A0004", "지원하지 않는 JWT 토큰 입니다."),
    AUTH_JWT_SIGNATURE_EXCEPTION(HttpStatus.UNAUTHORIZED, "A0005", "잘못된 JWT 서명입니다."),
    AUTH_SECURITY_AUTHENTICATION_EXCEPTION(HttpStatus.UNAUTHORIZED, "A0006",
            "Security UsernamePasswordAuthenticationToken 에러입니다."),
    AUTH_SECURITY_USER_NOT_EXIST(HttpStatus.FORBIDDEN, "A0007", "토큰을 통해 유저 객체를 찾을 수 없습니다.");
    ;
    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String errorMessage;

    public static Map<String, Object> convertMap(AuthExceptionEnum ex) {
        Map<String, Object> map = new HashMap<>();
        map.put("status", ex.getHttpStatus().value());
        map.put("code", ex.getErrorCode());
        map.put("message", ex.getErrorMessage());

        return map;
    }

}
