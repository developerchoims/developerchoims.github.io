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
public class BoardShorts {
	private int boardNo;
	private int interestCount;
	private int orderMap;
	private Board board;
	private User user;
	private BoardVideo boardVideo;
}
