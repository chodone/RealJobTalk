package com.ssafy.jobtalkbackend.controller;

import com.ssafy.jobtalkbackend.dto.response.EnterpriseResponse;
import com.ssafy.jobtalkbackend.dto.response.EnterpriseDetailResponse;
import com.ssafy.jobtalkbackend.dto.response.NewsResponse;
import com.ssafy.jobtalkbackend.dto.response.PassReviewResponse;
import com.ssafy.jobtalkbackend.service.EnterpriseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enterprise")
@RequiredArgsConstructor
@Slf4j
public class EnterpriseController {

    private final EnterpriseService enterpriseService;

    @GetMapping("")
    public ResponseEntity<List<EnterpriseResponse>> getEnterprises() {
        return ResponseEntity.ok().body(enterpriseService.getEnterprises());
    }

    @GetMapping("/{enterpriseId}")
    public ResponseEntity<EnterpriseDetailResponse> getEnterpriseDetail(@PathVariable Long enterpriseId) {
        return ResponseEntity.ok().body(enterpriseService.getEnterpriseDetail(enterpriseId));
    }

    @GetMapping("/{enterpriseId}/news")
    public ResponseEntity<List<NewsResponse>> getNews(@PathVariable Long enterpriseId,
                                                      @PageableDefault(size=5, sort="id", direction = Sort.Direction.DESC) Pageable pageable,
                                                      @AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(enterpriseService.getNews(enterpriseId, pageable));
    }

    @GetMapping("/{enterpriseId}/pass_review")
    public ResponseEntity<List<PassReviewResponse>> getPassReview(@PathVariable Long enterpriseId,
                                                                  @PageableDefault(size=5, sort="id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(enterpriseService.getPassReview(enterpriseId, pageable));
    }

}
