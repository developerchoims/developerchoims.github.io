package com.ds.dasony.event.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ds.dasony.event.model.dao.EventDao;
import com.ds.dasony.event.model.vo.Email;
import com.ds.dasony.event.model.vo.Event;
import com.ds.dasony.event.model.vo.EventJoin;
import com.ds.dasony.event.model.vo.Reward;
import com.ds.dasony.member.model.dao.UserDao;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EventServiceImpl implements EventService{

	@Autowired
	private EventDao eDao;
	@Autowired
	private UserDao uDao;

	@Override
	public List<Event> selectAllEvent(Map<String, Object> param) {
		return eDao.selectAllEvent(param);
	}

	@Override
	public Event selectEvent(String no) {
		return eDao.selectEvent(no);
	}

	@Override
	public List<Reward> selectReward(String no) {
		return eDao.selectReward(no);
	}

	@Transactional
	@Override
	public int updateEvent(HashMap<String, Object> map) {
		// event, reward로 분리
		Event event = (Event) map.get("event");
		List<Reward> rewardList = (List<Reward>) map.get("reward");
		// 최종 결과값
		int result = 1;
		
//		log.info(event.toString());
//		log.info(rewardList.toString());
		
		result *= eDao.updateEventInfo(event);
		if(result==0) return result;
		
		for(Reward reward : rewardList) {
			if(reward.getRewardNo()>0) {
				result *= eDao.updateRewardInfo(reward);				
			}else {
				if(reward.getRewardName()!=null && reward.getRewardName().length()!=0)
					result *= eDao.insertRewardInfo(reward);	
			}
		}
		return result;
	}

	@Transactional
	@Override
	public int insertEvent(HashMap<String, Object> map) {
		// event, reward로 분리
		Event event = (Event) map.get("event");
		List<Reward> rewardList = (List<Reward>) map.get("reward");
		// 최종 결과값
		int result = 1;
		
		result *= eDao.insertEventInfo(event);
//		log.info("insert result : " + result);
		if(result==0) return result;
		
		for(Reward reward : rewardList) {
			if(reward.getRewardName()!=null && reward.getRewardName().length()!=0) {
				result *= eDao.insertRewardInfo(reward);
			}
		}
				
		return result;
	}

	@Override
	public int deleteEvent(String no) {
		return eDao.deleteEvent(no);
	}

	@Override
	public int sendMsg(HashMap<String, Object> map) {
		return eDao.sendMsg(map);
	}

	@Override
	public int checkEventJoin(Map<String, Object> data) {
		return eDao.checkEventJoin(data);
	}

	@Transactional
	@Override
	public int joinEvent(Map<String, Object> data) {
		return eDao.joinEvent(data);
	}
	
	@Override
	public EventJoin loadLogin(Map<String, Object> data) {
		EventJoin ej = eDao.loadLogin(data);
		int count = eDao.loadLoginCount(data);
		ej.setCount(count);
		return ej;
	}

	@Override
	public int checkTdyLogin(Map<String, Object> data) {
		return eDao.checkTdyLogin(data);
	}

	@Override
	public List<Integer> checkTickets(Map<String, Object> data) {
		return eDao.checkTickets(data);
	}

	@Override
	public int addPoint(Map<String, Object> data) {
		return eDao.addPoint(data);
	}

	@Override
	public Email findEmailInfo(Map<String, Object> data) {
		return eDao.findEmailInfo(data);
	}

}
