package com.ds.dasony.point.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.point.model.dao.PointDao;
import com.ds.dasony.point.model.vo.Point;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PointServiceImpl implements PointService{
	
	@Autowired
	private PointDao pointDao;
	
	@Override
	public int insertPoint(Point pointData) {
		return pointDao.insertPoint(pointData);
	}
	
	@Override
	public int updateMemberTotalPoint(Point pointData) {
		return pointDao.updateMemberTotalPoint(pointData);
	}

	@Override
	public int spendPoint(Point point) {
		log.info("point>>>==>>{}", point);
		return pointDao.spendPoint(point);
	}
}
