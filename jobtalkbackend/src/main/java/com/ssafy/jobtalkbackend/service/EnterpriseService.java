package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.response.*;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface EnterpriseService {

    NewsTotalResponse getNews(Long enterpriseId, Pageable pageable, User user);

    PassReviewTotalResponse getPassReview(Long enterpriseId, Pageable pageable, User user);

    List<EnterpriseResponse> getEnterprises();

    EnterpriseDetailResponse getEnterpriseDetail(Long enterpriseId);
}
