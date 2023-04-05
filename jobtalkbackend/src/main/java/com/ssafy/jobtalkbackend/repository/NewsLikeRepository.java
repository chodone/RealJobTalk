package com.ssafy.jobtalkbackend.repository;

import com.ssafy.jobtalkbackend.domain.Member;
import com.ssafy.jobtalkbackend.domain.News;
import com.ssafy.jobtalkbackend.domain.NewsLike;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NewsLikeRepository extends JpaRepository<NewsLike, Long> {
    NewsLike save(NewsLike newsLike);

    Optional<NewsLike> findByNewsAndMember(News news, Member member);

    List<NewsLike> findAllByMember(Member member, Pageable pageable);

    List<NewsLike> findAllByMember(Member member);

    Long countAllByMember(Member member);
    
}
