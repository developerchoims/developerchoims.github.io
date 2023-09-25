package com.ds.dasony.Board.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.Board.model.vo.BoardVs;
import com.ds.dasony.Board.model.vo.ShortsUpdate;

public interface BoardShService {

	int addBoardSh(Board board);

	int findBoardNo(Board board);

	int addBoardVedio(List<Map<String, Object>> uploadedFileName);

	ShortsUpdate shortsUpdate(int boardNo);

	int shUpdateSub(Board board);

	int videoDelete(Board board);

}
