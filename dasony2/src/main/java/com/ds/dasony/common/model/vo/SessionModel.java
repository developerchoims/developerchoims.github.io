package com.ds.dasony.common.model.vo;

import java.sql.Date;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class SessionModel {
	
	private String visitorIp; // ip
	private Date visitorTime; // 방문시간
	private String visitorRefer; // 방문 이전 사이트
	private String visitorAgent; // 브라우저 정보
	
}
