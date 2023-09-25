package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class NestedReply {
	private int nReplyNo;			//N_REPLY_NO
	private int replyNoRef; 		//REPLY_NO
	private String nReplyContent;	//N_REPLY_CONTENT
	private String nReplyStatus; 	//N_REPLY_STATUS
	private String nReplyWriteDate;  //N_REPLY_WRITE_DATE
	private int nBoardNo;			//BOARD_NO
	private int nUserNo;			//USER_NO
	private String nUserNick; 		//USER_NICKNAME
	
	private String nUserNickProcessed; // REPLY_USER_NICKNAME 가공한 컬럼을 매핑하는 속성
}
