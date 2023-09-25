package com.ds.dasony.event.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reward {

	private int rewardNo;
	private String rewardName;
	private String brand;
	private String rewardRange; // A(전체), S(일부) 경품 지급 범위
	private String rewardCategory; // 포인트, 쿠폰(일반 상품도 쿠폰으로 분류)
	private int rank;
	private int amount;
	private String eventNo;

}
