package com.c205.SpringBatch.batch.jobConfig;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.c205.SpringBatch.batch.step.GetSpotTasklet;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class GetSpotJobConfig {

	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;

	@Bean
	public Job getSpotJob(Step getSpotStep) {
		return jobBuilderFactory.get("getSpotJob")
			.incrementer(new RunIdIncrementer())
			.start(getSpotStep)
			.build();
	}

	@JobScope
	@Bean
	public Step getSpotStep() {
		return stepBuilderFactory.get("getSpotStep")
			.tasklet(new GetSpotTasklet())
			.build();
	}

}
