package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.dto.response.NewsResponse;

import java.util.List;

public interface NewsService {

    List<NewsResponse> getNews();
}
