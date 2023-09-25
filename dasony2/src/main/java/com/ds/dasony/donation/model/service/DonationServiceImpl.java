package com.ds.dasony.donation.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.donation.model.dao.DonationDao;
import com.ds.dasony.donation.model.vo.Donation;
import com.ds.dasony.donation.model.vo.DonationList;

@Service
public class DonationServiceImpl implements DonationService{
	
	private final DonationDao donationDao;
	
	@Autowired
	public DonationServiceImpl(DonationDao donationDao) {
		this.donationDao = donationDao;
	}

	@Override
	public List<Donation> selectDonaList() {
		return donationDao.selectDonaList();
	}

	@Override
	public Donation selectDonaDetail(int donaNo) {
		return donationDao.selectDonaDetail(donaNo);
	}

	@Override
	public List<Donation> selectAdminDonaList() {
		return donationDao.selectAdminDonaList();
	}

	@Override
	public Donation selectAdDonaDetail(int donaNo) {
		return donationDao.selectAdDonaDetail(donaNo);
	}
	
	 @Override
	    public int insertDona(Donation donation) throws Exception{
		return donationDao.insertDona(donation);
	 }

	@Override
	public int updateDona(Donation donation) throws Exception {
		return donationDao.updateDona(donation);
	}
	
	@Override
	public int deleteDona(int donaNo) {
		return donationDao.deleteDona(donaNo);
	}
	
	@Override
	public List<DonationList> getMyDonationList(int userNo){
		return donationDao.getMyDonationList(userNo);
	}

	@Override
	public List<DonationList> DonaDetails(int donaNo) {
		return donationDao.DonaDetails(donaNo);
	}

	@Override
	public int totalAmount(List<DonationList> donaHistory) {
		
		int totalDonaAmount = 0;
		for(DonationList donation : donaHistory) {
			totalDonaAmount += donation.getDonaAmount();
		}
		return totalDonaAmount;
	}

	@Override
	public int insertDonaList(DonationList myDona) {
		return donationDao.insertDonaList(myDona);
	}

	@Override
	public void insertDonationAlert(DonationList donaList) {
		donationDao.insertDonationAlert(donaList);
	}

//	@Override
//	public int amountUpdate(Donation donation) {
//		return donationDao.amountUpdate(donation);
//	}
	@Override
	public int donaInsertExp(DonationList donaList) {
		return donationDao.donaInsertExp(donaList);
	}

}
