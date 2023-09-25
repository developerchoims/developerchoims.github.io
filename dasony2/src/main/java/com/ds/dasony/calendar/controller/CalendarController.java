package com.ds.dasony.calendar.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.calendar.model.service.CalendarService;
import com.ds.dasony.calendar.model.vo.Calendar;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class CalendarController {
	
	private final CalendarService calendarService;
	
	@Autowired
	public CalendarController(CalendarService calendarService) {
		this.calendarService = calendarService;
	}

	@PostMapping("/calendarList")
	public Map<String, Object> calendarList(
			@RequestBody Map<String, String> userRegion
			){
		List<Calendar> calendars = new ArrayList();
		Map<String, Object> map = new HashMap();
		
		String region = userRegion.get("userRegion");
		log.info("지역={}",region);
		
		calendars = calendarService.calendarList(region);
		log.info(calendars.toString());
		
		if(calendars != null) {
			map.put("calendarList", calendars);
		} else {
			map.put("msg", "다시 시도해주세요.");
		}
		
		return map;
	}
	
	@PostMapping("/calendarInsert")
	public Map<String, String> calendarInsert(
			@RequestBody Calendar localEvent
			){
		Map<String, String> map = new HashMap();
		
		log.info("이거는 localEventMap ={} ",localEvent);
		
		int result = calendarService.calendarInsert(localEvent);
		
		if(result > 0 ) {
			map.put("msg", "지역 달력에 일정을 추가했습니다.");
		} 
		
		return map;
		
	}
	
	@PatchMapping("/calendarAdmit")
	public ResponseEntity<String> calendarAdmit(@RequestBody Map<String, String> request) {
	    try {
	    	
	        int result = calendarService.calendarAdmit(request);
	        
	        log.info("reqeust={}==================!!!!!!!!!!!!!",request);
	        
	        if(result > 0) {
	        	return ResponseEntity.ok("업데이트 성공");
	        } else {
	        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("업데이트 실패");
	        }
	        
	    } catch (Exception e) {
	    	
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 실패");
	    }
	}
	
	@DeleteMapping("/calendarCancle/{calendarNo}")
	public ResponseEntity<String> calendarCancle(@PathVariable int calendarNo){
		
		try {
			
			int result = calendarService.calendarCancle(calendarNo);
			
			log.info("request={}=======================!!!!!!!", calendarNo);
			
			if(result > 0) {
				return ResponseEntity.ok("삭제 성공");
			}	else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("삭제 실패");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패");
		}
	}
	
	
	
	
}
