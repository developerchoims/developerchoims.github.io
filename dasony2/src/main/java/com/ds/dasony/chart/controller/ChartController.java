package com.ds.dasony.chart.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.chart.model.service.ChartService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/chart")
public class ChartController {
	
	@Autowired
	ChartService chartService;

	@GetMapping("/makeChart")
	public List<Map<String, Object>> makeChart(@RequestParam String category){
//		log.info("category : " + category);
		
		if(category.toLowerCase().contains("user")) {
			return userChart();
		}else if(category.toLowerCase().contains("activity")) {
			return activityChart();
		}
		return null;
	}
	
	private List<Map<String, Object>> userChart(){
		/*
		 * -날짜 (일자 기준 2주)
		 * -수치 절대값 (가입수, 탈퇴수, 전체)
		 * -비율 (전체 대비 가입, 전체 대비 탈퇴) - percent 기준
		 * */
		
		List<Map<String, Object>> data = chartService.selectChartValue("user");
//		log.info("user chart data : " + data.toString());
		
		return data;
	}
	
	private List<Map<String, Object>> activityChart(){
		/*
		 * -날짜 (일자 기준 2주)
		 * -수치 절대값 (게시글 수, 기부글 수)
		 * -증감률 (전날 대비) - percent 기준
		 * */
		
		List<Map<String, Object>> data = chartService.selectChartValue("activity");
//		log.info("activity chart data : " + data.toString());
		
		return data;
	}
}
