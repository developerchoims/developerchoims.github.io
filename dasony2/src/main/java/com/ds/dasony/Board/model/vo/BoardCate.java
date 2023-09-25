package com.ds.dasony.Board.model.vo;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BoardCate {
	private int boardCateNo; //BOARD_CATE_NO
	private String boardBigCate;	//BOARD_BIG_CATE
	private String boardMiddleCate;	//BOARD_MIDDLE_CATE
	private String boardSmallCate;	//BOARD_SMALL_CATE
}
