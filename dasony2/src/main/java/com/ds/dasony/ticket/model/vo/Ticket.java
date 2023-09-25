package com.ds.dasony.ticket.model.vo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {
	
	private int TicketNo;
	private long userNo;
	private int gameNo;
	private String ticketStatus;
	
	

}
