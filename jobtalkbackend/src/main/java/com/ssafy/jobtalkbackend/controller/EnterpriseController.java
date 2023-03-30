package com.ssafy.jobtalkbackend.controller;

import com.ssafy.jobtalkbackend.dto.response.NewsResponse;
import com.ssafy.jobtalkbackend.service.EnterpriseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enterprise")
@RequiredArgsConstructor
public class EnterpriseController {

    private final EnterpriseService enterpriseService;
    @GetMapping("/{enterpriseId}/news")
    public ResponseEntity<List<NewsResponse>> getNews(@PathVariable Long enterpriseId,
                                                      @PageableDefault(size=5, sort="id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(enterpriseService.getNews(enterpriseId, pageable));
    }

//    @GetMapping("/{enterpriseId}/pass_reviews")
//    public ResponseEntity<List<>>
}
