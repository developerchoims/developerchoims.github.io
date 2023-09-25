package com.ds.dasony.alert.model.vo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alert {
	
	
	private int alertNo;
	private long userNo;
	private String alertContent;
	private String alertDate;
	private String alertCate;
	private String alertStatus;
	private String alertTitle;
	private int boardNo;
}
