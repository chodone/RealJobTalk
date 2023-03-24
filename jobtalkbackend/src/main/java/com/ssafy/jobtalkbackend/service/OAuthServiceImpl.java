package com.ssafy.jobtalkbackend.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.security.auth.message.AuthException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.jobtalkbackend.dto.response.KakaoTokenResponse;
import com.ssafy.jobtalkbackend.exception.auth.AuthExceptionEnum;
import com.ssafy.jobtalkbackend.exception.auth.AuthRuntimeException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService{

    @Value("${kakao.client-id}")
    private String API_KEY;

    @Value("${kakao.redirect-uri}")
    private String REDIRECT_URI;

    private String tokenReqURL = "https://kauth.kakao.com/oauth/token";

    /*
    * @author 정민지
    * @version 1.0, kakao token 가져오는 메소드 생성
    * @param string 카카오 로그인 코드
    * @return KakaoTokenResponse
    * @exception post 연결 실패 시
     * */
    @Override
    public KakaoTokenResponse getKakaoToken(String code) {
        try{
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

        }catch (IOException e) {
            throw new AuthRuntimeException(AuthExceptionEnum.AUTH_KAKAO_ACCESSTOKEN_FAILED);
        }
    }
}
