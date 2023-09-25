package com.ds.dasony.event.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

//import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.common.FileUpload;
import com.ds.dasony.event.model.service.EmailService;
import com.ds.dasony.event.model.service.EventService;
import com.ds.dasony.event.model.vo.Email;
import com.ds.dasony.event.model.vo.Event;
import com.ds.dasony.event.model.vo.EventForm;
import com.ds.dasony.event.model.vo.EventJoin;
import com.ds.dasony.event.model.vo.Reward;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/event")
public class EventController {

	@Autowired
	private EventService eService;
	@Autowired
	private EmailService emailService;
	@Autowired
	FileUpload fileUpload;
	@Autowired
	HttpSession httpSession;
	
	@GetMapping("/loadList")
	public List<Event> selectAllEvent(@RequestParam(required=false) String category, @RequestParam("status") String status ){
		Map<String, Object> param = new HashMap<>();
		
		if(category != null) param.put("category", category);
		if(status.length() > 2) status = status.substring(0, 2);
		param.put("status", status);
		
		List<Event> list = eService.selectAllEvent(param);
//		log.info("search Param : "+param.toString());
//		log.info("조회된 데이터 : "+list);
		
		return list;
	}
	
	@GetMapping("/selectEvent")
	public Map<String, Object> selectEventDetail(@RequestParam String no){
		Map<String, Object> map = new HashMap();
		
		Event event = eService.selectEvent(no);
		List<Reward> reward = eService.selectReward(no);
		
//		try {
//			byte[] file = getImage(event.getThumbnail());
//			log.info("byte[] : " + new String(file));
////			log.info("converted : " + file);
//			map.put("file", new Gson().toJson(file, Byte[].class ));
//			
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//			map.put("errorMsg", "불러올 이미지가 없습니다.");
//		} catch (IOException e) {
//			e.printStackTrace();
//			map.put("errorMsg", "이미지를 불러들이는 과정에서 문제가 발생했습니다. 다시 시도해주세요.");
//		}
		
		map.put("event", event);
		map.put("reward", reward);
		
//		log.info("map : " + map.toString());
		
		return map;
	}
	
	// 이미지 가져오기
//	private byte[] getImage(String fileName) throws FileNotFoundException, IOException {
//		String path = new File("").getAbsolutePath() + "\\src/main/resources/images/event/" + fileName;
//		
//		// try 1
//		// file read
//		InputStream inStream = new FileInputStream(path);
//		
//		// file -> byte[]
//		return IOUtils.toByteArray(inStream);
//		
//		// try 2
//		File file = new File(path);
//		byte[] bArr = new byte[(int)file.length()];
//		InputStream inStream = new FileInputStream(file);
//		inStream.read(bArr, 0, bArr.length-1);
//		inStream.close();
//		
//		String encodeStr = Base64.encodeBase64String(bArr);
//		return encodeStr;
//		
//		// try 3
//		return file;
//	}
	
	/*
	 * 로직 정리 필요 (중복 코드가 많음) -> 업데이트인 경우만 따로 추가해야할 부분, 수행할 부분 구별
	 * */
	@PostMapping(value= {"/uploadEvent", "/updateEvent/{no}"}) // 이미지 경로
	public String upEvent(EventForm eventForm, HttpServletRequest request, @PathVariable(required=false) String no) {
		
		String filePath;
		Event event = null;
		Reward reward = null;
		// reward 여러개 담을 리스트
		List<Reward> list = new ArrayList();
		// event, reward 하나로 묶는 객체
		HashMap<String, Object> map = new HashMap();
		// 정보 수정 / 이벤트 추가 서비스 구분
		String serviceKind = "";
		String response = "";

//		log.info(eventForm.toString());
		
		try {
			filePath = fileUpload.uploadFile(eventForm.getThumbFile(), request, "event");
		} catch (IOException e) {
			e.printStackTrace();
			response = "이미지 업로드 과정에서 문제가 발생했습니다. 다시 시도해주세요.";
			return response;
		}
		
		String rank = "";
		String amount = "";
		
//		if(eventForm.getNo()!=null && !eventForm.getNo().equals("undefined")) {
		if(no !=null && no.length()>0) {
			// update logic
			event = Event.builder().no(eventForm.getNo())
									.title(eventForm.getTitle())
									.content(eventForm.getContent())
									.startDate(eventForm.getStartDate())
									.endDate(eventForm.getEndDate())
									.winnerDate(eventForm.getWinnerDate())
									.videoLink(eventForm.getVideoLink())
									.detailLink(eventForm.getDetailLink())
									.pageLink(eventForm.getPageLink())
									.eventCategory(eventForm.getEventCategory())
									.winTime(eventForm.getWinTime())
									.thumbnail(filePath).build();
			
			for(int i=0; i<eventForm.getAmount().size(); i++) {
				rank = eventForm.getRank().get(i).equals("선택") ? "1" : eventForm.getRank().get(i);
				amount = eventForm.getAmount().get(i).length()==0 ? "0" : eventForm.getAmount().get(i);
				
				// 기존에 등록했던 상품인 경우
				List<String> rewardNoList = eventForm.getRewardNo();
				
				if(i<rewardNoList.size() && rewardNoList.get(i).length()>0) {
					reward = Reward.builder().rewardNo(Integer.parseInt(eventForm.getRewardNo().get(i)))
											.rewardName(eventForm.getRewardName().get(i))
											.brand(eventForm.getBrand().get(i))
											.rank(Integer.parseInt(rank))
											.amount(Integer.parseInt(amount))
											.rewardRange(eventForm.getRewardRange().get(i))
											.rewardCategory(eventForm.getRewardCategory().get(i))
											.eventNo(eventForm.getNo()).build();
				}else {
					reward = Reward.builder().rewardName(eventForm.getRewardName().get(i))
											.brand(eventForm.getBrand().get(i))
											.rank(Integer.parseInt(rank))
											.amount(Integer.parseInt(amount))
											.rewardRange(eventForm.getRewardRange().get(i))
											.rewardCategory(eventForm.getRewardCategory().get(i))
											.eventNo(eventForm.getNo()).build();
				}
				list.add(i, reward);
			}
			
			serviceKind = "update";
		} else {
			// insert logic
			event = Event.builder()
								.title(eventForm.getTitle())
								.content(eventForm.getContent())
								.startDate(eventForm.getStartDate())
								.endDate(eventForm.getEndDate())
								.winnerDate(eventForm.getWinnerDate())
								.videoLink(eventForm.getVideoLink())
								.detailLink(eventForm.getDetailLink())
								.pageLink(eventForm.getPageLink())
								.eventCategory(eventForm.getEventCategory())
								.winTime(eventForm.getWinTime())
								.thumbnail(filePath).build();

			for(int i=0; i<eventForm.getAmount().size(); i++) {
				rank = eventForm.getRank().get(i).equals("선택") ? "1" : eventForm.getRank().get(i);
				amount = eventForm.getAmount().get(i).length()==0 ? "0" : eventForm.getAmount().get(i);
				
				reward = Reward.builder()
									.rewardName(eventForm.getRewardName().get(i))
									.brand(eventForm.getBrand().get(i))
									.rank(Integer.parseInt(rank))
									.amount(Integer.parseInt(amount))
									.rewardRange(eventForm.getRewardRange().get(i))
									.rewardCategory(eventForm.getRewardCategory().get(i))
									.eventNo(eventForm.getNo()).build();
				
				list.add(i, reward);
			}
			serviceKind = "insert";
		}
		
		map.put("event", event);
		map.put("reward", list);
		
//		log.info("data : " + event.toString());
//		log.info("data : " + reward.toString());
		
		// 쿼리 수행 결과값
		int result = 0;
		
		switch(serviceKind) {
		case "update" : result = eService.updateEvent(map); break;
		case "insert" : result = eService.insertEvent(map); break;
		}
		
		switch(result) {
		case 0: response = "다시 시도해주세요"; break;
		case 1: response = "완료했습니다."; break;
		}
		
		return response;
	}
	
	/*
	 * 원래 db에서 삭제하려 했으나 이벤트 당첨자 및 참여 기록 관리를 위해 event_deleted를 n->y로 변경
	 * */
	@GetMapping("/delete") 
	public int deleteEvent(@RequestParam String no) {
		return eService.deleteEvent(no);
	}
	
	@Transactional
	@PostMapping("/sendMsg/{no}")
	public String sendMsg(@PathVariable String no, @RequestBody HashMap<String, Object> map) {
		
		Event event = eService.selectEvent(no);
		if(event.getTitle().length()==0) {
			return "해당 이벤트 데이터를 불러오는 데에 실패하였습니다.";
		}
		
		map.put("event", event);
//		log.info("no : " + no + "/map : " + map.toString());
		
		int result = eService.sendMsg(map);
		
		if(result>0) {
			return "쪽지를 보냈습니다.";
		}else {
			return "다시 시도해주세요.";
		}
	}
	
	// 일반 이벤트 케이스
	@Transactional
	@PostMapping("/join")
	public Map<String, Object> joinEvent(@RequestBody Map<String, Object> data) { // eventNo, userNo
//		log.info("join의 data : " + data.toString());
		Map<String, Object> msgMap = new HashMap();
		String coinText = "";
		String resultText = "";
		// 1. 해당 이벤트에 이미 참여한 적이 있는지 조회
		int join = eService.checkEventJoin(data);
		if(join>0) {
			msgMap.put("msg", "이미 응모하셨습니다.");
			return msgMap;
		}
		
		// 2. 응모권이 있는지 조회
		List<Integer> ticketList = eService.checkTickets(data);
		if(!(ticketList.size() > 0)) {
			msgMap.put("msg", "사용가능한 응모권이 없습니다.");
			return msgMap;
		}
		
		// 2. 참여한 적이 없는 경우 이벤트에 참여
		data.put("ticket", ticketList.get(0));
//		int result = eService.joinEvent(data);
		eService.joinEvent(data);
		
//		log.info("data total : " + data.toString());
		// 프로시저로부터 결과값 가져오기
		int result = (int) data.get("rows");
		
		if(result>0) {
			
			data = getCoin((String)data.get("eventNo"), data);
//			log.info("coin after" + data.toString());
			msgMap.put("coin", data.get("coin"));
			resultText = "이벤트에 응모해주셔서 감사합니다.";
			
			// 이벤트 응모한 사실 이메일로 보내기
			Email emailData = eService.findEmailInfo(data);
			String title = "[이벤트] '" + emailData.getEventTitle() + "' 응모하였습니다.";
			String text = "안녕하세요. " + emailData.getReceiverName() + "님!\n" + "이벤트에 응모해주셔서 감사합니다.\n당첨자 발표일까지 기다려주세요.";
			emailData.setTitle(title);
			emailData.setText(text);
			
			emailService.sendEmail(emailData);
		} else {
			resultText = "다시 시도해주세요.";
		}
		
		msgMap.put("msg", resultText);
		
		return msgMap;
	}
	
	/**
	 * @param eventNo : 이벤트 정보를 조회하기 위한 이벤트 번호
	 * @param map : 코인 획득 결과를 담을 map
	 * @return Map<String, Object> : 응답 map
	 */
	private Map<String, Object> getCoin(String eventNo, Map<String, Object> map){
//		log.info("eventNo : " + eventNo + "map : " + map.toString());
		Event event = eService.selectEvent(eventNo);
		String winPoint = event.getWinTime();
		String pageLink = event.getPageLink();
//		log.info("event : " + event.toString() + "winP : " + winPoint + "page : " + pageLink);
		// 랜덤 포인트를 갖는 이벤트인 경우
		if(!winPoint.equals("일자")) {
			int result;
			int coin;
			Map<String, Object> data = new HashMap();
			
			if(pageLink!=null && pageLink.contains("Login")) { // 로그인 이벤트인 경우
				coin = (int)(Math.random()*50)+1;
				data.put("coin", coin);
				data.put("content", "[이벤트] 출석 랜덤 포인트");
				
			}else { // 일반 이벤트인 경우
				coin = (int)(Math.random()*1000)+1;
				data.put("coin", coin);
				data.put("content", "[이벤트] 이벤트 응모 기념 랜덤 포인트");
			}
			// 획득한 포인트 db 저장
			data.put("eventNo", eventNo);
			data.put("userNo", map.get("userNo"));
			eService.addPoint(data);	
			result = (Integer)data.get("result");
			
			if(result>0) {
				map.put("coin", coin);	
				log.info("map : " + map.toString());
			}
		}
//		log.info("getCoin : " + map.toString());
		return map;
	}
	
	// 로그인 이벤트인 케이스
	@PostMapping("/loadLogin")
	public EventJoin loadLogin(@RequestBody Map<String, Object> data){
//		log.info("param : " + data.toString());
		EventJoin result = eService.loadLogin(data);
//		log.info("login : " + result.toString());
		return result;
	}
	
	@Transactional
	@PostMapping("/loginCheck")
	public Map<String, Object> loginCheck(@RequestBody Map<String, Object> data){
		Map<String, Object> result = new HashMap();
		int num = 0; // sql 결과
		
//		// 1. 오늘자 체크했는지 여부 확인 -> loadLogin으로 분리함
//		int checkStatus = eService.checkTdyLogin(data);
//		if(checkStatus>0) {
//			result.put("num", num);
//			result.put("msg", "이미 출석 체크하였습니다.");
//			
//			return result;
//		}
		
		// 2. 출석하기
//		log.info("data : " + data.toString());
		num = eService.checkTdyLogin(data);
//		log.info("num : " + num);
		
		String text;
		if(num>0) {
			// data의 속성명 추가 (loginUserNo, userNo) 사용 위해
			data.put("userNo", Integer.parseInt((String)data.get("loginUserNo")));
			
			int coin = (Integer)getCoin((String)data.get("eventNo"), data).get("coin");
			result.put("coin", coin); // 획득한 포인트
			text = "출석 체크하였습니다.";
			
		}else {
			text = "다시 시도해주세요.";
		}
		
		result.put("num", num); // 출석 성공 여부
		result.put("msg", text); // 결과 메시지
		
		return result;
	}
}
