package com.ds.dasony.shop.model.vo;

import org.springframework.core.io.Resource;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductImg {
	private String productImgNo;
	private String productNo;
	private String productImgModName;
	private String productImgOriName;
	private String productImgPath;
	private String productImgUploadDate;
	private String productImgLevel;
	private String productImgStatus;

}
