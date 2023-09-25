package com.ds.dasony.alert.model.dao;


import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.ds.dasony.alert.model.vo.Alert;


import lombok.extern.slf4j.Slf4j;

@Slf4j


@Repository
public class AlertDao {
	
	@Autowired
	private SqlSessionTemplate session;
	

	public List<Alert> getAlertList(int userNo){

		
		List<Alert> result = session.selectList("alert.getAlertList",userNo);
		return result;
	}


	public int inputAdminAlert(Map<String, Object> newAlert) {
		return session.insert("alert.inputAdminAlert", newAlert);
	}

}
