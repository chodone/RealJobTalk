package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.domain.Enterprise;
import com.ssafy.jobtalkbackend.domain.News;
import com.ssafy.jobtalkbackend.domain.PassReview;
import com.ssafy.jobtalkbackend.dto.response.EnterpriseResponse;
import com.ssafy.jobtalkbackend.dto.response.EnterpriseDetailResponse;
import com.ssafy.jobtalkbackend.dto.response.NewsResponse;
import com.ssafy.jobtalkbackend.dto.response.PassReviewResponse;
import com.ssafy.jobtalkbackend.exception.enterprise.EnterpriseExceptionEnum;
import com.ssafy.jobtalkbackend.exception.enterprise.EnterpriseRuntimeException;
import com.ssafy.jobtalkbackend.repository.EnterpriseRepository;
import com.ssafy.jobtalkbackend.repository.NewsRepository;
import com.ssafy.jobtalkbackend.repository.PassReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
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
    public List<NewsResponse> getNews(Long enterpriseId, Pageable pageable) {
        List<News> newsList = newsRepository.findAllByEnterpriseId(enterpriseId, pageable);
        List<NewsResponse> newsResponseList = newsList.stream().map(news -> {
            NewsResponse newsResponse = NewsResponse
                    .builder()
                    .id(news.getId())
                    .title(news.getTitle())
                    .url(news.getUrl())
                    .hotRank(news.getHotRank())
                    .dateOfIssue(news.getDateOfIssue())
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
