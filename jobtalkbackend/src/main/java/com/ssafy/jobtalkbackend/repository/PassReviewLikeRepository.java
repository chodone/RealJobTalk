package com.ssafy.jobtalkbackend.repository;

import com.ssafy.jobtalkbackend.domain.PassReviewLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassReviewLikeRepository extends JpaRepository<PassReviewLike, Long> {
    PassReviewLike save(PassReviewLike passReviewLike);

}
