package com.ds.dasony.chart.model.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.chart.model.dao.ChartDao;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChartService {
	
	@Autowired
	ChartDao chartDao;

	public List<Map<String, Object>> selectChartValue(String category) {
		LocalDate now = LocalDate.now();
		LocalDate beforeDate = now.minusWeeks(2);
		beforeDate = beforeDate.plusDays(1);
		
		switch(category) {
		case "user" : return userChartValue(now, beforeDate);
		case "activity" : return activityChartValue(now, beforeDate);
		}
		return null;
	}
	
	private List<Map<String, Object>> userChartValue(LocalDate now, LocalDate beforeDate) {
		
		/*
		 * 값 저장 리스트
		 * 
		 * [ {date: "2023-09-01', value1: xx, ..}, {date: "2023-09-02", value1: xx, ...} ... ]
		 * */ 
		List<Map<String, Object>> list = new ArrayList(); 
		
		while(true) {
			if(beforeDate.isAfter(now)) break;
			Map<String, Object> data = new HashMap();
			
			// 전체 회원수 
			int total = chartDao.selectTotalUserCount(beforeDate.toString());
			// 접속자 수
			int totalVisit = chartDao.selectTotalVisitCount(beforeDate.toString());
			// 가입수
			Map<String, Object> param = new HashMap();
			param.put("date", beforeDate.toString());
			param.put("kind", "in");
			int value1 = chartDao.selectValueUserCount(param);
			// 탈퇴수
			param.put("kind", "out");
			int value2 = chartDao.selectValueUserCount(param);
			// rate calc
			// 전체 대비 가입 비율
			double rate1 = totalVisit!=0? Math.round((value1 / (double) totalVisit) * 100.0) / 100.0 * 100 : 0;
			// 전체 대비 탈퇴 비율
			double rate2 = total!=0? Math.round((value2 / (double) total) * 100.0) / 100.0 * 100 : 0;
			// 시리즈 이름
			String[] series = {"신규", "탈퇴"};
			
			data.put("date", beforeDate);
			data.put("total", total);
			data.put("totalVisit", totalVisit);
			data.put("value1", value1);
			data.put("value2", value2);
			data.put("rate1", rate1);
			data.put("rate2", rate2);
			data.put("seriesName", series);
			
//			log.info("data : " + data);
			list.add(data);
			
			beforeDate = beforeDate.plusDays(1);
			
		}
		return list;
	}

	private List<Map<String, Object>> activityChartValue(LocalDate now, LocalDate beforeDate) {
		// 전체 게시글 수(board 테이블) / 기부글 수(donation 테이블) / 증감률 
		// date, value1, value2 => key
		List<Map<String, Object>> list = new ArrayList(); 
		// 기간 첫날의 증감률 계산을 위해 15일치 데이터 준비
		beforeDate = beforeDate.minusDays(1);
		
		// 15days data set
		while(true) {
			if(beforeDate.isAfter(now)) break;
			Map<String, Object> data = new HashMap();
			
			int value1 = chartDao.selectValueBoardCount(beforeDate.toString());
			int value2 = chartDao.selectValueDonationCount(beforeDate.toString());
			
			data.put("date", beforeDate);
			data.put("value1", value1);
			data.put("value2", value2);
			
//			log.info("data : " + data);
			list.add(data);
			
			beforeDate = beforeDate.plusDays(1);
		}
		
//		log.info("calc before list :: " + list.toString());
		
		// rate calc -> ((오늘-어제)/어제)
		for(int i=1; i<list.size(); i++) { // 비율 계산을 위해 추가한 데이터 제외시키기
			// value1 rate
			int nowVal1 = (Integer)list.get(i).get("value1");
			int beforeVal1 = (Integer)list.get(i-1).get("value1");
			double rate1 = beforeVal1!=0? Math.round(((nowVal1 - beforeVal1) / (double) beforeVal1) * 100.0) / 100.0 * 100 : 0;
			
			// value2 rate
			int nowVal2 = (Integer)list.get(i).get("value2");
			int beforeVal2 = (Integer)list.get(i-1).get("value2");
			double rate2 = beforeVal2!=0? Math.round(((nowVal2 - beforeVal2) / (double) beforeVal2) * 100.0) / 100.0 * 100 : 0;
			
			list.get(i).put("rate1", rate1);
			list.get(i).put("rate2", rate2);
		}
		
		list.remove(0);
//		log.info("calc after list :: " + list.toString());
		
		return list;
	}
	
}
