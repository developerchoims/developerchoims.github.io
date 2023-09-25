package com.ds.dasony.Board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ds.dasony.Board.model.dao.BoardDao;
import com.ds.dasony.Board.model.vo.Board;
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

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService {
   
   private final BoardDao boardDao;
   
   @Autowired
   public BoardServiceImpl(BoardDao boardDao) {
      this.boardDao = boardDao;
   }
   
   @Override
   public List<BoardExt> boardDailyList(String userRegion){
//      log.info("BoardService userNo = {}", );
      return boardDao.boardDailyList(userRegion);
   }
   

   @Transactional(rollbackFor = {Exception.class})// 어떤종류의 예외가 발생했든 발생했다면 무조건 rollback시키겠다.
   @Override
   public int insertBoard(BoardWriterForm boardWriterForm, List<BoardImg> bImg , BoardTag bt, String severFolderPath) throws Exception {
      int boardNo = boardDao.insertBoard(boardWriterForm);
      log.info(" boardServiceImpl insertBoard. boardNo = {}", boardNo);
      bt.setBoardTagBNo(boardNo);
      
      int result = 0;
      if(boardNo > 0 && !bImg.isEmpty()) {
         for(BoardImg b   :   bImg) {
            b.setBoardNoRef(boardNo);
         }
         result = boardDao.insertBoardImg(bImg);
         log.info("BoardService bImg = {}",bImg.toArray() );         
         if(result == 0) {// 이미지 삽입 실패시 강제 예외 발생
            throw new Exception("예외발생");
         }
         result = boardDao.insertBoardKeyword(bt);
         log.info("BoardService bt = {}",bt.toString() );
      }
      return result;
   }
   @Override
   public int boardDelete(int boardNo) {
      return boardDao.boardDelete(boardNo);
   }
   
   @Override
   public int insertBordViews(int boardNo) {
      return boardDao.insertBordViews(boardNo);
   }
   
   @Override
   public List<BoardDetailExt> boardDetail(int boardNo){
      return boardDao.boardDetail(boardNo);
   }
   
   @Override
   public BoardWriterForm boardEdit (int BoardNo){
      return boardDao.boardEdit(BoardNo);
   }
   
//   @Transactional(rollbackFor = {Exception.class})// 어떤종류의 예외가 발생했든 발생했다면 무조건 rollback시키겠다.
//   @Override
//   public int updateBoard(BoardWriterForm boardWriterForm, int boardNo){
//	   int result = boardDao.updateBoard(boardWriterForm ,boardNo);
//	      bt.setBoardTagBNo(boardNo);
//	      
//	      if(result > 0) {
//	         for(BoardImg b   :   bImg) {
//	            b.setBoardNoRef(boardNo);
//	         }
//	         result = boardDao.insertBoardImg(bImg);
//	         log.info("BoardService bImg = {}",bImg.toArray() );         
//	         if(result == 0) {// 이미지 삽입 실패시 강제 예외 발생
//	            throw new Exception("예외발생");
//	         }
//	         result = boardDao.insertBoardKeyword(bt);
//	         log.info("BoardService bt = {}",bt.toString() );
//	      }
//	      return result;
//   }
   
   @Override
      public int insertReply(Reply r, int userNo) {   
         int result = boardDao.insertReply(r,userNo);
         return result;
   }
   
   @Override
   public int serchHeart(BoardCare bc) {
      return boardDao.serchHeart(bc);
        
   }

   @Override
   public int insertHeart(BoardCare bc) {
      int result = boardDao.insertHeart(bc);
      return result;
   }
   @Override
   public int deleteHeart(BoardCare bc) {
      int result = boardDao.deleteHeart(bc);
      return result;
   }
   @Override
      public List<Reply> replySelect(int boardNo) {
         return boardDao.replySelect(boardNo);
      }

   @Override
   public List<BoardImg> boardImg(int boardNo) {
      return boardDao.boardImg(boardNo);
   }

   @Override
   public List<BoardVideo> boardVideo(int boardNo) {
      return boardDao.boardVideo(boardNo);
   }

   
   @Override
   public List<BoardExt> searchList(String userRegion,String btg,String btt ){
      return boardDao.searchList(userRegion, btg, btt );
   }
   @Override
   public List<BoardExt> nextBtn(Map<String, Object> data) {
      return boardDao.nextBtn(data);
   }
   @Override
   public List<BoardExt> backBtn(Map<String, Object> data) {
      return boardDao.backBtn(data);
   }

   @Override
   public int removeReply(int replyNo) {
      return boardDao.removeReply(replyNo);
   }
   
	@Override
	public List<BoardWeather> weatherList() {
		return boardDao.weatherList();
	}
	@Override
	public List<BoardBest> bestList() {
		return boardDao.bestList();
	}
	@Override
	public List<BoardShorts> shortsList() {
		return boardDao.shortsList();
	}
	@Override
	public List<BoardVsList> vsList() {
		return boardDao.vsList();
	}
	@Override
	public List<BoardBest> localList() {
		return boardDao.localList();
	}

      
      // admin
      
      @Override
      public List<BoardExt> adminBoardList() {
         return boardDao.adminBoardList();
      }
      @Override
      public int addMinBoardDelete(int boardNo) {
         int result = 0;
         Board b = Board.builder().boardNo(boardNo).build();
          
         result = boardDao.addMinBoardDelete(boardNo);
         if(result >0) {
            b = boardDao.selectBoardUserNo(boardNo);
         }
         if(b != null) {
            Map<String, Object> map = new HashMap();
             map.put("boardNo", boardNo);
             map.put("userNo", b.getUserNo());
             
             result += boardDao.addMinBoardDeleteAlert(map);
         }
         return result;
          
          
      }


	
	@Override
	public int insertBoardExp(BoardWriterForm boardWriterForm) {
		
		return boardDao.insertBoardExp(boardWriterForm);
		
	}





}