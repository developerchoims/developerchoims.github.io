package com.ds.dasony.Board.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.Board.model.vo.BoardDetailExt;
import com.ds.dasony.Board.model.vo.BoardVs;
import com.ds.dasony.Board.model.vo.BoardVsVote;

public interface BoardVsService {


	public int boardVsInsert(BoardVs boardVs);

	public int boardInsert(Map<String, Object> map);

	public int optionPm(Map<String, String> map);

	public int vsOption(Map<String, String> map);

	public List<BoardVsVote> voteList(int boardNo);

	public BoardVs vsUpdate(int boardNo);

	public int vsUpdateSub(BoardVs boardVs);

}
