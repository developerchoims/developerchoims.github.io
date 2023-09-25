package com.ds.dasony.chart.model.dao;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChartDao {
	@Autowired
	SqlSessionTemplate session;

	public int selectTotalUserCount(String date) {
		return session.selectOne("chart.selectTotalUserCount", date);
	}

	public int selectValueUserCount(Map<String, Object> param) {
		return session.selectOne("chart.selectValueUserCount", param);
	}

	public int selectTotalVisitCount(String date) {
		return session.selectOne("chart.selectTotalVisitCount", date);
	}

	public int selectValueBoardCount(String date) {
		// 일반 게시글
		int count = session.selectOne("chart.selectValueBoardCount", date);
		// 투표글
		/* count += (int)session.selectOne("chart.selectValueVoteCount", date); */
		return count;
	}

	public int selectValueDonationCount(String date) {
		return session.selectOne("chart.selectValueDonationCount", date);
	}

}
