package com.ds.dasony.chat.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
	
private int chatNo;//	CHAT_NO
private String chatMsg;//	CHAT_MSG
private Date chatDate;//	CHAT_DATE
private int chatRoomNo;//	CHATROOM_NO
private long userNo;//	USER_NO

private String userName;

//private String chatRoomTitle;

}
