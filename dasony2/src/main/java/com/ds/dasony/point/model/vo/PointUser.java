package com.ds.dasony.point.model.vo;

import java.sql.Date;
import java.util.List;

import com.ds.dasony.shop.model.vo.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PointUser {
	
	private int pointNo;
	private String pointStatus;
	private int pointAmount;
	private Date pointExpireDate;
	private Date pointEventDate;
	private int donaExecuteNo;
	private int gameNo;
	private int couponNo;

}
