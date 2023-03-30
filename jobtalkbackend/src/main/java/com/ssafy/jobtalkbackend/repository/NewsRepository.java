package com.ssafy.jobtalkbackend.repository;

import com.ssafy.jobtalkbackend.domain.News;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findAllByEnterpriseId(Long enterpriseId, Pageable pageable);
}
