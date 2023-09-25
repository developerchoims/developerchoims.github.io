package com.ds.dasony.game.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ds.dasony.game.model.dao.GameDao;
import com.ds.dasony.game.model.vo.Game;
import com.ds.dasony.member.model.vo.User;

@Service
public class GameServiceImpl implements GameService{
	
	@Autowired
	private GameDao gameDao;
	
	@Override
	public int insertGame(Game gameData) {
		return gameDao.insertGame(gameData);
	}
	
	@Override
	public String gameStartYN(int userNo) {
		return gameDao.gameStartYN(userNo);
	}
	@Override
	public String gameSet(int userNo) {
		return gameDao.gameSet(userNo);
	}
	@Override
	public int letStartGame(int userNo) {
		return gameDao.letStartGame(userNo);
	}
	
}
