package com.ds.dasony.donation.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Donation {

private int donaNo;//	DONA_NO 기부 글 번호
private String donaContent;//	DONA_CONTENT 내용
private String donaTitle;//	DONA_TITLE
private Date donaWriteDate;//	DONA_WRITE_DATE 작성 날짜
private String donaName;//	DONA_NAME
private Date donaEndDate;//	DONA_END_DATE 마감일
private int donaAchieve;//	DONA_ACHIEVE 달성률
private int donaTotalAmount;//	DONA_TOTAL_AMOUNT 총 금액
private int donaTargetAmount;//	DONA_TARGET_AMOUNT 목표 금액
private String donaSelectArea;//	DONA_SELECT_AREA 기부 글 지역
}
