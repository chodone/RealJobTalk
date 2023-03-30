package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.domain.News;
import com.ssafy.jobtalkbackend.dto.response.NewsResponse;
import com.ssafy.jobtalkbackend.repository.NewsRepository;
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

    @Override
    public List<NewsResponse> getNews(Long enterpriseId, Pageable pageable) {
        List<News> newsList = newsRepository.findAllByEnterpriseId(enterpriseId, pageable);
        List<NewsResponse> newsResponseList = newsList.stream().map(news -> {
            NewsResponse newsResponse = new NewsResponse();
            newsResponse.updateDto(news.getId(), news.getTitle(), news.getUrl(), news.getHotRank(), news.getDateOfIssue());
            return newsResponse;
        }).collect(Collectors.toList());

        return newsResponseList;
    }
}
