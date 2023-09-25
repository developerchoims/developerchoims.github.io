package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor // 모든 생성자...
@NoArgsConstructor 	// 생성자 없어도 쓸수있게 자동 생성
@Builder
@Data
public class BoardImg {
	private	int boardImgNo;				//BOARD_IMG_NO
	private String boardImgModName;		//BOARD_IMG_MOD_NAME
	private String boardImgOriName;		//BOARD_IMG_ORI_NAME
	private String boardImgPath;		//BOARD_IMG_PATH
	private String boardImgUploadDate;	//BOARD_IMG_UPLOAD_DATE
	private int boardImgLevel;		//BOARD_IMG_LEVEL
	private String boardImgStatus;		//BOARD_IMG_STATUS
	
	private int boardNoRef; //BOARD_NO
	private int userNoRef; //USER_NO
	

}
