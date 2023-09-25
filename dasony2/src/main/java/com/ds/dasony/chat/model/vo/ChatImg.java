package com.ds.dasony.chat.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatImg {

private int	ChatImgNo;
private String ChatImgModName;
private String ChatImgOriName;
private String ChatImgPath;
private Date ChatImgUploadDate;
private String ChatImgStatus;
private int ChatRoomNo;
private int userNo;
}