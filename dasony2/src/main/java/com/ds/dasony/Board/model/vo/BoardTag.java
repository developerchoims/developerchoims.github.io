package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BoardTag {

	private String boardTag;	//BOARD_TAG
	private int boardTagBNo; // BOARD_NO
}
