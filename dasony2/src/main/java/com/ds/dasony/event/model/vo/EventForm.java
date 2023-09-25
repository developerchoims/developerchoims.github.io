package com.ds.dasony.event.model.vo;

import java.sql.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class EventForm {
	private String no;
	private String title;
	private String content;
	private Date startDate;
	private Date endDate;
	private Date winnerDate;
	private String videoLink;
	private String detailLink;
	private String pageLink;
//	private Date uploadDate;
	private String eventCategory; // 문화(c), 스토어(s), 포인트(p), 기타(e)
	private String winTime;
	
	private List<String> rewardNo;
	private List<String> rewardName;
	private List<String> brand;
	private List<String> rewardRange; // A(전체), S(일부) 경품 지급 범위
	private List<String> rewardCategory; // 포인트, 쿠폰(일반 상품도 쿠폰으로 분류)
	private List<String> rank;
	private List<String> amount;
	
	private MultipartFile thumbFile;
}
