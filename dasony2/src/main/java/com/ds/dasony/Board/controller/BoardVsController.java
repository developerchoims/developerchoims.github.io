package com.ds.dasony.Board.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.Board.model.service.BoardVsService;
import com.ds.dasony.Board.model.vo.BoardDetailExt;
import com.ds.dasony.Board.model.vo.BoardVs;
import com.ds.dasony.Board.model.vo.BoardVsVote;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class BoardVsController {
	
	private final BoardVsService boardVsService;
	
	@Autowired
	public BoardVsController(BoardVsService boardVsService) {
		this.boardVsService = boardVsService;
	}
	
	@PostMapping("/boardVsInsert")
	public ResponseEntity<String> boardVsInsert (@RequestBody BoardVs boardVs){
		log.info("boardVs값 : {}", boardVs.getUserNo());
		int result1 = boardVsService.boardVsInsert(boardVs);
		
		if(result1 > 0) {
			return ResponseEntity.ok("글을 작성하였습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("다시 시도해주세요.");
		}
	}
	
	@PostMapping("/optionPm")
	public ResponseEntity<String> optionPm(@RequestBody Map<String, String>map){
		log.info("map값 확인,{}", map);
		
		int result = boardVsService.optionPm(map);
		
		if(result > 0) {
			return ResponseEntity.ok("투표 완료");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("투표 실패");
		}
	}
	
	@PostMapping("/vsOption")
	public void vsOption(@RequestBody Map<String, String>map){
		int result = boardVsService.vsOption(map);
		
	}
	
	@PostMapping("/voteList")
	public ResponseEntity<List> voteList (@RequestBody int boardNo){
		List<BoardVsVote> voteList = new ArrayList();
		voteList = boardVsService.voteList(boardNo);
		log.error("voteList={},", voteList);
		return ResponseEntity.ok(voteList);
	}
	
	@PostMapping("/vsUpdate")
	public ResponseEntity<BoardVs> vsUpdate (@RequestBody Map<String, String>map){
		int boardNo = Integer.parseInt(map.get("boardNo"));
		BoardVs boardVs = boardVsService.vsUpdate(boardNo);
		return ResponseEntity.ok(boardVs);
	}

	@PostMapping("/vsUpdateSub")
	public ResponseEntity<String> vsUpdateSub (@RequestBody BoardVs boardVs){
		int result = boardVsService.vsUpdateSub(boardVs);
		if(result > 0 ) {
			return ResponseEntity.ok("게시글을 수정하셨습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("게시글 수정에 실패하였습니다.");
					
		}
	}
	

}
