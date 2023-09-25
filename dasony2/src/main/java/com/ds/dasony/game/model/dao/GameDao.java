package com.ds.dasony.game.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.alert.model.vo.Alert;
import com.ds.dasony.game.model.vo.Game;
import com.ds.dasony.member.model.vo.User;

@Repository
public class GameDao {
		
	@Autowired
	private SqlSessionTemplate session;
	
	public int insertGame(Game gameData) {
		
		int result = session.insert("game.insertGame",gameData);
		int result2 = session.update("game.gameEnd",gameData);
		return result + result2;
	}

	public String gameStartYN(int userNo) {
		String result =  session.selectOne("memberMapper.gameStartYN",userNo);
		return result;
	}

	public String gameSet(int userNo) {
		return session.selectOne("game.gameSet",userNo);
	}

	public int letStartGame(int userNo) {
		return session.update("game.letStartGame",userNo);
	}

}
