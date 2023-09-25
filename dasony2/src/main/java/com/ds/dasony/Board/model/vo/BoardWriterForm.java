package com.ds.dasony.Board.model.vo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor // 모든 생성자...
@NoArgsConstructor 	// 생성자 없어도 쓸수있게 자동 생성
@Data
public class BoardWriterForm {
	private int boardNo;			//BOARD_NO
	private int userNo;				//USER_NO
	private String boardTitle;		//BOARD_TITLE
	private String boardWriteDate;	//BOARD_WRITE_DATE
	private int boardViews;			//BOARD_VIEWS
	private String boardContent;	//BOARD_CONTENT
	private String boardStatus;		//BOARD_STATUS
	
	private	List<String>  boardImgNo;				//BOARD_IMG_NO
	private List<String>  boardImgModName = new ArrayList<String>();		//BOARD_IMG_MOD_NAME
	private List<String> boardImgOriName = new ArrayList<String>();		//BOARD_IMG_ORI_NAME
	private List<String> boardImgPath= new ArrayList<String>();		//BOARD_IMG_PATH
	private List<String> boardImgUploadDate = new ArrayList<String>();	//BOARD_IMG_UPLOAD_DATE
	private List<String> boardImgLevel= new ArrayList<String>();		//BOARD_IMG_LEVEL
//	private List<String> boardImgStatus;		//BOARD_IMG_STATUS
	
	private String boardTag;	//BOARD_TAG
	
	private int boardCateNo; //BOARD_CATE_NO
	//private String boardBigCate;	//BOARD_BIG_CATE
	//private String boardMiddleCate;	//BOARD_MIDDLE_CATE
	//private String boardSmallCate;	//BOARD_SMALL_CATE
	
	private List<MultipartFile> boardImgFiles = new ArrayList<MultipartFile>();
	
//	private List<String> replyNo; 		//REPLY_NO
//	private List<String> replyContent; 	//REPLY_CONTENT
//	private List<String> replyStatus; 	//REPLY_STATUS
//	private List<String> replyWriteDate; //REPLY_WRITE_DATE

	

}
