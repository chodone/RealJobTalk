package com.ssafy.jobtalkbackend.service;

import com.ssafy.jobtalkbackend.domain.*;
import com.ssafy.jobtalkbackend.dto.response.*;
import com.ssafy.jobtalkbackend.exception.enterprise.EnterpriseExceptionEnum;
import com.ssafy.jobtalkbackend.exception.enterprise.EnterpriseRuntimeException;
import com.ssafy.jobtalkbackend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    private final NewsLikeRepository newsLikeRepository;
    private final PassReviewLikeRepository passReviewLikeRepository;
    private final MemberRepository memberRepository;
    private final KeywordRepository keywordRepository;


    @Override
    public List<EnterpriseResponse> getEnterprises() {
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();

        return enterpriseList.stream().map(enterprise -> {
            return EnterpriseResponse
                    .builder()
                    .id(enterprise.getId())
                    .name(enterprise.getName())
                    .imgUrl(enterprise.getImgUrl())
                    .build();
        }).collect(Collectors.toList());
    }

    @Override
    public NewsTotalResponse getNews(Long enterpriseId, Pageable pageable, User user) {

        List<NewsResponse> resultNewsList = new ArrayList<>();

        Enterprise enterprise = enterpriseRepository.findById(enterpriseId).orElse(null);

        long totalSize = newsRepository.countAllByEnterprise(enterprise);
        List<News> newsList = newsRepository.findAllByEnterpriseId(enterpriseId, pageable);
        int totalPages = (int) Math.ceil((double) totalSize / pageable.getPageSize());

        Member member = null;
        if (user != null) {
            member = memberRepository.findByEmail(user.getUsername()).orElse(null);
        }

        if (member != null) {
            for(News news : newsList) {
                boolean isScrap = false;
                NewsLike newsLike = newsLikeRepository.findByNewsAndMember(news, member).orElse(null);
                if (newsLike != null) {
                    isScrap = true;
                }
                resultNewsList.add(buildNewsResponse(news, isScrap));
            }
        } else {
            for(News news : newsList) {
                resultNewsList.add(buildNewsResponse(news, false));
            }
        }
        return NewsTotalResponse
                .builder()
                .totalPages(totalPages)
                .newsResponseList(resultNewsList)
                .build();
    }

    @Override
    public List<HotNewsResponse> getHotNews(Long enterpriseId, User user) {
        List<News> newsList = newsRepository.findTop3ByEnterpriseIdOrderByHotRankDesc(enterpriseId);
        List<HotNewsResponse> hotNewsResponseList = new ArrayList<>();

        Member member = null;
        if (user != null) {
            member = memberRepository.findByEmail(user.getUsername()).orElse(null);
        }
        if (member != null) {
            for (News news : newsList) {
                boolean isScrap = false;
                NewsLike newsLike = newsLikeRepository.findByNewsAndMember(news, member).orElse(null);
                if (newsLike != null) {
                    isScrap = true;
                }
               hotNewsResponseList.add(hotNewsBuilder(news, isScrap));
            }
        } else {
            for (News news : newsList) {
                hotNewsResponseList.add(hotNewsBuilder(news, false));
            }
        }
        return hotNewsResponseList;
    }

    @Override
    public List<HotPassReviewResponse> getHotPassReview(Long enterpriseId, User user) {
        List<PassReview> passReviewList = passReviewRepository.findTop3ByEnterpriseIdOrderByHotRankDesc(enterpriseId);
        List<HotPassReviewResponse> hotPassReviewResponseList = new ArrayList<>();
        Member member = null;
        if (user != null) {
            member = memberRepository.findByEmail(user.getUsername()).orElse(null);
        }
        if (member != null) {
            for (PassReview passReview : passReviewList) {
                boolean isScrap = false;
                PassReviewLike passReviewLike = passReviewLikeRepository.findByPassReviewAndMember(passReview, member).orElse(null);
                if (passReviewLike != null) {
                    isScrap = true;
                }
                hotPassReviewResponseList.add(hotPassReviewBuilder(passReview, isScrap));
            }
        } else {
            for (PassReview passReview : passReviewList) {
                hotPassReviewResponseList.add(hotPassReviewBuilder(passReview, false));
            }
        }
        return hotPassReviewResponseList;
    }

    public HotNewsResponse hotNewsBuilder(News news, boolean isScrap) {
        return HotNewsResponse
                .builder()
                .id(news.getId())
                .title(news.getTitle())
                .url(news.getUrl())
                .count(news.getHotRank())
                .isScrap(isScrap)
                .build();
    }

    public HotPassReviewResponse hotPassReviewBuilder(PassReview passReview, boolean isScrap) {
        return HotPassReviewResponse
                .builder()
                .id(passReview.getId())
                .title(passReview.getTitle())
                .url(passReview.getUrl())
                .count(passReview.getHotRank())
                .isScrap(isScrap)
                .build();
    }

    @Override
    public NewsResponse buildNewsResponse(News news, boolean isScrap) {
        return NewsResponse
                .builder()
                .id(news.getId())
                .title(news.getTitle())
                .content(news.getContent())
                .url(news.getUrl())
                .hotRank(news.getHotRank())
                .dateOfIssue(news.getDateOfIssue())
                .isScrap(isScrap)
                .build();
    }

    @Override
    public PassReviewTotalResponse getPassReview(Long enterpriseId, Pageable pageable, User user) {

        List<PassReviewResponse> resultPassReviewList = new ArrayList<>();

        List<PassReview> passReviewList = passReviewRepository.findAllByEnterpriseId(enterpriseId, pageable);

        Enterprise enterprise = enterpriseRepository.findById(enterpriseId).orElse(null);

        long totalSize = passReviewRepository.countAllByEnterprise(enterprise);

        int totalPages = (int) Math.ceil((double) totalSize / pageable.getPageSize());

        Member member = null;

        if (user != null) {
            member = memberRepository.findByEmail(user.getUsername()).orElse(null);
        }

        if (member != null) {
            for(PassReview passReview : passReviewList) {
                boolean isScrap = false;
                PassReviewLike passReviewLike = passReviewLikeRepository.findByPassReviewAndMember(passReview, member).orElse(null);
                if (passReviewLike != null) {
                    isScrap = true;
                }
                resultPassReviewList.add(buildPassReviewResponse(passReview, isScrap));
            }
        } else {
            for(PassReview passReview : passReviewList) {
                resultPassReviewList.add(buildPassReviewResponse(passReview, false));
            }
        }
        return PassReviewTotalResponse
                .builder()
                .totalPages(totalPages)
                .passReviewResponseList(resultPassReviewList)
                .build();
    }

    @Override
    public PassReviewResponse buildPassReviewResponse(PassReview passReview, boolean isScrap) {
        return PassReviewResponse
                .builder()
                .id(passReview.getId())
                .title(passReview.getTitle())
                .content(passReview.getContent())
                .url(passReview.getUrl())
                .dateOfIssue(passReview.getDateOfIssue())
                .isScrap(isScrap)
                .build();
    }

    @Override
    public EnterpriseDetailResponse getEnterpriseDetail(Long enterpriseId) {
        Enterprise enterprise = enterpriseRepository.findById(enterpriseId)
                .orElseThrow(() -> new EnterpriseRuntimeException(EnterpriseExceptionEnum.ENTERPRISE_EXIST_EXCEPTION));
        return EnterpriseDetailResponse
                .builder()
                .id(enterprise.getId())
                .name(enterprise.getName())
                .imgUrl(enterprise.getImgUrl())
                .recruitpageUrl(enterprise.getRecruitpageUrl())
                .homepageUrl(enterprise.getHomepageUrl())
                .blogUrl(enterprise.getBlogUrl())
                .youtubeUrl(enterprise.getYoutubeUrl())
                .businessInformation(enterprise.getBusinessInformation())
                .idealTalent(enterprise.getIdealTalent())
                .build();
    }

    @Override
    public List<KeywordResponse> getKeyword(Long enterpriseId) {
        List<Keyword> keywordList = keywordRepository.findTop100ByEnterpriseIdOrderByCountDesc(enterpriseId);
        return keywordList.stream().map(keyword -> {
            return KeywordResponse.builder()
                .text(keyword.getName())
                .value(keyword.getCount())
                .build();
        }).collect(Collectors.toList());
    }

}
