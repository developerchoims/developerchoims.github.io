package com.ds.dasony.shop.model.vo;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Coupon {

	private int couponNo;
	private String couponOkey;
	private Date couponSwapDate;
	private Date couponExpireDate;
	private String couponUseStatus;
	private String couponName;
	private String userNo;
	private String productNo;
}
