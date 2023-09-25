package com.ds.dasony.calendar.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.calendar.model.dao.CalendarDao;
import com.ds.dasony.calendar.model.vo.Calendar;

@Service
public class CalendarServiceImpl implements CalendarService{

	private final CalendarDao calendarDao;
	
	@Autowired
	public CalendarServiceImpl(CalendarDao calendarDao) {
		this.calendarDao = calendarDao;
	}
	@Override
	public List<Calendar> calendarList(String region) {
		return calendarDao.calendarList(region);
	}
	@Override
	public int calendarInsert(Calendar localEvent) {
		return calendarDao.calendarInsert(localEvent);
	}
	@Override
	public int calendarAdmit(Map<String, String> request) {
		return calendarDao.calendarAdmit(request);
	}
	@Override
	public int calendarCancle(int calendarNo) {
		return calendarDao.calendarCancle(calendarNo);
	}

}
