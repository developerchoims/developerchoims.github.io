package com.ds.dasony;

public class Utils {
	
	public static String XSSHandling(String content) {
		if(content != null) {
			content = content.replaceAll("&", "&amp;");
			content = content.replaceAll("<", "&lt;");
			content = content.replaceAll(">", "&gt;");
			content = content.replaceAll("\"", "&quot;"); // \역슬래쉬 뒤에 오는 문자는 무시 "를 더 추가해주면 됨
		}
		return content;
	}
	// 개행문자 처리
	public static String newLineHandling(String content) {
		return content.replaceAll("\r\n|\r|\n|\n\r", "<br>");
	}
	
	// 개행문자 해제
	public static String newLineClear(String content) {
		return content.replaceAll("<br>", "\n");
	}
}
