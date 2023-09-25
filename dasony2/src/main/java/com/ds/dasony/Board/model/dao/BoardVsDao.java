package com.ds.dasony.Board.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.Board.model.vo.BoardDetailExt;
import com.ds.dasony.Board.model.vo.BoardVs;
import com.ds.dasony.Board.model.vo.BoardVsVote;

@Repository
public class BoardVsDao {
	
	private final SqlSessionTemplate session;
	
	@Autowired
	public BoardVsDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public int boardVsInsert(BoardVs boardVs) {
		return session.insert("boardVsMapper.boardVsInsert", boardVs);
	}

	public int boardInsert(Map<String, Object> map) {
		return session.insert("boardVsMapper.boardInsert", map);
	}

	public int optionPm(Map<String, String> map) {
		return session.update("boardVsMapper.optionPlus", map);
	}

	public int vsOption(Map<String, String> map) {
		return session.update("boardVsMapper.vsOption", map);
	}

	public List<BoardVsVote> voteList(int boardNo) {
		return session.selectList("boardVsMapper.voteList", boardNo);
	}

	public BoardVs vsUpdate(int boardNo) {
		return session.selectOne("boardVsMapper.vsUpdate", boardNo);
	}

	public int vsUpdateSub(BoardVs map) {
		int result = session.update("boardVsMapper.vsUpdateSub", map);
		int result2 = session.update("boardVsMapper.vsBoardUpdateSub", map);
		int result3 = session.update("boardVsMapper.vsTagUpdateSub", map);
		return result + result2 + result3;
	}

}
