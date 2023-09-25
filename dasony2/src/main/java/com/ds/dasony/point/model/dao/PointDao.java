package com.ds.dasony.point.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.point.model.vo.Point;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class PointDao {

	@Autowired
	private SqlSessionTemplate session;
	
	public int insertPoint(Point pointData) {
		int result = session.insert("point.insertPoint",pointData);
		
		int result2 = session.insert("alert.insertPointAlert",pointData);
		
		return result+result2;
		
	}
	
	public int updateMemberTotalPoint(Point pointData) {
		return session.update("point.updateMemberTotalPoint",pointData);
	}

	public int spendPoint(Point point) {
		int result = session.insert("point.spendPoint",point);
		int result2 = session.insert("alert.insertShopAlert",point);
		int result3 = session.update("point.updateMemberTotalPoint", point);
		log.info("result====={}",result, "result2======={}",result2, "result3======={}", result3);
		return result + result2 + result3;
	}
	
	
	
}
