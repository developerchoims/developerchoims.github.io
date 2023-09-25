package com.ds.dasony.event.model.vo;

import java.sql.Date;
import java.util.ArrayList;
// import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

	private String no;
	private String title;
	private String content;
	private Date startDate;
	private Date endDate;
	private Date winnerDate;
	private String thumbnail;
	private String videoLink;
	private String detailLink;
	private String pageLink;
	private Date uploadDate;
	private String eventCategory; // 문화(c), 스토어(s), 포인트(p), 기타(e)
	private String winTime; // 일자(n), 즉시(y)-랜덤 포인트만, 복합(b)
}
