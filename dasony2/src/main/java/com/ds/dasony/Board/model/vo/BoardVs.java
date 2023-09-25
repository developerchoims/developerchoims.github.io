package com.ds.dasony.Board.model.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardVs {
	private int boardNo;
	private long userNo;
    private String boardTitle;
    private String boardKeyword;
    private String boardContent;
    private String boardOptionLeft;
    private String boardOptionRight;
    private int boardCateNo;
    private String boardExpireDate;
    private int choiceLeft;
    private int choiceRight;		
	private String boardWriteDate;
}
