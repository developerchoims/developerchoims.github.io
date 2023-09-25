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
public class BoardWeather {
	private int boardNo;
	private Board board;
	private int interestCount;
	private int orderMap;
	private User user;
	private BoardImg boardImg;
}
