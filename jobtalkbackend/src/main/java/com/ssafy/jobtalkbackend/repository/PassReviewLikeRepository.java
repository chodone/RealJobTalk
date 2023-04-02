package com.ssafy.jobtalkbackend.repository;

import com.ssafy.jobtalkbackend.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PassReviewLikeRepository extends JpaRepository<PassReviewLike, Long> {
    PassReviewLike save(PassReviewLike passReviewLike);

    Optional<PassReviewLike> findByPassReviewAndMember(PassReview passReview, Member member);


}
