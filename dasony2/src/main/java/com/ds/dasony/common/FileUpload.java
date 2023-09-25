package com.ds.dasony.common;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class FileUpload {
	String absolutePath = new File("").getAbsolutePath() + "\\";
//	private final String filePath = "src/main/resources/images/";
	private final String filePath = "src/main/webapp/resources/images/";
	
	/**
	 * -- 지현(본인이 사용하려고 한 것으로 필요한 함수는 해당 클래스에 추가해서 사용)
	 * @param multiFile : file for upload
	 * @param request : to find this project absolute path
	 * @param path : the dir to upload file
	 * @return : String changeName(변경된 파일명)
	 * @throws IOException
	 */
	public String uploadFile(MultipartFile multiFile, HttpServletRequest request, String path) throws IOException{
		String changeName = "";
		String thisPath = filePath + path + "/"; 

		if(multiFile != null) {
			String originName = multiFile.getOriginalFilename();
			
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
			changeName = simpleDateFormat.format(new Date()) + ((int)(Math.random() * 10)+1) + "." +  extractExt(originName);
		
			File dir = new File(thisPath);
	        if (!dir.exists()) {
	            dir.mkdirs();
	        }
//			log.info(absolutePath + thisPath);
			
			multiFile.transferTo(new File(absolutePath + thisPath + changeName));
		}
		
		return changeName;
	}
	
	private String extractExt(String originName) {
		int cutPoint = originName.lastIndexOf(".");
		return originName.substring(cutPoint + 1);
	}
}
