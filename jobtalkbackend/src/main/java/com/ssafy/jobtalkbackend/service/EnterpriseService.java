package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.domain.News;
import com.ssafy.jobtalkbackend.domain.PassReview;
import com.ssafy.jobtalkbackend.dto.response.*;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface EnterpriseService {

    NewsTotalResponse getNews(Long enterpriseId, Pageable pageable, User user);

    List<HotNewsResponse> getHotNews(Long enterpriseId, User user);

    PassReviewTotalResponse getPassReview(Long enterpriseId, Pageable pageable, User user);

    List<EnterpriseResponse> getEnterprises();

    NewsResponse buildNewsResponse(News news, boolean isScrap);

    PassReviewResponse buildPassReviewResponse(PassReview passReview, boolean isScrap);

    EnterpriseDetailResponse getEnterpriseDetail(Long enterpriseId);


}
