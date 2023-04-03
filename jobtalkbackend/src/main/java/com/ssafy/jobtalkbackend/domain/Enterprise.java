package com.ssafy.jobtalkbackend.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Enterprise {

    @Id
    @GeneratedValue
    @Column(name = "enterprise_id")
    private Long id;

    private String name;

    @Column(columnDefinition = "LONGTEXT")
    private String imgUrl;

    @Column(columnDefinition = "LONGTEXT")
    private String homepageUrl;

    @Column(columnDefinition = "LONGTEXT")
    private String recruitpageUrl;

    @Column(columnDefinition = "LONGTEXT")
    private String blogUrl;

    @Column(columnDefinition = "LONGTEXT")
    private String youtubeUrl;

    @Column(columnDefinition = "LONGTEXT")
    private String businessInformation;

    @Column(columnDefinition = "LONGTEXT")
    private String idealTalent;

    @OneToMany(mappedBy = "enterprise", cascade = CascadeType.ALL)
    private List<News> newsList = new ArrayList<>();

    @OneToMany(mappedBy = "enterprise", cascade = CascadeType.ALL)
    private List<PassReview> passReviewList = new ArrayList<>();
}
