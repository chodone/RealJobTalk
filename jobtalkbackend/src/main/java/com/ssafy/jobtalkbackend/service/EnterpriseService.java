package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.response.NewsResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EnterpriseService {

    List<NewsResponse> getNews(Long enterpriseId, Pageable pageable);
}
