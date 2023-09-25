package com.ds.dasony.Board.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.Board.model.service.BoardShService;
import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.Board.model.vo.ShortsUpdate;
import com.ds.dasony.common.MisunFileUpload;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class BoardShController {
	
	private final BoardShService boardShService;
	@Autowired
	public BoardShController(BoardShService boardShService) {
		this.boardShService = boardShService;
	}
	
	@PostMapping("/addBoardSh")
	public String BoardSh(
			HttpServletRequest httpServletRequest,
            @RequestPart(value = "boardSh") Board board) {
		log.info("board: {}=================>>>>>>>>>>///////////",board);
		// 파일 업로드 처리
	    List<Map<String, Object>> uploadedFileName = new ArrayList<>();
	    try {
	    	/*게시글 정보 추가*/
	    	int boardResult = boardShService.addBoardSh(board);
	    	
	    	/*request변환*/
    		int boardno = boardShService.findBoardNo(board);
    		String boardNo = String.valueOf(boardno);
    		log.info("boardNo: {}=================>>>>>>>>>>///////////", boardNo);
    		log.info("파일 업로드 실행 확인 - 컨트롤러");
	        uploadedFileName = MisunFileUpload.mulitiFileUpload(httpServletRequest, boardNo, "board/video");
	        for(Map map : uploadedFileName) {
	        	map.put("videoUploadDate", board.getBoardWriteDate());
	        	map.put("userNo", board.getUserNo());
	        }
	        log.info("확인{}",uploadedFileName.get(0) );
	        log.info("uploadedFileName: {}=================>>>>>>>>>>///////////", uploadedFileName);
	        
	       
	        int imgResult = boardShService.addBoardVedio(uploadedFileName);
	        
	        
	        return "다쇼츠 업로드 성공";
	        
	    } catch (IOException e) {
	    	
	        e.printStackTrace();
	        return "다쇼츠 업로드 실패";
	    }
	}
	
	@PostMapping("/shortsUpdate")
	public ResponseEntity<Object> shortsUpdate (@RequestBody Map<String, String>map){
		int boardNo = Integer.parseInt(map.get("boardNo"));
		ShortsUpdate boardSh = boardShService.shortsUpdate(boardNo);
		return ResponseEntity.ok(boardSh);
	}
	

	@PostMapping("/shUpdateSub")
	public String shUpdateSub(
			HttpServletRequest httpServletRequest,
            @RequestPart(value = "boardSh") Board board) {
		log.info("board: {}=================>>>>>>>>>>///////////",board);
		// 파일 업로드 처리
	    List<Map<String, Object>> uploadedFileName = new ArrayList<>();
	    try {
	    	/*게시글 정보 업데이트*/
	    	int boardResult = boardShService.shUpdateSub(board);
	    	log.info("boardResult결과 확인: {}=================>>>>>>>>>>///////////", boardResult);
	    	/*비디오 삭제*/
	    	int videoResult = boardShService.videoDelete(board);
	    	log.info("videoResult결과 확인: {}=================>>>>>>>>>>///////////", videoResult);
	    	/*request변환*/
    		int boardno = board.getBoardNo();
    		String boardNo = String.valueOf(boardno);
    		log.info("boardNo: {}=================>>>>>>>>>>///////////", boardNo);
    		log.info("파일 업로드 실행 확인 - 컨트롤러");
	        uploadedFileName = MisunFileUpload.mulitiFileUpload(httpServletRequest, boardNo, "board/video");
	        for(Map map : uploadedFileName) {
	        	map.put("videoUploadDate", board.getBoardWriteDate());
	        	map.put("userNo", board.getUserNo());
	        }
	        log.info("확인{}",uploadedFileName.get(0) );
	        log.info("uploadedFileName: {}=================>>>>>>>>>>///////////", uploadedFileName);
	        
	       
	        int imgResult = boardShService.addBoardVedio(uploadedFileName);
	        
	        
	        return "다쇼츠 업로드 성공";
	        
	    } catch (IOException e) {
	    	
	        e.printStackTrace();
	        return "다쇼츠 업로드 실패";
	    }
	}
}
