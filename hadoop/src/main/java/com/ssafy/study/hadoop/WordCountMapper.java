package com.ssafy.study.hadoop;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;
import java.util.StringTokenizer;

public class WordCountMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();

    public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);
        StringTokenizer st = new StringTokenizer(value.toString(), "\n");
        System.out.println("Value : "+value.toString());
//        System.out.println("Title : " + st.nextToken()); // 1st line : news title
//        System.out.println("URL : " + st.nextToken()); // 2nd line : news url

        // 3rd line : new content
        while(st.hasMoreTokens()){
            String line = st.nextToken();
            if(line.isEmpty()) continue;
            KomoranResult analyzeResultList = komoran.analyze(line); // for every line, get analyze
            for(String noun : analyzeResultList.getNouns()){ // get only nouns
                word.set(noun);
                context.write(word, one);
            }
        }
        
    }
}
