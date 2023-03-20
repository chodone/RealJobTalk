package com.c205.SpringBatch.batch.scheduler;

import java.util.Collections;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.c205.SpringBatch.batch.jobConfig.GetSpotJobConfig;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Scheduler {

	private final Job getSpotJob;
	private final JobLauncher jobLauncher;

	@Scheduled(cron = "0 0 17 * * *")
	public void getSpotJobRun() throws
		JobInstanceAlreadyCompleteException,
		JobExecutionAlreadyRunningException,
		JobParametersInvalidException,
		JobRestartException {

		JobParameters jobParameters = new JobParameters(
			Collections.singletonMap("requestTime", new JobParameter(System.currentTimeMillis())));

		jobLauncher.run(getSpotJob, jobParameters);
	}
}
