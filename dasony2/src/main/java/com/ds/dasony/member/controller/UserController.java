package com.ds.dasony.member.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.common.model.service.SessionService;
import com.ds.dasony.member.model.service.UserService;
import com.ds.dasony.member.model.vo.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {

	private final UserService userService;
	// session 조회
	@Autowired
	private SessionService sessionService;
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	/*
	 * 접속자 확인을 위한 함수 (지현 추가)
	 * */
	@GetMapping("/visit")
	public void checkVisit(HttpServletRequest request) {
		sessionService.addVisitor(request);		
	}
	
	@PostMapping("/chkValidate")
	public int chkValidate(
			@RequestBody HashMap<String, Object> map
			) {
		int validation = 0;
		String userId = "";
		String userNick = "";
//		log.info("map={}", map);
//		log.info("map.get('id')================================>>>>>>{}", map.get("id"));
		if(map.get("id") != ""&&map.get("nick")=="") {
			userId = String.valueOf(map.get("id"));
//			log.info("userId =============================>{},", userId);
			validation = userService.chkValidateId(userId);
		} else {
			userNick = String.valueOf(map.get("nick"));
//			log.info("userNick =============================>{},", userNick);
			validation = userService.chkValidateNick(userNick);
		}
//		log.info("validation===============>>>>>>>>>>>>>>>>>{}", validation);
		
		return validation;
	}
	
	
	@PostMapping("/signUp")
	public Map<String, Object> signUp(
			@RequestBody User user
			){
		
		Map<String, Object> map = new HashMap<>();
		
		User validateUser = new User();
		
		// 응답 데이터 생성
//		log.info("user={}", user);
		
		int result = userService.insertUser(user);
		
		if(result > 0) {
			
			map.put("msg", "회원 가입이 완료되었습니다! 즐거운 다소니와 함께해요");
			
			validateUser = userService.userForLocation(user.getUserId());
			map.put("user", validateUser);
			
		} else {
			map.put("error", "회원 가입에 실패했습니다.");
		}
        return map;
		
	}
	
	@PostMapping("/location")
	public Map<String, Object> location(
			@RequestBody Map<String, Object> request
			){
		
//		log.error("userNo 확인 ==================>>", request.get("userNo"));
//		log.error("userNo 확인 ==================>>", request.get("location"));
		int result = userService.location(request);
		
		Map<String, Object> map = new HashMap();
		
		if(result > 0) {
			map.put("msg", "지역 설정에 성공했습니다.");
		} else {
			map.put("msg", "지역 설정에 실패했습니다. 마이페이지에서 다시 설정해주세요.");
		}
		
		return map;
	}
	
	@PostMapping("/login")
	public Map<String, Object> login(
			@RequestBody User user
			){
		Map<String, Object> userMap = new HashMap();
		userMap.put("userId", user.getUserId());
		userMap.put("userPwd", user.getUserPwd());
		
		User result = userService.login(userMap);
		
		Map<String, Object> map = new HashMap();
		
		if(result != null) {
			map.put("msg", "로그인에 성공했습니다.");
			map.put("user", result);
		} else {
			map.put("err", "아이디/비밀번호를 확인해주세요.");
		}
		
		return map;
	}
	
	@PostMapping("/findingId")
	public Map<String, Object> fingdingId(
			@RequestBody Map<String, String> email
			){
		String subEmail = email.get("subEmail"); 
//		log.error(subEmail);
		Map<String, Object> map = new HashMap();
		
		User user = userService.findingId(subEmail);
		String userId = user.getUserId();
		
//		log.error("{}=","Id는 "+userId+" 입니다.");
		if(user != null) {
			map.put("msg", "Id는 "+userId+" 입니다.");
			map.put("userName", user.getUserName());
		} else {
			map.put("err", "Id를 찾지 못했습니다.");
		}
		
		return map;
	}
	
	@PostMapping("/userInfo")
	public Map<String, Object> userInfo(
			@RequestBody Map<String, String> userno
			){
		
		long userNo = Long.parseLong(userno.get("userNo"));
		
//		log.info(userno.get("userNo"));
		
		
		Map<String, Object> map = new HashMap();
		
		User user = new User();
		
		user = userService.userInfo(userNo);
		
		if(user != null) {
			map.put("user", user);
		} else {
			map.put("err","알 수 없는 오류가 발생했습니다.");
		}
		
		return map;
	}
	

	@PostMapping("/updateUserPoint")
	public Map<String, Object> updateUserPoint(
			@RequestBody Map<String, Object> pointData
			){
		
		long userNo = Long.parseLong(pointData.get("userNo").toString());
		int newDasonPoint  = (int) pointData.get("newDasonPoint");
		
		log.info("userNo" + userNo);
		log.info("newDasonPoint" + newDasonPoint);
		
		Map<String, Object> map = new HashMap();
		
		int updatePoint = userService.updateUserPoint(userNo, newDasonPoint);
		
		if(updatePoint > 0) {
			map.put("userNo", userNo);
			map.put("newDasonPoint", newDasonPoint);
		}else {
			map.put("error", "오류 발생");
		}
		return map;
	}
	
//	@PostMapping("/getUserName")
//    public Map<Long, String> getUserNames(@RequestBody List<Integer> userNo) {
//        return userService.getUserNames(userNo);
//    }

	@PostMapping("/getMyInfo")
	public Map<String, Object> getMyInfo(
			@RequestBody Map<String, Object> requestData
			){
		int userNo = (int) requestData.get("userNo");
		Map<String,Object> myInfo = new HashMap();
	    myInfo.put("myInfo",userService.getMyInfo(userNo));
		
		return myInfo;
	}
	
	@PostMapping("/modifyMyInfo")
	public int modifyMyInfo(
			@RequestBody Map<String, Object> myInfo
			){
		
		int result = userService.modifyMyInfo(myInfo);
		return result;
	}
	
	@PostMapping("/changeNewPwd")
	public int changeNewPwd(@RequestBody Map<String,Object> pwdInfo) {
		
		int result = userService.changeNewPwd(pwdInfo);
		
		return result;
	}
	
	@PostMapping("getMyLikesList")
	public Map<String, Object> getMyLikesList(@RequestBody int userNo){
		Map<String,Object> likesList = new HashMap();
		likesList.put("likesList", userService.getMyLikesList(userNo));
		return likesList;
	}
	
	@PostMapping("deleteLikes")
	public int delteLikes(@RequestBody Map<String,Object> deletelike){
		int result = userService.deleteLikes(deletelike);
		return result;
	}
	
	@PostMapping("getMyPoint")
	public Map<String,Object> getMyPoint(@RequestBody int userNo){
		Map<String,Object> point = new HashMap();
		point.put("point",userService.getMyPoint(userNo));
		
		return point;
	}
	
	@PostMapping("getMyTicket")
	public int getMyTicket(@RequestBody Map<String, Integer> requestBody) {
	    int userNo = requestBody.get("userNo");
	    String count2 = String.valueOf(userNo);
	    int count = userService.getMyTicket(userNo);
	    String count1 = String.valueOf(count);
		return count;	
	}
	
	@PostMapping("getMyPointList")
	public Map<String, Object> getMyPointList(
			@RequestBody int userNo){
		
		Map<String,Object> pList = new HashMap();
		pList.put("pList", userService.getMyPointList(userNo));
		return pList;
		
	}
	
	@PostMapping("getMyActList")
	public Map<String,Object> getMyActList(
			@RequestBody int userNo){
		Map<String,Object> actList = new HashMap();
		
		actList.put("boardList", userService.getMyBoardList(userNo));
		actList.put("donationList", userService.getMyDonationList(userNo));
		actList.put("eventList",userService.getMyEventList(userNo));
		actList.put("pointList",userService.getMyPointList(userNo));
		actList.put("gameList",userService.getMyGameList(userNo));
		
		log.info("actList={}",actList);
		return actList;
	}
	
	@PostMapping("deleteMyAlertList")
	public int deleteMyAlertList(
			@RequestBody Map<String, Integer> requestBody ) {
		int result = userService.deleteMyAlertList(requestBody);
		return result;
	}
	
	@PostMapping("/modifyNewPwd")
	public int modifyNewPwd(
			@RequestBody  Map<String, Object> myInfo
			){
		
		int result = userService.modifyNewPwd(myInfo);
	    
		return result;
	}
	
	@PostMapping("alertAfterClick")
	public int alertAfterClick(
			@RequestBody Map<String,Object> alertNo ) {
		int result = userService.alertAfterClick(alertNo);
		log.info("alertNo={}",alertNo);
		return result;
	}
	
	
	
	

}
