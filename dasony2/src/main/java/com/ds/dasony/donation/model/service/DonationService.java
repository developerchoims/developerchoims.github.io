package com.ds.dasony.donation.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.donation.model.vo.Donation;
import com.ds.dasony.donation.model.vo.DonationList;

public interface DonationService {

	List<Donation> selectDonaList();

	Donation selectDonaDetail(int donaNo);

	List<Donation> selectAdminDonaList();

	Donation selectAdDonaDetail(int donaNo);

	int insertDona(Donation donation) throws Exception;

	int updateDona(Donation donation) throws Exception;

	int deleteDona(int donaNo);

	List<DonationList> getMyDonationList(int userNo);

	List<DonationList> DonaDetails(int donaNo);

	int totalAmount(List<DonationList> donaHistory);

	int insertDonaList(DonationList myDona);

	void insertDonationAlert(DonationList donaList);

//	int amountUpdate(Donation donation);
	
	public int donaInsertExp(DonationList donaList);


}
