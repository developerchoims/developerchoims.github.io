package com.ds.dasony.share.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.Board.model.vo.BoardExt;
import com.ds.dasony.share.model.vo.Share;

@Repository
public class ShareDao {
	
	private final SqlSessionTemplate session;
	@Autowired
	public ShareDao(SqlSessionTemplate session) {
		this.session=session;
	}
	public List<Share> shareList(Map<String, Object> map) {
		return session.selectList("shareMapper.shareList", map);
	}
	public int shareAdd(Board board) {
		return session.insert("shareMapper.shareAdd", board);
	}
	public int addShareImg(List<Map<String, Object>> uploadedFileName) {
		return session.insert("shareMapper.addShareImg", uploadedFileName);
	}
}
