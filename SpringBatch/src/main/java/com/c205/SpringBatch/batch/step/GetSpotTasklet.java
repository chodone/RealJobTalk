package com.c205.SpringBatch.batch.step;

import java.util.TimeZone;

import javax.annotation.PostConstruct;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class GetSpotTasklet implements Tasklet {
	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
		ContributorDto[] contributorDtos = action.getContributors(githubToken, "microsoft/typescript",
			String.valueOf(page));

		//DOM Document 객체 생성하기 위한 메서드
		DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
		//DOM 파서로부터 입력받은 파일을 파싱하도록 요청
		DocumentBuilder parser = f.newDocumentBuilder();

		//XML 파일 지정
		String url = "xml//book.xml";

		Document xmlDoc = null;
		//DOM 파서로부터 입력받은 파일을 파싱하도록 요청
		xmlDoc = parser.parse(url);

		//루트 엘리먼트 접근
		Element root = xmlDoc.getDocumentElement();
		System.out.println(root.getTagName());    //booklist

		return RepeatStatus.FINISHED;
	}

}
