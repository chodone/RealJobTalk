package exception.auth;

import exception.member.MemberExceptionEnum;
import lombok.Getter;

@Getter
public class AuthRuntimeException extends RuntimeException {
    private AuthExceptionEnum errorEnum;

    public AuthRuntimeException(AuthExceptionEnum errorEnum) {
        super(errorEnum.getErrorMessage());
        this.errorEnum = errorEnum;
    }
}
