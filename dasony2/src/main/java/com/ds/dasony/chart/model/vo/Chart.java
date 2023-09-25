package com.ds.dasony.chart.model.vo;

import java.sql.Date;

import com.ds.dasony.event.model.vo.Event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chart {

	private Date date; // 데이터 날짜
	private int total; // 전체 값
	private int value1; // 수치1 절대값
	private int value2; // 수치2 절대값
	private int rate1; // 수치1 비율
	private int rate2; // 수치2 비율
}
