package com.ds.dasony.donation.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ds.dasony.donation.model.service.DonationService;
import com.ds.dasony.donation.model.vo.Donation;
import com.ds.dasony.donation.model.vo.DonationList;
import com.ds.dasony.member.model.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class DonationController {
	
	private final DonationService donationService;

	
	@Autowired
	public DonationController(DonationService donationService) {
		this.donationService = donationService;

	}
	
	
	
	@GetMapping("/donalist")
	public List<Donation> selectDonaList(HttpServletResponse response){
		
		List<Donation> donalist = donationService.selectDonaList();
		
		return donalist;
	}
	
	@GetMapping("/donadetail/{donaNo}")
	public Donation selectDonaDetail(
			@PathVariable int donaNo
			) {
			
		Donation donation = donationService.selectDonaDetail(donaNo);
		
		return donation;
	}
	

	@PostMapping("/api/getMyDonationList")
	   public Map<String, Object> getMyDonationList(@RequestBody Map<String, Object> requestData) {
	       int userNo = (int) requestData.get("userNo");
	       Map<String, Object> response = new HashMap<>();
	       List<DonationList> donationList = donationService.getMyDonationList(userNo);
	       
	       response.put("donationList", donationList);
	       
	       return response;
	   }
	
	@PostMapping("/detailTotalDona/{donaNo}")
	public Map<String,Object> DonaDetails(
			@PathVariable int donaNo
			) {
		
		Map<String, Object> res = new HashMap();
		
		try {
			List<DonationList> donaHistory = donationService.DonaDetails(donaNo);
			int totalDonaAmount = donationService.totalAmount(donaHistory);
		
			res.put("donaHistory", donaHistory);
			res.put("totalDonaAmount", totalDonaAmount);
			
			log.info("donaHistory = {}", donaHistory);
			log.info("totalDonaAmount = {}", totalDonaAmount);
			
			res.put("statusCode", HttpStatus.OK.value());
			
		} catch(Exception e) {
			res.put("error", "에러발생");
			res.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return res;
	}
	
	@PostMapping("/insertDona")
	public String insertDonaList(@RequestBody DonationList donaList){
		 
		 try {
			 
			 int result = donationService.insertDonaList(donaList);
			 int result2 = donationService.donaInsertExp(donaList);
			 
			 log.info("result = {}", result);
			 if(result > 0) {
				 donationService.insertDonationAlert(donaList);
				 return "성공" + result;				 
			 }
			 else
				 return "다시 등록";
		 }catch (Exception e) {
			 log.error("예외 발생: {}", e.getMessage(), e);
			    return "예상치 못한 에러가 발생했습니다. 다시 시도해주세요.";
		}
	}
}
