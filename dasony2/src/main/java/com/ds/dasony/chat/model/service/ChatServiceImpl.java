package com.ds.dasony.chat.model.service;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.Utils;
import com.ds.dasony.chat.model.dao.ChatDao;
import com.ds.dasony.chat.model.vo.ChatCare;
import com.ds.dasony.chat.model.vo.ChatJoin;
import com.ds.dasony.chat.model.vo.ChatMessage;
import com.ds.dasony.chat.model.vo.ChatRoom;

@Service
public class ChatServiceImpl implements ChatService{
	
	private final ChatDao chatDao;
	
	@Autowired
	public ChatServiceImpl(ChatDao chatDao) {
		this.chatDao = chatDao;
	}

	@Override
	public List<ChatRoom> selectChatList() {
		return chatDao.selectChatList();
	}

	@Override
	public int openChatRoom(ChatRoom room, String userRegion) {
		room.setChatRoomRegion(userRegion);
		int chatRoomNo = chatDao.openChatRoom(room);
		
		return chatRoomNo;
	}

	@Override
	public int insertChatMessage(ChatMessage chatMessage) {
		
		chatMessage.setChatMsg(Utils.newLineHandling(chatMessage.getChatMsg()));
		chatMessage.setChatDate(new Date(System.currentTimeMillis()));
		
		return chatDao.insertChatMessage(chatMessage);
	}

	@Override
	public List<ChatMessage> joinChatRoom(ChatJoin join) {
		
		int result = chatDao.joinCheck(join);
		
		if(result == 0) {
			chatDao.joinChatRoom(join);
		}
		return chatDao.selectChatMessage(join.getChatRoomNo());
	}

	@Override
	public int exitChat(ChatJoin join) {
		
		int result = chatDao.exitChat(join);
		
		if(result > 0) {
			int cnt = chatDao.countChatMem(join.getChatRoomNo());
			
			if(cnt == 0) {
				result = chatDao.closeChat(join.getChatRoomNo());
			}
		}
		return result;
	}

	@Override
	public List<ChatRoom> selectUserChatList(long userNo) {
		return chatDao.selectUserChatList(userNo);
	}

	@Override
	public int addStars(Map<String, Object> map) {
		return chatDao.addStars(map);
	}

	@Override
	public List<ChatCare> getStars(Map<String, Object> map) {
		return chatDao.getStars(map);
	}

	@Override
	public int delStar(Map<String, Object> map) {
		return chatDao.delStar(map);
	}
}
