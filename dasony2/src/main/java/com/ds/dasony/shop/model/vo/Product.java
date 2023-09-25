package com.ds.dasony.shop.model.vo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
	private String productNo;
	private String  shopOkey;
	private String  productName;
	private int productAmount;
	private List productImg;
	private String shopName;
	private String shopCate;

}
