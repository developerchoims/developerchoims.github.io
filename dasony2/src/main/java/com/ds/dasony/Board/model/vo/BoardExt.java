package com.ds.dasony.Board.model.vo;

import com.ds.dasony.member.model.vo.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BoardExt extends Board{
	
	private User user;
	private BoardVideo boardVideo;
	private BoardImg boardImg;
	private BoardCate boardCate;
	private BoardCare boardCare;
//	private int userViewCount;//USER_VIEW_COUNT
	//private int replyCount;//REPLY_COUNT
	private BoardTag boardTag;
	private Reply reply;
	private String userRegion;

}
