package com.ds.dasony.chat.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.chat.model.vo.ChatCare;
import com.ds.dasony.chat.model.vo.ChatJoin;
import com.ds.dasony.chat.model.vo.ChatMessage;
import com.ds.dasony.chat.model.vo.ChatRoom;

public interface ChatService {

	List<ChatRoom> selectChatList();

	int openChatRoom(ChatRoom room, String userRegion);

	int insertChatMessage(ChatMessage chatMessage);

	List<ChatMessage> joinChatRoom(ChatJoin join);

	int exitChat(ChatJoin join);

	List<ChatRoom> selectUserChatList(long userNo);

	int addStars(Map<String, Object> map);

	List<ChatCare> getStars(Map<String, Object> map);

	int delStar(Map<String, Object> map);

}
