package com.c205.SpringBatch.batch.step;

import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class Action {

	private ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
		.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024)) // 10MB
		.build();

	private WebClient webClient = WebClient.builder()
		.exchangeStrategies(exchangeStrategies)
		.build();

	public Map<String, Long> getSpotAction() {
		return webClient
			.get()
			.uri("http://openapi.seoul.go.kr:8088/784f734843646c773736755062584e/xml/citydata/1/5/광화문·덕수궁")
			// .header("Authorization", "token " + githubToken)
			.retrieve().bodyToMono(new ParameterizedTypeReference<Map<String, Long>>() {
			}).block();
	}
}
