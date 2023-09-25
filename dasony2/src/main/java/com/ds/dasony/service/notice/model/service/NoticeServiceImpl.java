package com.ds.dasony.service.notice.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.service.notice.model.dao.NoticeDao;
import com.ds.dasony.service.notice.model.vo.Notice;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	NoticeDao nDao;

	@Override
	public int addNotice(Notice notice) throws Exception { 
		return nDao.addNotice(notice);
	}

	@Override
	public List<Notice> selectList(Map<String, Object> param) {
		return nDao.selectList(param);
	}

	@Override
	public int deleteNotice(int no) {
		return nDao.deleteNotice(no);
	}

	@Override
	public Notice selectNotice(int no) {
		return nDao.selectNotice(no);
	}

	@Override
	public int modifyNotice(Notice notice) throws Exception {
		return nDao.modifyNotice(notice);
	}
	
	@Override
	public List<Notice> selectNoticeDetailList(int no) {
		int row = nDao.selectNoticeRownum(no);
		
		List<Notice> list = nDao.selectNoticeDetailList(row);
//		log.info("dao list : " + list.toString());
		
		if(list.size() != 3) {
			for(int i = 0; i<list.size(); i++) {
				switch(i) {
				case 0 : 
					if(list.get(i).getNo() == no) list.add(0, null); break;
				case 1 : 
					if(list.get(i).getNo() == no) list.add(null); break;
				}
			}
		}
		
		return list;
	}

}
