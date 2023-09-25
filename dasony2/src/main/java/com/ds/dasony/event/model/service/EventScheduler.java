package com.ds.dasony.event.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ds.dasony.event.model.dao.EventDao;
import com.ds.dasony.event.model.vo.Email;
import com.ds.dasony.event.model.vo.Event;
import com.ds.dasony.event.model.vo.Reward;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class EventScheduler {
	
	@Autowired
	EventDao eDao;
	@Autowired
	EmailService emailService;

	@Transactional
	@Scheduled(cron="0 0 0 * * *")
	public void addWinner() {
		
		// 1. 매일 당첨자 추첨일이 당일 + 당첨 발표 방식(일자, 복합)인 이벤트 조회
		List<Event> eventList = eDao.raffleEvent();
//		log.info("추첨 대상 이벤트 : " + eventList.toString());
		
		// test
//		Map<String, Object> map1 = new HashMap();
//		map1.put("no", "E0002");
//		map1.put("pageLink", "LoginEvent09.js");
//		
//		Map<String, Object> map2 = new HashMap();
//		map2.put("no", "E0035");
//		map2.put("pageLink", null);
//		
//		List<Map> eventList = new ArrayList();
//		eventList.add(map1);
//		eventList.add(map2);
		
		// 2. 대상 이벤트별 상품 조회
//		for(Map<String, Object> map : eventList) {
		for(Event e : eventList) {
			// - 이벤트 중 로그인 이벤트인지 체크 (다른 추첨방식 사용)
			if(e.getPageLink()!=null && e.getPageLink().contains("Login")) {
				// 출석 15일 이상인 사람 조회
				List<String> login15List = eDao.findLoginCheckUsers(e.getNo(), 15);
				
				// 출석 30일 조회 (한달 출석)
				List<String> loginAllList = eDao.findLoginCheckUsers(e.getNo(), 30);
				
				List<Reward> rewards = eDao.findAllReward(e.getNo());
				
				Map<Integer, Object> winnerMap = new HashMap();
				
				// -중복 방지용 당첨자 리스트
				ArrayList<String> winnerList = new ArrayList();
				
				if(!login15List.isEmpty() && !loginAllList.isEmpty()) {
					for(Reward reward : rewards) {
						// 당첨 수
						int amount = reward.getAmount();
						// 당첨자 리스트
						Set<String> list = new HashSet<String>();
						
						if(reward.getRank()==0) { // 중복 당첨 가능 상품인 경우
							
							for(int i = 0; i<amount; i++) {
								String preWinner = shuffleWinner(login15List);
								
								if(!list.contains(preWinner)) {
									list.add(preWinner);
									continue;
								}
								i--;
							}
							winnerMap.put(reward.getRewardNo(), new HashSet<>(list)); // 최종 상품별 당첨자 목록에 저장
							sendEmailToWinner(e.getNo(), new HashSet<>(list)); // 이메일 전송
							// 당첨자 리스트 초기화
							list.clear();
							continue;
						}
						
						// 순위 있는 상품
						for(int i=0; i<amount; i++) {
							String preWinner = shuffleWinner(loginAllList);
							
							if(!winnerList.contains(preWinner)) {
								winnerList.add(preWinner);
								list.add(preWinner);
//								log.info("로그인 list : " + list.toString() + "winner : " + preWinner);
								continue;
							}
							i--;
						}
//						log.info("로그인 list: " + list.toString());
						Set<String> copied = clone(list);
//						log.info("copy : " + copied.toString());
						winnerMap.put(reward.getRewardNo(), new HashSet<>(list));
						sendEmailToWinner(e.getNo(), new HashSet<>(list));
						list.clear();
					}
//					log.info("로그인 winnerMap : " + winnerMap.toString());
					eDao.addWinner(winnerMap);
					pointReward(winnerMap);
				}
			}else {
				// 3. 참여자 조회 (참여번호)
				List<String> participants = eDao.findAllParticipants(e.getNo());
//				log.info("participatnts : " + participants.toString());
				// 4. 상품 조회 (상품번호, 순위, 개수)
				List<Reward> rewards = eDao.findAllReward(e.getNo());
//				log.info("rewards : " + rewards.toString());
				// 5. 상품별 당첨자 추첨
				Map<Integer, Object> winnerMap = new HashMap();
				
				// -중복 방지용 당첨자 리스트
				ArrayList<String> winnerList = new ArrayList();
				
				for(Reward reward : rewards) {
//					log.info("reward : " + reward.toString());
					// 당첨 수
					int amount = reward.getAmount();
					// 당첨자 리스트
					Set<String> list = new HashSet<String>();
					
					if(reward.getRank()==0) { // 중복 당첨 가능 상품인 경우
						
						for(int i = 0; i<amount; i++) {
							String preWinner = shuffleWinner(participants);
							
							if(!list.contains(preWinner)) {
								list.add(preWinner);
								continue;
							}
							i--;
						}
						winnerMap.put(reward.getRewardNo(), new HashSet<>(list)); // 최종 상품별 당첨자 목록에 저장
						sendEmailToWinner(e.getNo(), new HashSet<>(list));
						// 당첨자 리스트 초기화
						list.clear();
						continue;
					}
					
					// 순위 있는 상품
					for(int i=0; i<amount; i++) {
						String preWinner = shuffleWinner(participants);
						
						if(!winnerList.contains(preWinner)) {
							winnerList.add(preWinner);
							list.add(preWinner);
//							log.info("list : " + list.toString() + "winner : " + preWinner);
							continue;
						}
						i--;
					}
//					log.info("list: " + list.toString());
					Set<String> copied = clone(list);
//					log.info("copy : " + copied.toString());
					winnerMap.put(reward.getRewardNo(), new HashSet<>(list));
					sendEmailToWinner(e.getNo(), new HashSet<>(list));
					list.clear();
				}
				// 당첨자 추가
//				log.info("winnerMap : " + winnerMap.toString());
				eDao.addWinner(winnerMap);
				pointReward(winnerMap);
			}
		}
		
	}
	
	// 참여자 중 랜덤값으로 추첨
	private String shuffleWinner(List<String> participants) {
		int random = (int)(Math.random()*participants.size());
//		log.info("random : " + random);
		return participants.get(random);
	}
	
	// 상품이 포인트인 경우
	private void pointReward(Map<Integer, Object> winnerMap){
		Map<String, Object> pointMap = new HashMap();
		for(Integer rewardNo : winnerMap.keySet()) {
			Reward reward = eDao.selectRewardType(rewardNo);
			// 상품 타입 체크
			if(reward.getRewardCategory().equals("포인트")) {
				// 상품명에서 정규식 -> 획득 포인트
				Matcher matcher = Pattern.compile("[0-9]+").matcher(reward.getRewardName());
				if(matcher.find()) {
					int coin = Integer.parseInt(matcher.group());
					
					pointMap.put("rewardNo", rewardNo);
					pointMap.put("coin", coin);
					pointMap.put("content", "[이벤트] 이벤트 당첨을 축하드립니다.");
					pointMap.put("winner", winnerMap.get(rewardNo));
					
					HashSet<String> winnerList = (HashSet<String>) pointMap.get("winner");
					for(String joinNo : winnerList) {
						int userNo = eDao.selectUserJoin(joinNo);
						pointMap.put("userNo", userNo);
						
						eDao.addPoint(pointMap);
					}
				}
				
			}
		}
	}
	
	private void sendEmailToWinner(String eventNo, Set<String> winnerList) {
		// 이벤트 당첨 사실 이메일로 보내기
		for(String no : winnerList) {
			Map<String, Object> data = new HashMap();
			
			int userNo = eDao.selectUserJoin(no);
			data.put("eventNo", eventNo);
			data.put("userNo", userNo);
			
			Email emailData = eDao.findEmailInfo(data);
			String title = "[이벤트] '" + emailData.getEventTitle() + "' 당첨 안내";
			String text = "안녕하세요. " + emailData.getReceiverName() + "님!\n" + "이벤트에 당첨되셨습니다. 축하드립니다!";
			emailData.setTitle(title);
			emailData.setText(text);
			
			emailService.sendEmail(emailData);
		}
		
		
	}
	
	private Set<String> clone(Set<String> origin) {
		Set<String> copy = new HashSet<>(origin.size());
		
		for(String str : origin) {
			copy.add(new String(str));
		}
		
		return copy;
	}
}
