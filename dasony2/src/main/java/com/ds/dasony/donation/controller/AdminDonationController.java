package com.ds.dasony.donation.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.donation.model.service.DonationService;
import com.ds.dasony.donation.model.vo.Donation;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AdminDonationController {
	
	private final DonationService donationService;

	@Autowired
	public AdminDonationController(DonationService donationService) {
		this.donationService = donationService;
	}
	
	@GetMapping("/admindonalist")
	public List<Donation> selectAdminDonaList(){
		List<Donation> adDonaList = donationService.selectAdminDonaList();
		
		return adDonaList;
	}
	
	@GetMapping("/admindonadetail/{donaNo}")
	public Donation selectAdDonaDetail(
			@PathVariable int donaNo
			) {
		
		Donation adDonation = donationService.selectAdDonaDetail(donaNo);
		
		log.info(adDonation.toString());
		
		return adDonation;
	}
	
	@PostMapping("/admindonaenroll")
    public String insertDona(@RequestBody Donation donation) {
		
		try {
    	   int result = donationService.insertDona(donation);
    	   
    	   log.info("result = {}", result);
    	   
    	   if(result > 0) return "성공적으로 등록하였습니다.";
			else return "다시 등록해주세요.";
		} catch (Exception e) {
		    log.error("예외 발생: {}", e.getMessage(), e);
		    return "예상치 못한 에러가 발생했습니다. 다시 시도해주세요.";
		}
	}
	
	@PostMapping("/admindonaupdate/{donaNo}")
	public String updateDona(
			@RequestBody Donation donation,
			@PathVariable int donaNo
			) {
		
		donation.setDonaNo(donaNo);
		
		log.info("donation = {}", donation);
		log.info("donaNo = {}", donaNo);
		
		try {
			int result = donationService.updateDona(donation);
			
			if(result > 0) return "성공";
			else return "다시";
		}catch (Exception e) {
			 log.error("예외 발생: {}", e.getMessage(), e);
			    return "예상치 못한 에러가 발생했습니다. 다시 시도해주세요.";
		}
		
	}
	
	@DeleteMapping("/admindonadelete/{donaNo}")
	public ResponseEntity<String> deleteDona(@PathVariable int donaNo) {
		
			log.info("donaNo = {}", donaNo);
		
            int result = donationService.deleteDona(donaNo);
            
            if(result > 0) {
            	return new ResponseEntity(HttpStatus.OK);
        } else {
        	return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
	}
	
//	@PostMapping("/adminAmountUpdate")
//	public String amountUpdate (@RequestBody Map<String, Object> map){
//		
//		try {
//			
//		int donaTotalAmount = Integer.parseInt((String) map.get("totalDonaAmount"));
//		int donaNo = Integer.parseInt((String) map.get("donaNo"));
//		 
//		 Donation donation = new Donation();
//		 donation.setDonaTotalAmount(donaTotalAmount);
//		 donation.setDonaNo(donaNo);
//		 
//			log.info("donation ={}", donation);
//			int result = donationService.amountUpdate(donation);
//			
//			log.info("result 값 = {}", result);
//			
//			if(result > 0) return "성공";
//			else return "다시";
//		}catch (Exception e) {
//			 log.error("예외 발생: {}", e.getMessage(), e);
//			    return "예상치 못한 에러가 발생했습니다. 다시 시도해주세요.";
//		}
//	}
}
