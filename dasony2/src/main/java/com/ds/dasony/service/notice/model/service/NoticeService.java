package com.ds.dasony.service.notice.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.service.notice.model.vo.Notice;

public interface NoticeService {

	int addNotice(Notice notice) throws Exception;

	List<Notice> selectList(Map<String, Object> param);

	int deleteNotice(int no); 
	
	Notice selectNotice(int no);

	int modifyNotice(Notice notice) throws Exception;

	List<Notice> selectNoticeDetailList(int rownum);

}
