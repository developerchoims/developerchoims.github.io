package com.ds.dasony.Board.model.vo;

import java.util.List;

import com.ds.dasony.member.model.vo.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BoardDetailExt extends Board{
	private User user;
	private BoardVideo boardVideo;
	private List<BoardImg> bImgList;
	private BoardCate boardCate;
	private int userViewCount;//USER_VIEW_COUNT
	private int replyCount;//REPLY_COUNT
	private BoardTag boardTag;
	private List<Reply> replyList;
	private BoardVs boardVs;
	private Board board;



}