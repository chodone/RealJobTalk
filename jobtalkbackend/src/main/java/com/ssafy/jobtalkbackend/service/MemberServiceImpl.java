package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.domain.*;
import com.ssafy.jobtalkbackend.dto.request.LoginRequest;
import com.ssafy.jobtalkbackend.dto.request.SignUpRequest;
import com.ssafy.jobtalkbackend.dto.response.*;
import com.ssafy.jobtalkbackend.exception.auth.AuthRuntimeException;
import com.ssafy.jobtalkbackend.exception.enterprise.EnterpriseExceptionEnum;
import com.ssafy.jobtalkbackend.exception.enterprise.EnterpriseRuntimeException;
import com.ssafy.jobtalkbackend.jwt.JwtTokenProvider;
import com.ssafy.jobtalkbackend.repository.*;
import com.ssafy.jobtalkbackend.exception.member.MemberExceptionEnum;
import com.ssafy.jobtalkbackend.exception.member.MemberRuntimeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final NewsLikeRepository newsLikeRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final NewsRepository newsRepository;
    private final PassReviewRepository passReviewRepository;
    private final PassReviewLikeRepository passReviewLikeRepository;
    private final EnterpriseService enterpriseService;
    private final EnterpriseRepository enterpriseRepository;
    private final KeywordRepository keywordRepository;

    @Override
    public Member searchMember(String email) {
        Member member = memberRepository.findByEmail(String.valueOf(email))
                .orElseThrow(()-> new MemberRuntimeException(MemberExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));
        return member;
    }

    @Transactional
    @Override
    public Boolean signUp(SignUpRequest request){
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
    public ResponseEntity<TokenResponse> login(LoginRequest request, boolean kakaoLogin) {

        Member member = searchMember(request.getEmail());

        if (kakaoLogin == false && member.getOauthId() != null) {
            throw new MemberRuntimeException(MemberExceptionEnum.MEMBER_NEED_KAKAO_LOGIN);
        }

        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new MemberRuntimeException(MemberExceptionEnum.MEMBER_PASSWORD_EXCEPTION);
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        TokenResponse tokenResponse = jwtTokenProvider.createToken(authentication);

        return new ResponseEntity<>(tokenResponse, HttpStatus.OK);
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
        Member member = searchMember(user.getUsername());
        checkNickname(nickname);
        member.modifyNickname(nickname);
        return nickname;
    }

    @Override
    public NewsTotalResponse getScrapNews(Pageable pageable, User user) {
        List<NewsResponse> resultNewsList = new ArrayList<>();
        Member member = searchMember(user.getUsername());

        long totalSize = newsLikeRepository.countAllByMember(member);
        List<NewsLike> newsLikeList = newsLikeRepository.findAllByMember(member, pageable);

        for(NewsLike newsLike : newsLikeList) {
            News news = newsLike.getNews();
            resultNewsList.add(enterpriseService.buildNewsResponse(news, true));
        }
        int totalPages = (int) Math.ceil((double) totalSize / pageable.getPageSize());
        return NewsTotalResponse
                .builder()
                .totalPages(totalPages)
                .newsResponseList(resultNewsList)
                .build();
    }

    @Override
    @Transactional
    public Boolean scrapNews(Long newsId, User user) {

        Member member = searchMember(user.getUsername());
        News news = newsRepository.findById(newsId)
                .orElseThrow(()-> new EnterpriseRuntimeException(EnterpriseExceptionEnum.ENTERPRISE_NEWS_NOT_EXIST_EXCEPTION));

        NewsLike newsLike = newsLikeRepository.findByNewsAndMember(news, member).orElse(null);
        if (newsLike == null) {
            newsLike = NewsLike
                    .builder()
                    .member(member)
                    .news(news)
                    .build();
            news.addScrapCount();
            newsLikeRepository.save(newsLike);
            return true;
        } else {
            newsLikeRepository.deleteById(newsLike.getId());
            news.minusScrapCount();
            return false;
        }
    }

    @Override
    public PassReviewTotalResponse getScrapPassReview(Pageable pageable, User user) {
        List<PassReviewResponse> resultPassReviewList = new ArrayList<>();
        Member member = searchMember(user.getUsername());

        long totalSize = passReviewLikeRepository.countAllByMember(member);
        List<PassReviewLike> passReviewLikeList = passReviewLikeRepository.findAllByMember(member, pageable);

        for(PassReviewLike passReviewLike : passReviewLikeList) {
            PassReview passReview = passReviewLike.getPassReview();
            resultPassReviewList.add(enterpriseService.buildPassReviewResponse(passReview, true));
        }

        int totalPages = (int) Math.ceil((double) totalSize / pageable.getPageSize());

        return PassReviewTotalResponse
                .builder()
                .totalPages(totalPages)
                .passReviewResponseList(resultPassReviewList)
                .build();
    }

    @Transactional
    @Override
    public Boolean scrapPassReview(Long passReviewId, User user) {
        Member member = searchMember(user.getUsername());
        PassReview passReview = passReviewRepository.findById(passReviewId)
                .orElseThrow(() -> new EnterpriseRuntimeException(EnterpriseExceptionEnum.ENTERPRISE_PASSREVIEW_NOT_EXIST_EXCEPTION));
        PassReviewLike passReviewLike = passReviewLikeRepository.findByPassReviewAndMember(passReview, member).orElse(null);

        if (passReviewLike == null) {
            passReviewLike = PassReviewLike
                    .builder()
                    .member(member)
                    .passReview(passReview)
                    .build();
            passReviewLikeRepository.save(passReviewLike);
            return true;
        } else {
            passReviewLikeRepository.deleteById(passReviewLike.getId());
            return false;
        }
    }

    @Override
    public List<EnterpriseResponse> recommendEnterprise(User user) {
        if(user == null) {
            throw new MemberRuntimeException(MemberExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION);
        }
        Member member = searchMember(user.getUsername());

        // member가 scrap한 뉴스들을 전부 본다. -> 가장 많은 기업을 하나 뽑는다.
        Enterprise memberFavoriteEnter = enterpriseRepository.getMemberNewsLikeEnterprise(member.getId()).orElseThrow(
            ()-> new MemberRuntimeException(MemberExceptionEnum.MEMBER_NEED_SCRAP));

        String membersKeywordString = keywordListToString(memberFavoriteEnter.getId());

        double[] top5Dou = new double[5];
        int[] top5I = new int[5];

        Arrays.fill(top5Dou, Double.NEGATIVE_INFINITY);

        for (int i = 0; i < 300; i++) {
            if (i == memberFavoriteEnter.getId()) {
                continue;
            }

            String compareString = keywordListToString(Long.valueOf(i));
            double dou = findSimilarity(membersKeywordString, compareString);

            // check if dou is among the top 5
            for (int j = 0; j < 5; j++) {
                if (dou > top5Dou[j]) {
                    // shift the elements below j to the right
                    for (int k = 4; k > j; k--) {
                        top5Dou[k] = top5Dou[k-1];
                        top5I[k] = top5I[k-1];
                    }
                    top5Dou[j] = dou;
                    top5I[j] = i;
                    break; // we found a spot for dou, break out of the loop
                }
            }
        }

        // 키워드와 비슷한 키워드를 가진 기업들을 뽑는다.
        List<EnterpriseResponse> result = new ArrayList<>();
        for (int j = 0; j < 5; j++) {
            Enterprise enterprise = enterpriseRepository.findById(Long.valueOf(top5I[j])).orElse(null);
            result.add(EnterpriseResponse.builder().id(enterprise.getId()).name(enterprise.getName()).imgUrl(enterprise.getImgUrl()).build());
        }

        return result;
    }

    public String keywordListToString(Long enterprise_id) {
        List<Keyword> keywordList = keywordRepository.findTop100ByEnterpriseIdOrderByCountDesc(enterprise_id);
        List<String> keyList = keywordList.stream().map(keyword -> {
            return keyword.getName();
        }).collect(Collectors.toList());
        Collections.sort(keyList);
        return String.join("", keyList);
    }

    public static double findSimilarity(String x, String y) {
        double maxLength = Double.max(x.length(), y.length());
        if (maxLength > 0) {
            // 필요한 경우 선택적으로 대소문자를 무시합니다.
            return (maxLength - StringUtils.getLevenshteinDistance(x, y)) / maxLength;
        }
        return 1.0;
    }

    public ScrapCountResponse getScrapCount(User user) {
        if (user == null) {
            throw new MemberRuntimeException(MemberExceptionEnum.MEMBER_ACCESS_EXCEPTION);
        } else {
            Member member = searchMember(user.getUsername());
            Long scrapNewsCount = newsLikeRepository.countAllByMember(member);
            Long scrapPassReviewCount = passReviewLikeRepository.countAllByMember(member);
            return ScrapCountResponse
                    .builder()
                    .email(member.getEmail())
                    .nickname(member.getNickname())
                    .scrapNewsCount(scrapNewsCount)
                    .scrapPassReviewCount(scrapPassReviewCount)
                    .build();
        }
    }

}
