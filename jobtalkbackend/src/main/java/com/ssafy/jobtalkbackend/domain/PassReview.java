package com.ssafy.jobtalkbackend.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PassReview {

    @Id
    @GeneratedValue
    @Column(name = "pass_review_id")
    private Long id;

    @Column(columnDefinition = "LONGTEXT")
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Column(columnDefinition = "LONGTEXT")
    private String url;

    private String dateOfIssue;

    @OneToMany(mappedBy = "passReview", cascade = CascadeType.ALL)
    private List<Keyword> keywordList = new ArrayList<>();

    @OneToMany(mappedBy = "passReview", cascade = CascadeType.ALL)
    private List<PassReviewLike> passReviewLikeList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enterprise_id")
    private Enterprise enterprise;
}
