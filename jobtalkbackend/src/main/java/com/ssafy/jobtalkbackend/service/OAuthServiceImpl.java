package com.ssafy.jobtalkbackend.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import com.ssafy.jobtalkbackend.domain.Member;
import com.ssafy.jobtalkbackend.domain.Role;
import com.ssafy.jobtalkbackend.dto.request.LoginRequest;
import com.ssafy.jobtalkbackend.dto.response.KakaoUserInfoResponse;
import com.ssafy.jobtalkbackend.dto.response.TokenResponse;
import com.ssafy.jobtalkbackend.exception.member.MemberExceptionEnum;
import com.ssafy.jobtalkbackend.exception.member.MemberRuntimeException;
import com.ssafy.jobtalkbackend.jwt.JwtTokenProvider;
import com.ssafy.jobtalkbackend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.jobtalkbackend.dto.response.KakaoTokenResponse;
import com.ssafy.jobtalkbackend.exception.auth.AuthExceptionEnum;
import com.ssafy.jobtalkbackend.exception.auth.AuthRuntimeException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OAuthServiceImpl implements OAuthService {

    private final MemberRepository memberRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;

    private final PasswordEncoder passwordEncoder;

    @Value("${kakao.client-id}")
    private String API_KEY;

    @Value("${kakao.redirect-uri}")
    private String REDIRECT_URI;

    @Value("{kakao.jobtalk-key}")
    private String JOBTALK_KEY;

    private String tokenReqURL = "https://kauth.kakao.com/oauth/token";

    private String userReqUrl = "https://kapi.kakao.com/v2/user/me";

    /*
     * @author 정민지
     * @version 1.0, kakao token 가져오는 메소드 생성
     * @param string 카카오 로그인 코드
     * @return KakaoTokenResponse
     * @exception post 연결 실패 시
     * */
    @Override
    public KakaoTokenResponse getKakaoToken(String code) {

        try {
            URL url = new URL(tokenReqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + API_KEY);
            sb.append("&redirect_uri=" + REDIRECT_URI);
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.info("토큰 가져올 때 responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            br.close();
            bw.close();

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            return KakaoTokenResponse.builder()
                    .accessToken(element.getAsJsonObject().get("access_token").getAsString())
                    .refreshToken(element.getAsJsonObject().get("refresh_token").getAsString())
                    .build();

        } catch (IOException e) {
            throw new AuthRuntimeException(AuthExceptionEnum.AUTH_KAKAO_ACCESSTOKEN_FAILED);
        }
    }

    @Override
    public KakaoUserInfoResponse getKakaoUser(String accessToken) {
        String email = "";
        try {
            URL url = new URL(userReqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.info("유저 정보 가져올 때 responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            log.info("response body : " + result);

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            long id = element.getAsJsonObject().get("id").getAsLong();
            String nickname = element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
            String profileImg = element.getAsJsonObject().get("properties").getAsJsonObject().get("profile_image").getAsString();
            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
            if (hasEmail) {
                email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
            } else {
                throw new MemberRuntimeException(MemberExceptionEnum.MEMBER_KAKAO_EMAIL_EXCEPTION);
            }

            br.close();
            return KakaoUserInfoResponse.builder()
                    .id(id)
                    .email(email)
                    .nickname(nickname)
                    .profileImg(profileImg)
                    .build();

        } catch (IOException e) {
            throw new AuthRuntimeException(AuthExceptionEnum.AUTH_KAKAO_ACCESSTOKEN_FAILED);
        }
//        return null;
    }

    @Override
    @Transactional
    public ResponseEntity<TokenResponse> joinOrLogin(KakaoUserInfoResponse kakaoUserInfoResponse) {
        Member joinMember = memberRepository.findByOauthId(kakaoUserInfoResponse.getId()).orElse(null);
        if (joinMember == null) {
            Member member = Member
                    .builder()
                    .email(kakaoUserInfoResponse.getEmail())
                    .password(passwordEncoder.encode(JOBTALK_KEY))
                    .nickname(kakaoUserInfoResponse.getNickname())
                    .role(Role.ROLE_USER)
                    .oauthId(kakaoUserInfoResponse.getId())
                    .build();
            memberRepository.save(member);

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(member.getEmail(), JOBTALK_KEY)
            );
            TokenResponse tokenResponse = jwtTokenProvider.createToken(authentication);

            return new ResponseEntity<>(tokenResponse, HttpStatus.OK);
        } else {
            LoginRequest loginRequest = LoginRequest
                    .builder()
                    .email(joinMember.getEmail())
                    .password(JOBTALK_KEY)
                    .build();

            return memberService.login(loginRequest, true);
        }


    }
}
