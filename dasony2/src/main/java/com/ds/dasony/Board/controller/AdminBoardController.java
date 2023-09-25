package com.ds.dasony.Board.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.Board.model.service.BoardService;
import com.ds.dasony.Board.model.vo.BoardExt;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/adminBoard") // 공통주소
public class AdminBoardController {
	private final BoardService boardService;

	@Autowired
	public AdminBoardController (BoardService boardService) {
		this.boardService = boardService;
	}
	
	@Autowired
	private ServletContext application;
	
	@GetMapping("/boardList")
	public List<BoardExt> addMinBoardDelete() {

		List<BoardExt> bListMap = null; // 초기화

		bListMap = boardService.adminBoardList(); // 게시글 목록 가져오기
		log.info("bListMap = {}", bListMap);

		return bListMap;
	}
	@PostMapping("/addMinBoardDelete")
	public String boardDelete(@RequestParam("boardNo") int boardNo) {
		 LocalDateTime currentTime = LocalDateTime.now();
         DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd HH:mm");
         String formattedTime = currentTime.format(formatter);
		
		String m = "";
		
		log.info("adming Delete 확인  boardNo :", boardNo);
		log.info("adming Delete 확인  boardNo :", boardNo);
		log.info("adming Delete 확인  formattedTime :", formattedTime);
		
		int result = 0;
		result  = boardService.addMinBoardDelete(boardNo);
		return m;
	}

	

}
