package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Reply {
	private int replyNo; 			//REPLY_NO
	private String replyContent;	//REPLY_CONTENT
	private String replyStatus; 	//REPLY_STATUS
	private String replyWriteDate;  //REPLY_WRITE_DATE
	private int rBoardNo;			//BOARD_NO
	private int rUserNo;			//USER_NO
	private String rUserNick; 		//USER_NICKNAME
	private int mainReplyNo;		//MAIN_REPLY_NO
	private String replyLevel;			//REPLY_LEVEL
	
	private int replyCount;//REPLY_COUNT
	
	private String userLevel;
}

