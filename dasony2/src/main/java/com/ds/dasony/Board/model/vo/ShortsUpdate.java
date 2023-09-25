package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ShortsUpdate {
	private int boardNo;			//USER_NO
	private String boardTitle;		//BOARD_TITLE
	private String boardWriteDate;	//BOARD_VIEWS
	private String boardContent;
	private String boardKeyword;
	private String videoModName;
	private String videoPath;
}
