package com.ssafy.jobtalkbackend.jwt;

import com.ssafy.jobtalkbackend.domain.Member;
import com.ssafy.jobtalkbackend.repository.MemberRepository;
import exception.member.MemberExceptionEnum;
import exception.member.MemberRuntimeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("email in loadUserByUsername = " + email);
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(member.getRole().name()));

        return new org
                .springframework
                .security
                .core
                .userdetails
                .User(member.getEmail(), member.getPassword(), grantedAuthorities);
    }
}
