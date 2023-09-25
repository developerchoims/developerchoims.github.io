package com.ds.dasony.share.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.Board.model.service.BoardService;
import com.ds.dasony.Board.model.service.BoardShService;
import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.common.MisunFileUpload;
import com.ds.dasony.share.model.service.ShareService;
import com.ds.dasony.share.model.vo.Share;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class ShareController {
	
	private final ShareService shareService;
	private final BoardService boardService;
	private final BoardShService boardShService;
	@Autowired
	public ShareController(ShareService shareService, BoardService boardService, BoardShService boardShService) {
		this.shareService = shareService;
		this.boardService = boardService;
		this.boardShService = boardShService;
	}
	
	@PostMapping("/share")
	public List<Share> shareList (@RequestBody Map<String,Object> map){
		List<Share> list = new ArrayList();
		list = shareService.shareList(map);
		log.info("list{}", list);
		return list;
	}
	
	@PostMapping("/shareAdd")
	public ResponseEntity<String> shareAdd(
		HttpServletRequest httpServletRequest,
	    @RequestPart(value = "share") Board board) {
		log.info("board: {}=================>>>>>>>>>>///////////", board);
		// 파일 업로드 처리
		List<Map<String, Object>> uploadedFileName = new ArrayList<>();
		try {
			/*게시글 정보 추가*/
	    	int boardResult = shareService.shareAdd(board);
	    	
	    	/*request변환*/
    		int boardno = boardShService.findBoardNo(board);
    		String boardNo = String.valueOf(boardno);
    		log.info("productNo: {}=================>>>>>>>>>>///////////", boardNo);
	        uploadedFileName = MisunFileUpload.mulitiFileUpload(httpServletRequest, boardNo, "board");
	        log.info("uploadedFileName: {}=================>>>>>>>>>>///////////", uploadedFileName);
	        for(Map map : uploadedFileName) {
	        	map.put("boardImgUploadDate", board.getBoardWriteDate());
	        	map.put("userNo", board.getUserNo());
	        }
	       
	        int imgResult = shareService.addShareImg(uploadedFileName);
		    
		    
		    return ResponseEntity.ok("게시글 추가 성공");
		    
		} catch (IOException e) {
			
		    e.printStackTrace();
		    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("게시글 추가 실패");
		}
	}
	
	
	
}
