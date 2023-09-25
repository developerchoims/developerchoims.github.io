package com.ds.dasony.common;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;

@Slf4j
@Component
public class FFmpegWrapper {
	static String absolutePath = new File("").getAbsolutePath() + "\\";
	private final static String filePath = "src/main/webapp/resources/ffmpeg/bin/";

	public static void processVideo(String inputPath, String outputPath) {
		log.info("inputPath{}",inputPath);
		FFmpeg ffmpeg;
		try {
			ffmpeg = new FFmpeg(filePath+"ffmpeg");
			FFprobe ffprobe = new FFprobe(filePath+"ffprobe");
			
			FFmpegBuilder builder = new FFmpegBuilder().setInput(inputPath) // 동영상 파일경로
					.overrideOutputFiles(true) // 오버라이드
					.addOutput(outputPath) // 변환 후 저장할 경로
					.setFormat("mp4") // 포맷 ( 확장자 )
					.setVideoCodec("libx264") // 비디오 코덱
					.disableSubtitle() // 서브타이틀 제거
					.setAudioChannels(2) // 오디오 채널 ( 1 : 모노 , 2 : 스테레오 )
					.setVideoResolution(900, 1600) // 동영상 해상도
					.setVideoBitRate(1464800) // 비디오 비트레이트
					.setStrict(FFmpegBuilder.Strict.EXPERIMENTAL) // ffmpeg 빌더 실행 허용
					.done();
			
			FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
			executor.createJob(builder).run();
		} catch (IOException e) {
			e.printStackTrace();
			System.err.println("동영상 변환 또는 압축 실패: " + e.getMessage());
		}
		
	}
		
		
}
  
