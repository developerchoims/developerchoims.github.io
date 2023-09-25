package com.ds.dasony.share.model.vo;

import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.Board.model.vo.BoardCare;
import com.ds.dasony.Board.model.vo.BoardCate;
import com.ds.dasony.Board.model.vo.BoardImg;
import com.ds.dasony.Board.model.vo.BoardTag;
import com.ds.dasony.member.model.vo.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Share {
	private int boardNo;
	private Board board;
	private BoardCate boardCate;
	private BoardImg boardImg;
	private User user;
	private BoardCare boardCare;
	private BoardTag boardTag;
	private int replyCount;
	private int userViewCount;
	
}
