package com.ds.dasony.calendar.model.service;


import java.util.List;
import java.util.Map;

import com.ds.dasony.calendar.model.vo.Calendar;

public interface CalendarService {

	public List<Calendar> calendarList(String region);

	public int calendarInsert(Calendar localEvent);

	public int calendarAdmit(Map<String, String> request);

	public int calendarCancle(int calendarNo);

	
}
