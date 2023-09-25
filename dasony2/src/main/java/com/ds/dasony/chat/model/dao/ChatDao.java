package com.ds.dasony.chat.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.chat.model.vo.ChatCare;
import com.ds.dasony.chat.model.vo.ChatJoin;
import com.ds.dasony.chat.model.vo.ChatMessage;
import com.ds.dasony.chat.model.vo.ChatRoom;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class ChatDao {
	
	private SqlSessionTemplate session;
	
	@Autowired
	public ChatDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<ChatRoom> selectChatList() {
		return session.selectList("chatMapper.selectChatList");
	}

	public int openChatRoom(ChatRoom chatRoom) {
		log.info("room : " + chatRoom.toString());
		int result = session.insert("chatMapper.openChatRoom", chatRoom);
		
		if(result > 0) {
			result = chatRoom.getChatRoomNo();
			log.info("chat new : " + result);
		}
		return result;
	}

	public int insertChatMessage(ChatMessage chatMessage) {
		return session.insert("chatMapper.insertChatMessage", chatMessage);
	}

	public int joinCheck(ChatJoin join) {
		return session.selectOne("chatMapper.joinCheck", join);
	}

	public void joinChatRoom(ChatJoin join) {
		session.insert("chatMapper.joinChatRoom", join);
	}

	public List<ChatMessage> selectChatMessage(int chatRoomNo) {
		return session.selectList("chatMapper.selectChatMessage", chatRoomNo);
	}

	public int exitChat(ChatJoin join) {
		return session.delete("chatMapper.exitChat", join);
	}

	public int countChatMem(int chatRoomNo) {
		return session.selectOne("chatMapper.countChatMem", chatRoomNo);
	}

	public int closeChat(int chatRoomNo) {
		return session.update("chatMapper.closeChat", chatRoomNo);
	}

	public List<ChatRoom> selectUserChatList(long userNo) {
		return session.selectList("chatMapper.selectUserChatList", userNo);
	}

	public int addStars(Map<String, Object> map) {
		return session.insert("chatMapper.addStars", map);
	}

	public List<ChatCare> getStars(Map<String, Object> map) {
		return session.selectList("chatMapper.getStars", map);
	}

	public int delStar(Map<String, Object> map) {
		return session.delete("chatMapper.delStar", map);
	}
	
	
}
