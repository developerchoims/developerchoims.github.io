package com.ds.dasony.Board.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.Board.model.dao.BoardVsDao;
import com.ds.dasony.Board.model.vo.BoardDetailExt;
import com.ds.dasony.Board.model.vo.BoardVs;
import com.ds.dasony.Board.model.vo.BoardVsVote;

@Service
public class BoardVsServiceImpl implements BoardVsService {
	
	private final BoardVsDao boardVsDao;
	@Autowired
	public BoardVsServiceImpl(BoardVsDao boardVsDao) {
		this.boardVsDao = boardVsDao;
	}
	@Override
	public int boardVsInsert(BoardVs boardVs) {
		return boardVsDao.boardVsInsert(boardVs);
	}
	@Override
	public int boardInsert(Map<String, Object> map) {
		return boardVsDao.boardInsert(map);
	}
	@Override
	public int optionPm(Map<String, String> map) {
		return boardVsDao.optionPm(map);
	}
	@Override
	public int vsOption(Map<String, String> map) {
		return boardVsDao.vsOption(map);
	}
	@Override
	public List<BoardVsVote> voteList(int boardNo) {
		return boardVsDao.voteList(boardNo);
	}
	@Override
	public BoardVs vsUpdate(int boardNo) {
		return boardVsDao.vsUpdate(boardNo);
	}
	@Override
	public int vsUpdateSub(BoardVs map) {
		return boardVsDao.vsUpdateSub(map);
	}
	
	
}
