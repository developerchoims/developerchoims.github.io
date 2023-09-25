package com.ds.dasony.service.notice.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.service.notice.model.vo.Notice;

@Repository
public class NoticeDao {

	@Autowired
	private SqlSessionTemplate session;

	public int addNotice(Notice notice) throws Exception { 
		return session.insert("notice.addNotice", notice);
	}

	public List<Notice> selectList(Map<String, Object> param) {
		Object loadNum = param.get("rowBound");
		if(loadNum!=null) {
			RowBounds rBound = new RowBounds((Integer)loadNum * 3, 3);
			return session.selectList("notice.selectList", param, rBound);
		}
		return session.selectList("notice.selectList", param);
	}

	public int deleteNotice(int no) {
		return session.delete("notice.deleteNotice", no);
	}

	public Notice selectNotice(int no) {
		return session.selectOne("notice.selectNotice", no);
	}

	public int modifyNotice(Notice notice) {
		return session.update("notice.modifyNotice", notice );
	}

	public List<Notice> selectNoticeDetailList(int num) {
		return session.selectList("notice.selectNoticeDetailList", num);
	}

	public int selectNoticeRownum(int no) {
		return session.selectOne("notice.selectNoticeRowNum", no);
	}
}
