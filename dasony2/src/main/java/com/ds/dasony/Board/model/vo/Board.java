package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board {	
		private int boardNo;			//BOARD_NO
		private int userNo;				//USER_NO
		private String boardTitle;		//BOARD_TITLE
		private String boardWriteDate;	//BOARD_WRITE_DATE
		private int boardViews;			//BOARD_VIEWS
		private String boardContent;	//BOARD_CONTENT
		private String boardStatus;		//BOARD_STATUS
		private int boardCateNo;
		private String boardKeyword;

}
