package com.ds.dasony.Board.controller;


import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ds.dasony.Board.model.service.BoardService;
import com.ds.dasony.Board.model.vo.BoardBest;
import com.ds.dasony.Board.model.vo.BoardCare;
import com.ds.dasony.Board.model.vo.BoardDetailExt;
import com.ds.dasony.Board.model.vo.BoardExt;
import com.ds.dasony.Board.model.vo.BoardImg;
import com.ds.dasony.Board.model.vo.BoardShorts;
import com.ds.dasony.Board.model.vo.BoardTag;
import com.ds.dasony.Board.model.vo.BoardVideo;
import com.ds.dasony.Board.model.vo.BoardVsList;
import com.ds.dasony.Board.model.vo.BoardWeather;
import com.ds.dasony.Board.model.vo.BoardWriterForm;
import com.ds.dasony.Board.model.vo.Reply;
import com.ds.dasony.common.BoardUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/board") // 공통주소
// 현재 컨트롤러 호출시 /spring/board의 경로로 들어오는 모든 url요청을 받아준다.
//@SessionAttributes({ "loginUser" })
public class BoardController {
	
	
	private final BoardService boardService;

	@Autowired
	public BoardController (BoardService boardService) {
		this.boardService = boardService;
	}
	
	@Autowired
	private ServletContext application;
	
//	 @Value("${part.upload.path}")
//	 private String uploadPath;
	
	
	@GetMapping(value = {"/general/daily","/general/interest","/info/jmt","/info/fashion","/info/local"})
	public List<BoardExt> boardDailyList(@RequestParam(name = "userRegion",required = false)String userRegion) {
		
		List<BoardExt> bListMap = null; // 초기화

		bListMap = boardService.boardDailyList(userRegion); // 게시글 목록 가져오기
		log.info("bListMap = {}", bListMap);

		return bListMap;
	}

	@PostMapping(value = {"/general/daily/dwriter","/general/interest/dwriter","/info/jmt/dwriter","/info/fashion/dwriter","/info/local/dwriter"})	    
	public String insertBoard(HttpServletRequest request,
								BoardWriterForm boardWriterForm,
								 @RequestParam("file") List<MultipartFile> boardImgFiles,
								 @RequestParam("boardWriteDate") String boardWriteDate,
								 @RequestParam("boardTag")String boardTag
					         ) {

	        String webPath = "/resources/images/board/";
	        String severFolderPath = application.getRealPath(webPath);
	        
	        int result5 = boardService.insertBoardExp(boardWriterForm);
	        log.info("severFolderPath = {} ", severFolderPath);
	        
	        // 디렉토리 생성
			File dir = new File(severFolderPath);
			if (!dir.exists()) {
				dir.mkdirs();
			}

	        List<BoardImg> bImg = new ArrayList<BoardImg>();
	        BoardTag bt = new BoardTag();
	        bt.setBoardTag(boardTag.replace("\"", ""));
	        
	        int level = 0;
	        for (MultipartFile file : boardImgFiles) {
	    	   level++;
	            if (file.isEmpty())
	                continue;

	            String boardImgModName = BoardUtils.saveFile(file, severFolderPath);
	            BoardImg bi = BoardImg.
	            			  builder().
	            			  boardImgModName(boardImgModName).
	            			  boardImgOriName(file.getOriginalFilename()).
	            			  boardImgLevel(level).
	            			  boardImgUploadDate(boardWriterForm.getBoardWriteDate()).
	            			  userNoRef(boardWriterForm.getUserNo()).
	            			  boardImgStatus("Y").
	            			  boardImgPath(webPath).build();
	            bImg.add(bi);

	            log.info("Uploaded file name = {}", file.getOriginalFilename());
		        log.info("boardWriterForm = {}",boardWriterForm);
		        log.info("bImg = {}",bImg);
		        log.info("bt = {}",bt);
		     
//	            log.info("Content type: {}", file.getContentType());
//	            log.info("File size: {}", file.getSize());
//	            log.info("boardWriteDate: {}", boardWriteDate);
	        }
	        int result = 0;
	        String m = "";
	        try {
	        	result = boardService.insertBoard(boardWriterForm, bImg, bt, severFolderPath);
	        } catch (Exception e) {
	            log.error("error = {}", e.getMessage());
	        }
	        if (result > 0) {
	            log.info("게시글 등록 성공",result);
	            return m ="게시글 등록 성공";
	        } else {
	        	log.info("게시글 등록 실패",result);
	            return m ="게시글 등록 실패";
			}

	}
	
	@GetMapping("/boardViewsCount")
	public String boardViewsCount(@RequestParam("boardNo") int boardNo) {
		int count = boardService.insertBordViews(boardNo);	
		String m = "";
		if(count >0) {
			m = "조회수 업데이트 성공";
			log.info("views count 성공 = {}",count);
		}else {
			log.info("views count 실패 = {}",count);
			m = "조회수 업데이트 실패";
		}
		return m;
	}

	@GetMapping(value = { "/share/list/{boardNo}", "/general/daily/detail/{boardNo}","/general/interest/detail/{boardNo}","/info/jmt/detail/{boardNo}","/info/fashion/detail/{boardNo}","/info/local/detail/{boardNo}"})	    
	public Map<String, Object> boardDetail(@PathVariable("boardNo") int boardNo) {
		Map<String, Object> bDetailListMap = new HashMap(); // 초기화
				
		List<BoardDetailExt> bde = boardService.boardDetail(boardNo); // 게시글 목록 가져오기
		log.info("{}",boardNo);
		log.info("bde:{}", bde);
		 // rUserNo 값을 저장할 리스트
	    List<Reply> rUserNoList = new ArrayList<Reply>();
	    
	    rUserNoList = boardService.replySelect(boardNo);
	    
	    bDetailListMap.put("boardData", bde);
	    bDetailListMap.put("replyList", rUserNoList);
	    log.info("맵 확인.{}",bDetailListMap);
		return bDetailListMap;
		
	}

	@GetMapping(value = {"/general/daily/edit/{boardNo}","/general/interest/edit/{boardNo}","/info/jmt/edit/{boardNo}","/info/fashion/edit/{boardNo}","/info/local/edit/{boardNo}"})	    
	public BoardWriterForm boardEditList(@PathVariable int boardNo) {
		BoardWriterForm bEditListMap = null; // 초기화

		bEditListMap = boardService.boardEdit(boardNo); // 게시글 목록 가져오기
		log.info("boardDetail bEditListMap = {}", bEditListMap);

		return bEditListMap;
	}
	
	@PostMapping(value = {"/reply"})	    
	public String insertReply(HttpServletRequest request, 
								Reply reply, 
								@RequestParam("boardNo")int boardNo, 
								@RequestParam("userNo")int userNo
								) {
		

		Reply r = Reply.
	              builder().
	              replyContent(reply.getReplyContent()).
	              replyWriteDate(reply.getReplyWriteDate()).
	              replyStatus("Y").
	              rBoardNo(boardNo).
	              rUserNo(userNo).
	              mainReplyNo(reply.getMainReplyNo()).
	              replyLevel(reply.getReplyLevel())
	              .build();
				
		int result = 0;
		String m = "";
		result = boardService.insertReply(r,userNo); // 게시글 목록 가져오기
		if(result > 0) {
			log.info("답글 등록 성공 = {}",result);
			return m = "답글 등록 성공";
		}else {
			log.info("답글 등록 실패 = {}",result);
			return m = "답글 등록 실패";
		}
	}

	
	@GetMapping("/serchHeart")
	public String serchHeart(@RequestParam("boardNo") int boardNo, @RequestParam("userNo") int userNo) {
		BoardCare bc = BoardCare.builder().bCareBoardNo(boardNo).bCareUserNo(userNo).build();
		int result = 0;
		result = boardService.serchHeart(bc);
		String m = "";
		if(result > 0) {
			m = "true";
		}else {
			m = "";
		}
		return m; 
	}
	
	@PostMapping("/insertHeart")
	public String insertHeart(@RequestParam("boardNo") int boardNo, @RequestParam("userNo") int userNo) {
		BoardCare bc = BoardCare.builder().bCareBoardNo(boardNo).bCareUserNo(userNo).build();
		int result = 0;
		String m = "";
		result = boardService.insertHeart(bc);
		if(result >0) {
			log.info("좋아요 등록 성공 = {}",result);
			return m = "좋아요 등록 성공";
		}else {
			log.info("좋아요 등록 실패 = {}",result);
			return m = "좋아요 등록 실패";
		}
		
	}
	@DeleteMapping("/deleteHeart")
	public String deleteHeart(@RequestParam("boardNo") int boardNo, @RequestParam("userNo") int userNo) {
		
		BoardCare bc = BoardCare.builder().bCareBoardNo(boardNo).bCareUserNo(userNo).build();
		int result = 0;
		String m = "";
		result = boardService.deleteHeart(bc);
		if(result >0) {
			log.info("좋아요 등록 성공 = {}",result);
			return m = "좋아요 삭제 성공";
		}else {
			log.info("답글 등록 실패 = {}",result);
			return m = "좋아요 등록 실패";
		}
		
	}
	   @GetMapping(value = {"/searchList"})
	   public List<BoardExt> searchList(HttpServletRequest request, 
	                            BoardExt boardExt, 
	                           @RequestParam(name = "userRegion",required = false)String userRegion,
	                           @RequestParam(name = "boardTag",required = false)String boardTag,
	                           @RequestParam(name = "boardTitle",required = false)String boardTitle,
	                           @RequestParam(name = "boardContent",required = false)String boardContent                        
	                           ) {
	      // 이거 클라이언트에서 값이 안들어온 null값들어옴 
	      log.info("userRegion {}",userRegion);
	      log.info("boardTag {}",boardTag);
	      log.info("boardTitle {}",boardTitle);
	      log.info("boardContent {}",boardContent);
	      log.info("boardExt {}",boardExt);
	      List<BoardExt> bListMap = null; // 초기화

	      String btg = boardTag;
	      String btt = boardTitle;

	      bListMap = boardService.searchList(userRegion, btg,btt ); // 게시글 목록 가져오기
	      log.info("bListMap = {}", bListMap);

	      return bListMap;
	   }
	
		
	@PostMapping("/nextBtn/{boardNo}/{boardMiddleCate}")
	public List<BoardExt> nextBtn(@PathVariable("boardMiddleCate")String boardMiddleCate,
										@PathVariable("boardNo") int boardNo
										){
		Map<String, Object> data = new HashMap();
		data.put("boardMiddleCate", boardMiddleCate);
		data.put("boardNo", boardNo);
		
		log.info("boardMiddleCate {}",boardMiddleCate);
		log.info("boardNo {}",boardNo);
	
		
		Map<String, Object> map = new HashMap();
		log.info("nextBtn 값 확인 {}",data);
		int resultBoardNo = 0;
		List<BoardExt> bListMap = null; // 초기화
		
		bListMap = boardService.nextBtn(data);
		return bListMap;
	}
	
	@PostMapping("/backBtn/{boardNo}/{boardMiddleCate}")
	public List<BoardExt> backBtn(@PathVariable("boardMiddleCate")String boardMiddleCate,
										@PathVariable("boardNo") int boardNo
										){
		Map<String, Object> data = new HashMap();
		data.put("boardMiddleCate", boardMiddleCate);
		data.put("boardNo", boardNo);
		
		log.info("backBtn 값 확인 {}",data);
		
		List<BoardExt> bListMap = null; // 초기화
		bListMap = boardService.backBtn(data);

		return bListMap;
	}
	

	@PostMapping("/removeReply")
	public ResponseEntity<String> removeReply(@RequestBody int replyNo){
		log.info("댓글 번호확인{}",replyNo);
		int result = boardService.removeReply(replyNo);
		if(result > 0 ) {
			return ResponseEntity.ok("댓글을 삭제하였습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("댓글 삭제를 실패하였습니다.");
		}
	}
	
    @GetMapping("/boardDelete/{boardNo}")
    public String boardDelete(@PathVariable("boardNo")int boardNo) {
       String m = "";
       int result = 0;
       result = boardService.boardDelete(boardNo);
       if(result >0) {
          log.info("게시글 삭제 성공");
          m = "게시글 삭제 성공";
       }else {
          log.info("게시글 삭제 실패");
          m = "게시글 삭제 실패";
       }
       return m;
    }
	
	@PostMapping("/boardImg")
	   public ResponseEntity<List<BoardImg>> boardImg(@RequestBody int boardNo){
	      List<BoardImg> img = boardService.boardImg(boardNo);
	      log.info("이미지 리스트{},", img);
	      return ResponseEntity.ok(img);
	   }
	   
	   @PostMapping("/boardVideo")
	   public ResponseEntity<List<BoardVideo>> boardVideo(@RequestBody int boardNo){
	      List<BoardVideo> video = boardService.boardVideo(boardNo);
	      log.info("비디오 리스트{},", video);
	      return ResponseEntity.ok(video);
	   }
	  
	   @PostMapping("/weatherList")
	   public ResponseEntity<List<BoardWeather>> weatherList(){
		   List<BoardWeather> list = new ArrayList();
		   list = boardService.weatherList();
		   log.info("weatherList{}", list);
		   if(list != null) {
			   return ResponseEntity.ok(list);
		   } else {
			   return null;
		   }
	   }
	   @PostMapping("/bestList")
	   public ResponseEntity<List<BoardBest>> bestList(){
		   List<BoardBest> list = new ArrayList();
		   list = boardService.bestList();
		   log.info("bestList{}", list);
		   if(list != null) {
			   return ResponseEntity.ok(list);
		   } else {
			   return null;
		   }
	   }
	   @PostMapping("/shortsList")
	   public ResponseEntity<List<BoardShorts>> shortsList(){
		   List<BoardShorts> list = new ArrayList();
		   list = boardService.shortsList();
		   log.info("shortsList{}", list);
		   if(list != null) {
			   return ResponseEntity.ok(list);
		   } else {
			   return null;
		   }
	   }
	   @PostMapping("/vsList")
	   public ResponseEntity<List<BoardVsList>> vsList(){
		   List<BoardVsList> list = new ArrayList();
		   list = boardService.vsList();
		   log.info("vsList{}", list);
		   if(list != null) {
			   return ResponseEntity.ok(list);
		   } else {
			   return null;
		   }
	   }
	   @PostMapping("/localList")
	   public ResponseEntity<List<BoardBest>> localList(){
		   List<BoardBest> list = new ArrayList();
		   list = boardService.localList();
		   log.info("localList{}", list.get(0).getBoard().getBoardCateNo());
		   if(list != null) {
			   return ResponseEntity.ok(list);
		   } else {
			   return null;
		   }
	   }
	   @PostMapping("/edit/{boardNo}")
	   public String updateBoard(
								   HttpServletRequest request,
								   BoardWriterForm boardWriterForm,
								   @PathVariable("boardNo") int boardNo,
								 @RequestParam("file") List<MultipartFile> boardImgFiles,
								 @RequestParam("boardWriteDate") String boardWriteDate,
								 @RequestParam("boardTag")String boardTag
								) {

		String webPath = "/resources/images/board/";
		String severFolderPath = application.getRealPath(webPath);
		
		log.info("severFolderPath = {} ", severFolderPath);
		
		// 디렉토리 생성
		File dir = new File(severFolderPath);
		if (!dir.exists()) {
		dir.mkdirs();
		}
		
		List<BoardImg> bImg = new ArrayList<BoardImg>();
		BoardTag bt = new BoardTag();
		bt.setBoardTag(boardTag.replace("\"", ""));
		
		int level = 0;
		for (MultipartFile file : boardImgFiles) {
		level++;
		if (file.isEmpty())
		continue;
		
		String boardImgModName = BoardUtils.saveFile(file, severFolderPath);
		BoardImg bi = BoardImg.
			  builder().
			  boardImgModName(boardImgModName).
			  boardImgOriName(file.getOriginalFilename()).
			  boardImgLevel(level).
			  boardImgUploadDate(boardWriterForm.getBoardWriteDate()).
			  userNoRef(boardWriterForm.getUserNo()).
			  boardImgStatus("Y").
			  boardImgPath(webPath).build();
		bImg.add(bi);
		
		log.info("Uploaded file name = {}", file.getOriginalFilename());
		log.info("boardWriterForm = {}",boardWriterForm);
		log.info("bImg = {}",bImg);
		log.info("bt = {}",bt);
		
		//log.info("Content type: {}", file.getContentType());
		//log.info("File size: {}", file.getSize());
		//log.info("boardWriteDate: {}", boardWriteDate);
		}
		int result = 0;
		String m = "";
		try {
//		result = boardService.updateBoard(boardWriterForm,boardNo);
		} catch (Exception e) {
		log.error("error = {}", e.getMessage());
		}
		if (result > 0) {
		log.info("게시글 등록 성공",result);
		return m ="게시글 등록 성공";
		} else {
		log.info("게시글 등록 실패",result);
		return m ="게시글 등록 실패";
		}
		
		}
	
	
}
	
	

