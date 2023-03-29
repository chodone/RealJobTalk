package com.ssafy.jobtalkbackend.domain;

import javax.persistence.*;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

	@Id
	@GeneratedValue
	@Column(name = "member_id")
	private Long id;

	@NotNull
	private String email;

	private String password;

	@NotNull
	private String nickname;

	@Enumerated(EnumType.STRING)
	private Role role;

	private Long oauthId;

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<NewsLike> newsLikeList = new ArrayList<>();

	public void modifyNickname(String nickname) {
		this.nickname = nickname;
	}

}
