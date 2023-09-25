package com.ds.dasony.calendar.model.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.calendar.model.vo.Calendar;

@Repository
public class CalendarDao {
	
	private final SqlSessionTemplate session;
	
	@Autowired
	public CalendarDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<Calendar> calendarList(String region) {
		return session.selectList("calendarMapper.calendarList", region);
	}

	public int calendarInsert(Calendar localEvent) {
		return session.insert("calendarMapper.calendarInsert", localEvent);
	}

	public int calendarAdmit(Map<String, String> request) {
		return session.update("calendarMapper.calendarAdmit", request);
	}

	public int calendarCancle(int calendarNo) {
		return session.delete("calendarMapper.calendarCancle", calendarNo);
	}

}
