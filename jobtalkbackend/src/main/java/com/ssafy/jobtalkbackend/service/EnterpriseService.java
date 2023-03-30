package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.response.NewsResponse;
import com.ssafy.jobtalkbackend.dto.response.PassReviewResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EnterpriseService {

    List<NewsResponse> getNews(Long enterpriseId, Pageable pageable);

    List<PassReviewResponse> getPassReview(Long enterpriseId, Pageable pageable);
}
