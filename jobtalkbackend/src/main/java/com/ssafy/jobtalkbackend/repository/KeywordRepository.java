package com.ssafy.jobtalkbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.jobtalkbackend.domain.Keyword;
import com.ssafy.jobtalkbackend.domain.News;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {

	List<Keyword> findTop100ByEnterpriseIdOrderByCountDesc(Long enterpriseId);


}
