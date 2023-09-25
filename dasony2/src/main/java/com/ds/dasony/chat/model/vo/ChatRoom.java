package com.ds.dasony.chat.model.vo;

import java.sql.Date;

import com.ds.dasony.donation.model.vo.Donation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {

private int chatRoomNo;//	CHATROOM_NO
private long userNo;//	USER_NO
private String chatRoomTitle;//	CHATROOM_TITLE
private String chatRoomStatus;//	CHATROOM_STATUS
private String chatRoomRegion; //CHATROOM_REGION

private String userName;
private int cnt;
}
