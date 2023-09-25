package com.ds.dasony.chat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatJoin {

	private int chatRoomNo;
	private long userNo;
}