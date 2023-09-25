package com.ds.dasony.point.model.vo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Point {
	private int PointNo;
	private long userNo;
	private String pointContent;
	private int pointAmount;
	private String ExpireDate;
	private String pointEventDate;
	private String pointCate;
}
