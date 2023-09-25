package com.ds.dasony.common.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.common.model.vo.SessionModel;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class SessionDao {

	@Autowired
	SqlSessionTemplate sqlSession;
	
	public int addVisitor(SessionModel session) {
//		log.info("dao session : " + session.toString());
		return sqlSession.insert("session.addVisitor", session);
	}

	public int checkVisit(SessionModel session) {
		return sqlSession.selectOne("session.checkVisit", session);
	}

}
