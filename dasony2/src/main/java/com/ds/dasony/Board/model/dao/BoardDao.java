package com.ds.dasony.Board.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
import com.ds.dasony.member.model.vo.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class BoardDao {
	private SqlSessionTemplate session;
	
	@Autowired
	public BoardDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<BoardExt> boardDailyList(String userRegion){
//		log.info("BoardDao boardDailyList, userRegion = {}", userRegion);
		return session.selectList("board.boardDailyList", userRegion);
	}
	
	public int insertBoard(BoardWriterForm boardWriterForm ) {
//		log.info("BoardDao insertBoard, b = {}", boardWriterForm.toString());
		int result = 0;
		result = session.insert("board.insertBoard",boardWriterForm);
		if(result > 0) {
			result = boardWriterForm.getBoardNo();
//			log.info("dao boardWriterForm.getBoardNo= {}",boardWriterForm.getBoardNo());
		}
		return result;
	}
	
	public int insertBoardImg(List<BoardImg> bImg) {
//		log.info("dao insertBoardImg bImg= {}",bImg);
		int result = 1;
		for(BoardImg  b:  bImg) {
			result *= session.insert("board.insertBoardImg",b);
		}
		return result;
	}
	
	public int insertBoardKeyword(BoardTag bt) {
//		log.info("dao insertBoardKeyword boardWriterForm = {}",bt);
		int result = 0;
		result = session.insert("board.insertBoardKeyword",bt);
		return result;
	}
	
	public int insertBordViews(int boardNo) {
		return session.update("board.insertBordViews", boardNo);
	}

	public int boardDelete(int boardNo) {
		return session.update("board.boardDelete",boardNo);
	}

	public List<BoardDetailExt> boardDetail(int BoardNo){
		log.info("BoardDao boardDetail, BoardNo = {}", BoardNo);

		return session.selectList("board.boardDetail", BoardNo);
	}
	
	public BoardWriterForm boardEdit(int BoardNo){
		log.info("BoardDao boardDetail, BoardNo = {}", BoardNo);
		return session.selectOne("board.boardEdit", BoardNo);
	}
	
//	public int updateBoard(BoardWriterForm boardWriterForm , int boardNo) {
//		boardWriterForm.setBoardNo(boardNo);
//		return session.update("board.boardUpdate",boardWriterForm);
//	}
	
	public int insertReply(Reply r, int userNo) {
		int result5 = session.update("memberMapper.insertReplyExp",userNo);

		 User list = session.selectOne("board.replyGetNick", userNo);
		 String rUserNick = list.getUserNick();
		if(list != null) {
			r.setRUserNick(rUserNick);
		}
		int result = 0;
		result = session.insert("board.insertReply",r);
		int result2 = session.insert("alert.insertReplyAlert",r);
		if(result > 0 && result2 > 0) {
			log.info("boardDao insertReply 등록 성공 = {}",result+result2);
		}
		return result+result2;
	}
	


	public  int serchHeart(BoardCare bc) {
		return session.selectOne("board.serchHeart",bc);
	}

	
	
	public int insertHeart(BoardCare bc) {
		int result = 0;
		result = session.insert("board.insertHeart",bc);
		if(result > 0) {
			log.info("boardDao insertReply 등록 성공 = {}",result);
		}
		return result;
	}
	public int deleteHeart(BoardCare bc) {
		int result = 0;
		result = session.insert("board.deleteHeart",bc);
		if(result > 0) {
			log.info("boardDao deleteHeart 삭제 성공 = {}",result);
		}
		return result;
	}

	public List<BoardImg> boardImg(int boardNo) {
		return session.selectList("board.boardImg",boardNo);
	}

	public List<BoardVideo> boardVideo(int boardNo) {
		return session.selectList("board.boardVideo",boardNo);
	}
	

	public List<Reply> replySelect(int boardNo) {
	      return session.selectList("board.replySelect",boardNo);
	   }


	public int removeReply(int replyNo) {
		int result1 = session.update("board.removeReply", replyNo);
		int result2 = session.update("board.removeMainReply", replyNo);
		return result2==0?0:(result1+result2);
	}

     // 검색 기능
	public List<BoardExt> searchList(String userRegion,String btg,String btt ){
		List<BoardExt> searchList = new ArrayList<BoardExt>();
		
		String[] boardTagArr = btg.split("_");
		for(String boardTag : boardTagArr) {
		    Map<String, Object> params = new HashMap<>();
		    params.put("userRegion", userRegion);
		    params.put("boardTag", boardTag);

		    List<BoardExt> tagSearchResults = session.selectList("board.boardTagSearch", params);
		    searchList.addAll(tagSearchResults);
		}
			String boardTitle = btt;
			String boardContent = btt;
			
			BoardExt be = new BoardExt();
			be.setBoardTitle(boardTitle);
			be.setBoardContent(boardContent);
			be.setUserRegion(userRegion);
			
			List<BoardExt> titleSearchResults = session.selectList("board.boardTagSearch",be);
			searchList.addAll(titleSearchResults);
			
			

		return searchList;
	}
	public List<BoardExt> nextBtn(Map<String, Object> data) {
		return session.selectList("board.nextBtn", data);
	}
	public List<BoardExt> backBtn(Map<String, Object> data) {
		return session.selectList("board.backBtn", data);
	}
	public List<BoardWeather> weatherList() {
		return session.selectList("board.weatherList");
	}
	public List<BoardBest> bestList() {
		return session.selectList("board.bestList");
	}
	public List<BoardShorts> shortsList() {
		return session.selectList("board.shortsList");
	}
	public List<BoardVsList> vsList() {
		return session.selectList("board.vsList");
	}
	public List<BoardBest> localList() {
		return session.selectList("board.localList");
	}

	
	
	
	
	
	// admin
	public List<BoardExt> adminBoardList(){
		return session.selectList("board.adminBoardList");
	}
	
	public int addMinBoardDelete(int boardNo) {
		 
		 return session.update("board.addMinBoardDelete",boardNo);
	}
	
	public Board selectBoardUserNo(int boardNo) {
		return session.selectOne("board.addMinBoardDeleteUserNoSelect",boardNo);
	}
	
	public int addMinBoardDeleteAlert(Map<String, Object> map) {
		int result = 0;
		result = session.insert("board.addMinBoardDeleteAlert",map);
		if(result > 0) {
			log.info("result 성공 = {}",result);
			return result;
		}else {
			log.info("result 실패 = {}",result);
			return result;
		}
		
	}

	public int insertBoardExp(BoardWriterForm boardWriterForm) {
		return session.update("memberMapper.insertBoardExp",boardWriterForm);
	}







	
	
	
	
}
