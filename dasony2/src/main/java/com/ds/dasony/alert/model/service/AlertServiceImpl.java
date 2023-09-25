package com.ds.dasony.alert.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.alert.model.dao.AlertDao;
import com.ds.dasony.alert.model.vo.Alert;

@Service
public class AlertServiceImpl implements AlertService {

	@Autowired
	private AlertDao alertDao;
	
	@Override
	public List<Alert> getAlertList(int userNo){
		return alertDao.getAlertList(userNo);
	}
	@Override
	public int inputAdminAlert(Map<String, Object> newAlert) {
		return alertDao.inputAdminAlert(newAlert);
	}
}
