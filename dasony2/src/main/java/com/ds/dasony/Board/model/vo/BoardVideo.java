package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor // 모든 생성자...
@NoArgsConstructor    // 생성자 없어도 쓸수있게 자동 생성
@Data
public class BoardVideo {
	private int videoNo;
	private String videoModName;
	private String videoOriName;
	private String videoPath;
	private String videoUploadDate;
	private int boardNo;
	private int userNo;

}