package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.domain.*;
import com.ssafy.jobtalkbackend.dto.response.EnterpriseResponse;
import com.ssafy.jobtalkbackend.dto.response.EnterpriseDetailResponse;
import com.ssafy.jobtalkbackend.dto.response.NewsResponse;
import com.ssafy.jobtalkbackend.dto.response.PassReviewResponse;
import com.ssafy.jobtalkbackend.exception.enterprise.EnterpriseExceptionEnum;
import com.ssafy.jobtalkbackend.exception.enterprise.EnterpriseRuntimeException;
import com.ssafy.jobtalkbackend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EnterpriseServiceImpl implements EnterpriseService {

    private final NewsRepository newsRepository;
    private final PassReviewRepository passReviewRepository;
    private final EnterpriseRepository enterpriseRepository;
    private final NewsLikeRepository newsLikeRepository;
    private final MemberRepository memberRepository;


    @Override
    public List<EnterpriseResponse> getEnterprises() {
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        List<EnterpriseResponse> enterpriseListResponse = enterpriseList.stream().map(enterprise -> {
            EnterpriseResponse enterpriseResponse = EnterpriseResponse
                    .builder()
                    .id(enterprise.getId())
                    .name(enterprise.getName())
                    .imgUrl(enterprise.getImgUrl())
                    .build();
            return enterpriseResponse;
        }).collect(Collectors.toList());

        return enterpriseListResponse;
    }

    @Override
    public List<NewsResponse> getNews(Long enterpriseId, Pageable pageable, User user) {
        Member member = memberRepository.findByEmail(user.getUsername()).orElse(null);

        List<News> newsList = newsRepository.findAllByEnterpriseId(enterpriseId, pageable);

        List<NewsResponse> newsResponseList = newsList.stream().map(news -> {
            boolean isLike = false;
            if (member != null) {
                NewsLike newsLike = newsLikeRepository.findByNewsAndMember(news, member)
                        .orElse(null);
                if (newsLike != null) {
                    isLike = true;
                }
            }
            NewsResponse newsResponse = NewsResponse
                    .builder()
                    .id(news.getId())
                    .title(news.getTitle())
                    .url(news.getUrl())
                    .hotRank(news.getHotRank())
                    .dateOfIssue(news.getDateOfIssue())
                    .isScrap(isLike)
                    .build();
            return newsResponse;
        }).collect(Collectors.toList());

        return newsResponseList;
    }

    @Override
    public List<PassReviewResponse> getPassReview(Long enterpriseId, Pageable pageable) {
        List<PassReview> passReviewList = passReviewRepository.findAllByEnterpriseId(enterpriseId, pageable);
        List<PassReviewResponse> passReviewResponseList = passReviewList.stream().map(passReview -> {
            PassReviewResponse passReviewResponse = PassReviewResponse
                    .builder()
                    .id(passReview.getId())
                    .title(passReview.getTitle())
                    .url(passReview.getUrl())
                    .dateOfIssue(passReview.getDateOfIssue())
                    .build();
            return passReviewResponse;
        }).collect(Collectors.toList());

        return passReviewResponseList;
    }

    @Override
    public EnterpriseDetailResponse getEnterpriseDetail(Long enterpriseId) {
        Enterprise enterprise = enterpriseRepository.findById(enterpriseId)
                .orElseThrow(() -> new EnterpriseRuntimeException(EnterpriseExceptionEnum.ENTERPRISE_EXIST_EXCEPTION));
        EnterpriseDetailResponse enterpriseDetailResponse = EnterpriseDetailResponse
                .builder()
                .id(enterprise.getId())
                .name(enterprise.getName())
                .imgUrl(enterprise.getImgUrl())
                .recruitpageUrl(enterprise.getRecruitpageUrl())
                .blogUrl(enterprise.getBlogUrl())
                .youtubeUrl(enterprise.getYoutubeUrl())
                .businessInformation(enterprise.getBusinessInformation())
                .idealTalent(enterprise.getIdealTalent())
                .build();
        return enterpriseDetailResponse;
    }


}
