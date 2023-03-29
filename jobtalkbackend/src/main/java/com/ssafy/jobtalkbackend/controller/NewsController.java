package com.ssafy.jobtalkbackend.controller;

import com.ssafy.jobtalkbackend.dto.response.NewsResponse;
import com.ssafy.jobtalkbackend.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;
    @GetMapping("")
    public ResponseEntity<List<NewsResponse>> getNews() {
        return ResponseEntity.ok().body(newsService.getNews());
    }

}
