package com.ds.dasony.service.notice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.service.notice.model.service.NoticeService;
import com.ds.dasony.service.notice.model.vo.Notice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/notice")
public class NoticeController {
	
	@Autowired
	private NoticeService nService;
	
	@PostMapping("/loadList") 
	public List<Notice> selectList(@RequestBody Map<String, Object> param){
		
//		log.info(param.toString());
		if(param.isEmpty()) param.put("category", "선택");
		
		List<Notice> result = nService.selectList(param);
		
//		int maxPage = result.
		
//		log.info(result.toString());
		
		return result;
	}

	@PostMapping("/addNotice")
	public String addNotice(@RequestBody Notice notice) {
//		log.info("추가할 메뉴" + notice.getCategory());
//		log.info("추가할 내용" + notice.getContent());
		
		try {
			int result = nService.addNotice(notice);
			
			if(result>0) return "성공적으로 등록하였습니다.";
			else return "다시 등록해주세요.";
		} catch (Exception e) {
			e.getStackTrace();
			return "예상치 못한 에러가 발생했습니다. 다시 시도해주세요.";
		}
	}
	
	@GetMapping("/delete/{no}")
	public Map<String, Object> deleteNotice(@PathVariable int no){
		Map<String, Object> res = new HashMap<>();
		
		int result = nService.deleteNotice(no);
		
		res.put("result", result);
		if(result>0) res.put("msg", "해당 공지를 삭제하였습니다.");
		else res.put("msg", "다시 시도해주세요.");
		
		return res;
	}
	
	@GetMapping("/noticeDetail/{no}")
	public Notice selectNotice(@PathVariable int no) {
		return nService.selectNotice(no);
	}
	
	@PostMapping("/modifyNotice/{no}")
	public String modifyNotice(@PathVariable int no, @RequestBody Notice notice){ 
		notice.setNo(no);
//		log.info(notice.toString());
		
		try {
			int result = nService.modifyNotice(notice);
			
			if(result>0) return "해당 공지를 수정하였습니다.";
			else return "다시 삭제 시도해주세요.";
		} catch (Exception e) {
			e.printStackTrace();
			return "예상치 못한 에러가 발생했습니다. 다시 시도해주세요.";
		}
	}
	
	@GetMapping("/noticeDetailList/{no}")
	public List<Notice> selectNoticeDetailList(@PathVariable int no){
//		System.out.println("================================================");
		List<Notice> list = nService.selectNoticeDetailList(no);
//		log.info(list.toString());
		return list;
	}
	
}
