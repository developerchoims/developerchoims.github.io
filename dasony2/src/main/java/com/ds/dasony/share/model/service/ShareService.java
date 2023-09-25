package com.ds.dasony.share.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.Board.model.vo.BoardExt;
import com.ds.dasony.share.model.vo.Share;

public interface ShareService {

	List<Share> shareList(Map<String, Object> map);

	int shareAdd(Board board);

	int addShareImg(List<Map<String, Object>> uploadedFileName);

}
