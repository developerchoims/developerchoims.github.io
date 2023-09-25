package com.ds.dasony.Board.model.vo;

import com.ds.dasony.member.model.vo.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardVsList {
	private int boardNo;
	private BoardVs boardVs;
	private int interestCount;
	private int orderMap;
	private User user;
	private int choiceLeft;
	private int choiceRight;
}
