package com.ds.dasony.event.model.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class EventJoin {
	private String userName;
	private int count;
	private String tdyCheck;
	private Date endDate;
}
