//package com.ds.dasony.common;
//
//import javax.servlet.annotation.WebListener;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpSession;
//import javax.servlet.http.HttpSessionEvent;
//import javax.servlet.http.HttpSessionListener;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.ds.dasony.common.model.dao.SessionDao;
//import com.ds.dasony.common.model.vo.Session;
//
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@WebListener
//public class SessionVisitCounter implements HttpSessionListener {
//
//	@Autowired
//	private SessionDao sessionDao;
//
//	@Autowired
//	private Session session; // 따로 생성한 model
//	
//	@Transactional
//	@Override
//	public void sessionCreated(HttpSessionEvent se) {
//		HttpSessionListener.super.sessionCreated(se);
//		
//		// 이벤트 발생한 세션 가져오기
//		HttpSession httpSession = se.getSession();
//		HttpServletRequest request = (HttpServletRequest) httpSession.getAttribute("javax.servlet.http.HttpServletRequest");
//		log.info("httpSe : " + httpSession.toString());
//		
//		// IP 가져오기 
//		session.setVisitorIp(getVisiterIp(request)); // req.getRemoteAddr()
//		// browser 가져오기
//		session.setVisitorAgent(request.getHeader("User-Agent"));
//		// 접속 이전 사이트 가져오기
//		session.setVisitorRefer(request.getHeader("referer"));
//		
//		log.info("session : " + session.toString());
//		
////		sessionDao.addVisitor(session);
//	}
//	
//	@Override
//	public void sessionDestroyed(HttpSessionEvent se){
//        //TODO Auto-generated method stub
//    }
//	
//	
//	private static String getVisiterIp (HttpServletRequest request) {
//	    String ip = request.getHeader("X-Forwarded-For");
//	 
//	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
//	        ip = request.getHeader("Proxy-Client-IP");
//	    }
//	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
//	        ip = request.getHeader("WL-Proxy-Client-IP");
//	    }
//	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
//	        ip = request.getHeader("HTTP_CLIENT_IP");
//	    }
//	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
//	        ip = request.getHeader("HTTP_X_FORWARDED_FOR");
//	    }
//	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
//	        ip = request.getRemoteAddr();
//	    }
//	 
//	    return ip;
//	}
//}
