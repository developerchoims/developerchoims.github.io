package com.ds.dasony.ticket.controller;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ds.dasony.game.controller.gameController;
import com.ds.dasony.game.model.service.GameService;
import com.ds.dasony.game.model.vo.Game;
import com.ds.dasony.ticket.model.service.TicketService;
import com.ds.dasony.ticket.model.vo.Ticket;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/api") // 공통주소
public class TicketController {

	@Autowired
	private TicketService ticketservice;
		
	@Autowired
	private ServletContext application;

	@Autowired
	private ResourceLoader resourceLoader;
	
	@PostMapping("/insertTicket")
	public  ResponseEntity<String> insertTicket(@RequestBody Ticket ticketData) {
		int result = ticketservice.insertTicket(ticketData);
		if (result>0) {
	        return ResponseEntity.ok("Success");
	    } else {
	        return ResponseEntity.badRequest().body("Failed");
	    }
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
