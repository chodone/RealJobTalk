package com.ssafy.jobtalkbackend.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

	@Id
	@GeneratedValue
	@Column(name = "MEMBER_ID")
	private Long id;

	@NotNull
	private String email;

	@Column(name = "PASSWORD")
	private String password;

	@NotNull
	private String nickname;

	@Enumerated(EnumType.STRING)
	private Role role;

	private String oauth;

	public void modifyNickname(String nickname) {
		this.nickname = nickname;
	}

}
