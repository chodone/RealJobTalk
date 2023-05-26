package com.ssafy.jobtalkbackend.repository;

import com.ssafy.jobtalkbackend.domain.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnterpriseRepository extends JpaRepository<Enterprise, Long>{

	@Query(value = "select a.*\n"
		+ "from enterprise a, \n"
		+ "\t\t(select news.news_id, news.enterprise_id, news_like.member_id\n"
		+ "\t\tfrom news, news_like\n"
		+ "\t\twhere news.news_id = news_like.news_id\n"
		+ "\t\t\t  and news_like.member_id = :member_id) b\n"
		+ "where a.enterprise_id = b.enterprise_id\n"
		+ "group by a.enterprise_id\n"
		+ "order by count(b.enterprise_id) desc limit 1", nativeQuery = true)
	Optional<Enterprise> getMemberNewsLikeEnterprise(@Param("member_id") Long memberId);

	Optional<Enterprise> findById(Long id);
}
