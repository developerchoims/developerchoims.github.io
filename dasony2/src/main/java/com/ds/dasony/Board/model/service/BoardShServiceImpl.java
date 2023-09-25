package com.ds.dasony.Board.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.Board.model.dao.BoardShDao;
import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.Board.model.vo.ShortsUpdate;

@Service
public class BoardShServiceImpl implements BoardShService{

	private final BoardShDao boardShDao;
	@Autowired
	public BoardShServiceImpl(BoardShDao boardShDao) {
		this.boardShDao = boardShDao;
	}
	
	@Override
	public int addBoardSh(Board board) {
		return boardShDao.addBoardSh(board);
	}

	@Override
	public int findBoardNo(Board board) {
		return boardShDao.findBoardNo(board);
	}

	@Override
	public int addBoardVedio(List<Map<String, Object>> uploadedFileName) {
		return boardShDao.addBoardVedio(uploadedFileName);
	}

	@Override
	public ShortsUpdate shortsUpdate(int boardNo) {
		return boardShDao.shortsUpdate(boardNo);
	}

	@Override
	public int shUpdateSub(Board board) {
		return boardShDao.shUpdateSub(board);
	}

	@Override
	public int videoDelete(Board board) {
		return boardShDao.videoDelete(board);
	}

}
