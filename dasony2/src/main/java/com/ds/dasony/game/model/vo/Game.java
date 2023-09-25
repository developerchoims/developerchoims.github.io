package com.ds.dasony.game.model.vo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {
	
	private int gameNo;
	private String gameDate;
	private String gameStatus;
	private String pointStatus;
	private String ticketStatus;
	private int userNo;
	
}
