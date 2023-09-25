package com.ds.dasony.game.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.game.model.vo.Game;
import com.ds.dasony.member.model.vo.User;

public interface GameService {
	
	public int insertGame(Game gameData);

	public String gameStartYN(int userNo);

	public String gameSet(int userNo);

	public int letStartGame(int userNo);

}
