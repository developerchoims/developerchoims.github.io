package com.ds.dasony.alert.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.ds.dasony.alert.model.vo.Alert;

public interface AlertService {

	public List<Alert> getAlertList(int userNo);

	public int inputAdminAlert(Map<String, Object> newAlert);


}
