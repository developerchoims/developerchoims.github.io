package com.ds.dasony.donation.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.donation.model.vo.Donation;
import com.ds.dasony.donation.model.vo.DonationList;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class DonationDao {
	
	private SqlSessionTemplate session;
	
	@Autowired
	public DonationDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<Donation> selectDonaList() {
		return session.selectList("donationMapper.selectDonaList");
	}

	public Donation selectDonaDetail(int donaNo) {
		return session.selectOne("donationMapper.selectDonaDetail", donaNo);
	}

	public List<Donation> selectAdminDonaList() {
		return session.selectList("donationMapper.selectAdminDonaList");
	}

	public Donation selectAdDonaDetail(int donaNo) {
		return session.selectOne("donationMapper.selectAdDonaDetail", donaNo);
	}

//	public String insertDona(Donation donation) {
//		return session.insert("donationMapper.insertDona", donation);
//	}
	
	public int insertDona(Donation donation) throws Exception{
		return session.insert("donationMapper.insertDona", donation);
	}

	public int updateDona(Donation donation) throws Exception{
		return session.update("donationMapper.updateDona", donation);
	}
	
	public int deleteDona(int donaNo) {
		return session.delete("donationMapper.deleteDona", donaNo);
	}

	public List<DonationList> getMyDonationList(int userNo) {
		return session.selectList("donationMapper.getMyDonationList",userNo);
	}

	public List<DonationList> DonaDetails(int donaNo) {
		return session.selectList("donationMapper.DonaDetails", donaNo);
	}

	public int insertDonaList(DonationList myDona) {
		return session.insert("donationMapper.insertDonaList", myDona);
	}

	public void insertDonationAlert(DonationList donaList) {
		session.insert("alert.insertDonationAlert", donaList);
	}

//	public int amountUpdate(Donation donation) {
//		return session.update("donationMapper.amountUpdate", donation);
//	}
	
	public int donaInsertExp(DonationList donaList) {
		return session.update("memberMapper.donaInsertExp",donaList);
	}

}
