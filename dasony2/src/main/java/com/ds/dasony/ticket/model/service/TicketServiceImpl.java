package com.ds.dasony.ticket.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.ds.dasony.ticket.model.dao.TicketDao;
import com.ds.dasony.ticket.model.vo.Ticket;

@Service
public class TicketServiceImpl implements TicketService{

	@Autowired
	private TicketDao ticketDao;
	
	@Override
	public int insertTicket(Ticket ticketData) {
		return ticketDao.insertTicket(ticketData);
	}
	
}
