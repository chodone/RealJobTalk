package com.ssafy.jobtalkbackend.repository;

import com.ssafy.jobtalkbackend.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>{
    Optional<Member> findByEmail(String email);
    Member save(Member member);

    Optional<Member> findByNickname(String nickname);

    Optional<Member> findById(Long id);

    Optional<Member> findByOauthId(Long oauthId);

}
