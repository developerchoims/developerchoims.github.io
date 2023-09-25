package com.ds.dasony.service.notice.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notice {

	private int no;
	private String category;
	private String title;
	private String content;
	private Date writeDate; // 작성일
	private Date modifyDate; // 최종 수정일

}
