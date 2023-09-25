package com.ds.dasony.shop.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Shop {
	
	private String shopOkey;
	private String shopName;
	private String shopAddress;
	private String shopRegion;
	private String shopCate;
	private Date shopJoinDate;

}
