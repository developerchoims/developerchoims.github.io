package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardCare {
	
	private int bCareBoardNo; //BOARD_NO
	private int bCareUserNo; //USER_NO
	private int userViewCount;//USER_VIEW_COUNT
}
