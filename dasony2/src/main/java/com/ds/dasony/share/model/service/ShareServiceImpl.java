package com.ds.dasony.share.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.Board.model.vo.BoardExt;
import com.ds.dasony.share.model.dao.ShareDao;
import com.ds.dasony.share.model.vo.Share;

@Service
public class ShareServiceImpl implements ShareService{
	
	private final ShareDao shareDao;
	@Autowired
	public ShareServiceImpl(ShareDao shareDao) {
		this.shareDao = shareDao;
	}
	@Override
	public List<Share> shareList(Map<String, Object> map) {
		return shareDao.shareList(map);
	}
	@Override
	public int shareAdd(Board board) {
		return shareDao.shareAdd(board);
	}
	@Override
	public int addShareImg(List<Map<String, Object>> uploadedFileName) {
		return shareDao.addShareImg(uploadedFileName);
	}

}
