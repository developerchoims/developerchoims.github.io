package com.ds.dasony.common.model.service;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ds.dasony.common.model.dao.SessionDao;
import com.ds.dasony.common.model.vo.SessionModel;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SessionService {
	
	@Autowired
	private SessionModel session; // 따로 생성한 model
	@Autowired
	private SessionDao sessionDao;

	@Transactional
	public void addVisitor(HttpServletRequest request) {
		// IP 가져오기 
		try {
			session.setVisitorIp(getVisitorIp(request));
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} // req.getRemoteAddr()
		// browser 가져오기
		session.setVisitorAgent(request.getHeader("User-Agent"));
		// 접속 이전 사이트 가져오기
		session.setVisitorRefer(request.getHeader("referer"));
		
//		log.info("session : " + session.toString());
		
		if(!(checkVisit(session)>0)) {
			sessionDao.addVisitor(session);			
		}
//		else {
//			log.info("이미 방문한 사람");
//		}
	}
	
	public int checkVisit(SessionModel session) {
//		SessionModel session = getSession(request);
//		log.info("check session : " + session.toString());
		return sessionDao.checkVisit(session);
	}
	
	private SessionModel getSession(HttpServletRequest request) {
		// IP 가져오기 
		try {
			session.setVisitorIp(getVisitorIp(request)); // req.getRemoteAddr()
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} 
		// browser 가져오기
		session.setVisitorAgent(request.getHeader("User-Agent"));
		// 접속 이전 사이트 가져오기
		session.setVisitorRefer(request.getHeader("referer"));
		
		return session;
	}
	
	private static String getVisitorIp (HttpServletRequest request) throws UnknownHostException {
	    String ip = request.getHeader("X-Forwarded-For");
	 
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("Proxy-Client-IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("HTTP_CLIENT_IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("HTTP_X_FORWARDED_FOR");
	    }
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("X-RealIP"); 
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("REMOTE_ADDR");
        }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getRemoteAddr();
	    }
	    
	    if(ip.equals("0:0:0:0:0:0:0:1") || ip.equals("127.0.0.1")) {
	    	InetAddress address = InetAddress.getLocalHost();
	    	ip = address.getHostName() + "/" + address.getHostAddress();
	    }
	 
	    return ip;
	}
	
}
