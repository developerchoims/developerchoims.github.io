package com.ds.dasony.calendar.model.vo;

import java.sql.Date;

import com.ds.dasony.member.model.vo.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Calendar {
	private int calendarNo;
	private String calendarName;
	private String calendarDate;
	private String calendarPlace;
	private String calendarSpec;
	private String calendarCate;
	private String calendarLocation;
	private String calendarStatus;
	private long userNo;
	private String userId;
}
