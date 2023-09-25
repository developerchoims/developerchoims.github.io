package com.ds.dasony.point.model.service;

import com.ds.dasony.point.model.vo.Point;

public interface PointService {
	
	public int insertPoint(Point pointData);
	
	public int updateMemberTotalPoint(Point pointData);

	public int spendPoint(Point point);
}
