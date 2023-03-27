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

    private String homepageUrl;

    private String recruitpageUrl;

    private String blogUrl;

    private String youtubeUrl;

    @Column(columnDefinition = "TEXT")
    private String businessInformation;

    @Column(columnDefinition = "TEXT")
    private String idealTalent;

    @OneToMany(mappedBy = "enterprise", cascade = CascadeType.ALL)
    private List<News> newsList = new ArrayList<>();

    @OneToMany(mappedBy = "enterprise", cascade = CascadeType.ALL)
    private List<PassReview> passReviewList = new ArrayList<>();
}
