package com.ds.dasony.Board.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.Board.model.vo.ShortsUpdate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class BoardShDao {
	
	private final SqlSessionTemplate session;
	@Autowired
	public BoardShDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public int addBoardSh(Board board) {
		log.info("여기서 실행이 된 건지 확인해봅시다?");
		return session.insert("boardShMap.addBoardSh", board);
	}

	public int findBoardNo(Board board) {
		return session.selectOne("boardShMap.findBoardNo", board);
	}

	public int addBoardVedio(List<Map<String, Object>> uploadedFileName) {
		return session.update("boardShMap.addBoardVedio", uploadedFileName);
	}

	public ShortsUpdate shortsUpdate(int boardNo) {
		return session.selectOne("boardShMap.shortsUpdate", boardNo);
	}

	public int shUpdateSub(Board board) {
		log.info("여기서 실행이 된 건지 확인해봅시다?");
		int result2 = session.update("boardShMap.shBoardUpdateSub", board);
		int result3 = session.update("boardShMap.shTagUpdateSub", board);
		return result2 + result3;
	}

	public int videoDelete(Board board) {
		return session.update("boardShMap.videoDelete", board);
	}

}
