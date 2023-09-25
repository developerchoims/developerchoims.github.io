package com.ds.dasony.common;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MisunFileUpload {
	
	static String absolutePath = new File("").getAbsolutePath() + "\\";
	private final static String filePath = "src/main/webapp/resources/images/";
	
	public static List<Map<String, Object>> mulitiFileUpload(
				HttpServletRequest request,
				String fkNum,
				String path
			) throws IllegalStateException, IOException {
		

			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
			log.info("파일 업로드 실행 확인 - 파일 업로더 - multiRequest, {}", request);
			List<Map<String, Object>> list = new ArrayList<>();
			
			List<MultipartFile> fileMap = multiRequest.getFiles("file");
			log.info("파일 업로드 실행 확인 - 파일 업로더 - fileMap, {}",fileMap);
			int index = 0;
			for(MultipartFile multipartFile : fileMap) {
				if(!multipartFile.isEmpty()) {
					//원래 파일명
					String originName = multipartFile.getOriginalFilename();

					//변경된 파일이름 구하기
					String changeName = getChangeName(originName);

					//업로드할 경로 설정하기
					String thisPath = filePath + path + "/"; 
					
					//파일 폴더 유무 구분 및 생성
					File dir = new File(thisPath);
			        if (!dir.exists()) {
			            dir.mkdirs();
			        }
			        log.info(absolutePath + thisPath);
			        
			        /*
			         * 
			        //동영상일 경우에만 
			        if(path =="board") {
			        	log.info("동영상 로직 수행 확인");
			        	// 업로드된 파일을 임시 디렉토리에 저장
		                String tempDirectory = System.getProperty("java.io.tmpdir");
		                String tempFilePath = tempDirectory + File.separator + changeName;
		                multipartFile.transferTo(new File(tempFilePath));
		                
		                // FFmpeg를 사용하여 동영상 파일을 변환하고 용량을 줄임
		                FFmpegWrapper.processVideo(tempDirectory, tempFilePath);
		                
		                // 변환된 파일을 thisPath에 저장
		                File convertedFile = new File(tempFilePath); // 변환된 파일
		                String destinationPath = thisPath + changeName; // 저장할 경로
		                
		                // 파일을 thisPath에 복사
		                Files.copy(convertedFile.toPath(), new File(destinationPath).toPath(), StandardCopyOption.REPLACE_EXISTING);
		                
		                // 변환된 파일을 삭제 (임시 파일은 더 이상 필요하지 않으므로 삭제합니다)
		                convertedFile.delete();
			        }
			        
			         * */
			        
					//파일 업로드 처리
			        multipartFile.transferTo(new File(absolutePath + thisPath + changeName));

					//업로드된 파일 정보 저장
					//[1] Map에 저장
			        Map<String, Object> resultMap = new HashMap<>();
			        if(path == "product") {
			        	resultMap.put("productImgModName", changeName);
						resultMap.put("productImgOriName", originName);
						resultMap.put("productImgPath", thisPath);
						if(index == 0) {
							resultMap.put("productImgLevel", "1");							
						} else {
							resultMap.put("productImgLevel", "2");		
						}
						resultMap.put("productNo", fkNum);
			        } else if(path == "board/video"){
			        	resultMap.put("videoModName", changeName);
						resultMap.put("videoOriName", originName);
						resultMap.put("videoPath", "/resources/images/board/video/" );
						resultMap.put("boardNo", fkNum);
			        } else {
			        	resultMap.put("boardImgModName", changeName);
						resultMap.put("boardImgOriName", originName);
						resultMap.put("boardImgPath", "/resources/images/board/");
						if(index == 0) {
							resultMap.put("boardImgLevel", "1");						
						} else {
							resultMap.put("boardImgLevel", "2");		
						}
						resultMap.put("boardNo", fkNum);
			        }
					
					//[2] 여러 개의 Map을 List에 저장
					list.add(resultMap);
				}
				index++;
			}

         return list;
   }
   
   
   private static String extractExt(String originName) {
      int cutPoint = originName.lastIndexOf(".");
      return originName.substring(cutPoint + 1);
   }
   
   private static String getChangeName(String originName) {
      SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmm");
      String changeName = simpleDateFormat.format(new Date()) + ((int)(Math.random() * 50)+1) + "." +  extractExt(originName);
      return changeName;
   }

}