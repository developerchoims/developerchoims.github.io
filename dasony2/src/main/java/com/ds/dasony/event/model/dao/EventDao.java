package com.ds.dasony.event.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.event.model.vo.Email;
import com.ds.dasony.event.model.vo.Event;
import com.ds.dasony.event.model.vo.EventJoin;
import com.ds.dasony.event.model.vo.Reward;
import com.ds.dasony.ticket.model.vo.Ticket;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class EventDao {

	@Autowired
	private SqlSessionTemplate session;

	public List<Event> selectAllEvent(Map<String, Object> param) {
		return session.selectList("event.selectAllEvent", param);
	}

	public Event selectEvent(String no) {
		Event result = session.selectOne("event.selectEvent", no);
//		log.info("event : " + result.toString());
		return result;
	}

	public List<Reward> selectReward(String no) {
		List<Reward> result = session.selectList("event.selectReward", no);
//		log.info("reward : " + result.toString());
		return result;
	}

	public int updateEventInfo(Event event) {
		int result = 1;
		result *= session.update("event.updateEventInfo", event);
		result *= session.update("event.updateEventCategory", event);
		result *= session.update("event.updateEventWinCategory", event);
		return result;
	}

	public int updateRewardInfo(Reward reward) {
		int result = 1;
		result *= session.update("event.updateRewardInfo", reward);
		result *= session.update("event.updateEventRewardInfo", reward);
		return result;
	}

	public int insertRewardInfo(Reward reward){
		int result = 1;
		reward.setRewardRange(session.selectOne("event.changeRewardRange", reward.getRewardRange()));
		
		result *= session.insert("event.insertRewardInfo", reward);
		result *= session.insert("event.insertEventRewardInfo", reward);
		return result;
	}

	public int insertEventInfo(Event event) {
		int result = 1;
		result *= session.insert("event.insertEventInfo", event);
		result *= session.insert("event.insertEventCategory", event);
		result *= session.insert("event.insertEventWinCategory", event);
		
//		log.info("event : " + event.toString());
		return result;
	}

	public int deleteEvent(String no) {
		return session.update("event.deleteEvent", no);
	}

	public int sendMsg(HashMap<String, Object> map) {
		int result = 1;
		String title = ((Event)map.get("event")).getTitle();
		map.put("title", title);
		
		String msgRange = (String) map.get("msgRange");
		// param map
		Map<String, Object> param = new HashMap();
		param.put("no", ((Event)map.get("event")).getNo());
		param.put("msgRange", msgRange);
		
		List<Integer> targets = session.selectList("event.selectMsgTarget", param);
//		log.info("param::{}", param);
//		log.info("list : " + targets.toString());
		
		for(int target : targets) {
			map.put("target", target);
			result *= session.insert("event.sendMsg", map);
		}
		
		return result;
	}

	public int checkEventJoin(Map<String, Object> data) {
//		log.info("dao-check : " + data.toString());
		return session.selectOne("event.checkEventJoin", data);
	}

	public int joinEvent(Map<String, Object> data) {
		return session.insert("event.joinEvent", data);
	}
	
	public EventJoin loadLogin(Map<String, Object> data) {
		EventJoin result = session.selectOne("event.loadLogin", data);
		if(result==null) {
			result = session.selectOne("event.memberLoginInfo", data);
			result.setEndDate(session.selectOne("event.selectEndDate", data));
			result.setCount(session.selectOne("event.findLast", data));
			result.setTdyCheck("N");
		}
//		log.info("result : " + result.toString());
		return result;
	}

	public int checkTdyLogin(Map<String, Object> data) {
		int lastNum = session.selectOne("event.findLast", data);
		data.put("lastNum", lastNum);
//		log.info("str  : " + lastNum);
		int result = session.insert("event.checkTdyLogin", data);
//		log.info("Result : " + result);
		
		return result;
	}

	public List<Integer> checkTickets(Map<String, Object> data) {
		return session.selectList("event.checkTickets", data);
	}

	public List<Event> raffleEvent() {
		return session.selectList("event.raffleEvent");
	}

	public List<String> findAllParticipants(String eventNo) {
		return session.selectList("event.findAllParticipants", eventNo);
	}

	public List<Reward> findAllReward(String eventNo) {
		return session.selectList("event.findAllReward", eventNo);
	}

	public int addWinner(Map<Integer, Object> winnerMap) {
		int result = 1;
		for(int reward : winnerMap.keySet()) { // {상품번호: [당첨자]}
			HashSet<String> winnerSet = (HashSet<String>) winnerMap.get(reward);
	        List<String> winnerList = new ArrayList<>(winnerSet);
	        
			for(String winner : winnerSet) {
				Map<String, Object> rewardWinner = new HashMap();
				rewardWinner.put("rewardNo", reward);
				rewardWinner.put("winner", winner);
				
//				log.info("rewardWinner : " + rewardWinner.toString());
				result *= session.insert("event.addWinner", rewardWinner);
			}
		}
		return result;
	}

	public List<String> findLoginCheckUsers(String eventNo, int day) {
		Map<String, Object> param = new HashMap();	
		param.put("eventNo", eventNo);
		param.put("day", day);
		return session.selectList("event.findLoginCheckUsers", param);
	}

	public int addPoint(Map<String, Object> data) {
		return session.insert("event.addPoint", data);
	}

	public int loadLoginCount(Map<String, Object> data) {
		return session.selectOne("event.loadLoginCount", data);
	}

	public Reward selectRewardType(int rewardNo) {
		return session.selectOne("event.selectRewardType", rewardNo);
	}

	public int selectUserJoin(String joinNo) {
		return session.selectOne("event.selectUserJoin", joinNo);
	}

	public Email findEmailInfo(Map<String, Object> data) {
		return session.selectOne("event.findEmailInfo", data);
	}
	
}
