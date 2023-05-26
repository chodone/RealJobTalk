package com.ssafy.jobtalkbackend.repository;

import com.ssafy.jobtalkbackend.domain.Enterprise;
import com.ssafy.jobtalkbackend.domain.News;
import com.ssafy.jobtalkbackend.domain.PassReview;
import com.ssafy.jobtalkbackend.domain.PassReviewLike;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PassReviewRepository extends JpaRepository<PassReview, Long> {
    List<PassReview> findAllByEnterpriseId(Long enterpriseId, Pageable pageable);

    PassReviewLike save(PassReviewLike passReviewLike);

    Long countAllByEnterprise(Enterprise enterprise);

    List<PassReview> findTop3ByEnterpriseIdOrderByHotRankDesc(Long enterpriseId);


}
