package com.ds.dasony.chat.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ds.dasony.chat.model.service.ChatService;
import com.ds.dasony.chat.model.vo.ChatCare;
import com.ds.dasony.chat.model.vo.ChatJoin;
import com.ds.dasony.chat.model.vo.ChatMessage;
import com.ds.dasony.chat.model.vo.ChatRoom;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@SessionAttributes("chatRoomNo")
public class ChatController {
	
	private final ChatService chatService;
	private final SimpMessagingTemplate simpMessagingTemplate;
	
	@Autowired
	public ChatController(ChatService chatService, SimpMessagingTemplate simpMessagingTemplate) {
		this.chatService = chatService;
		this.simpMessagingTemplate = simpMessagingTemplate;
	}
	
	@GetMapping("/chatlist")
	public List<ChatRoom> selectChatList(){
		
		List<ChatRoom> crList = chatService.selectChatList();
		
		return crList;
	}
	
	@PostMapping("/openChatRoom")
	public Map<String, Object> openChatRoom(@RequestBody Map<String, Object> requestBody) {   
		
		Map<String, Object> response = new HashMap<>();
		
	    try {
	    	
	        Map<String, Object> newChatData = (Map<String, Object>) requestBody.get("newChat");
	        
	        long userNo = Long.parseLong(requestBody.get("userNo").toString());
	        String userRegion = (String) requestBody.get("userRegion");
	        String userName = (String) newChatData.get("userName");
	        
	        ChatRoom room = new ChatRoom();
	        
	        room.setUserNo(userNo);
	        room.setUserName(userName);
//	        room.setChatRoomRegion(userRegion);
	        room.setChatRoomTitle((String) newChatData.get("chatRoomTitle"));
	        
	        int chatRoomNo = chatService.openChatRoom(room, userRegion);
	        
	        log.info("chatRoomNo = {}", chatRoomNo);
	        
	        if (chatRoomNo > 0) {
	        	response.put("성공", "채팅방 생성 성공");
	        	 response.put("chatRoomNo", chatRoomNo);
	        }
	        else {
	        	 response.put("에러", "채팅방 개설 실패");    
	        }
	    } catch (Exception e) {
	        log.error("예외 발생: {}", e.getMessage(), e);
	        response.put("message", "예상치 못한 에러가 발생했습니다. 다시 시도해주세요.");
	    }
	    return response;
	}
	
	@MessageMapping("/chat/{chatRoomNo}")
	@SendTo("/sub/chat/{chatRoomNo}")
	public ChatMessage insertChatMessage(
			@DestinationVariable("chatRoomNo") int chatRoomNo, 
			ChatMessage chatMessage,
			SimpMessageHeaderAccessor accessor,
			@Header ("userNo") long userNo,
			@Header ("userName") String userName
			) {
		
		log.info("chatMessage {}" , chatMessage);
		
		chatMessage.setUserNo(userNo);
		log.info("userNo = {}", userNo);
		chatMessage.setChatRoomNo(chatRoomNo);
		chatMessage.setUserName(userName);
		
		 int sesult = chatService.insertChatMessage(chatMessage);
		
		return chatMessage;
	}

	
	@GetMapping("/chat/{chatRoomNo}/{chatRoomTitle}")
	public ResponseEntity<List<ChatMessage>> joinChatRoom(
			@PathVariable int chatRoomNo,
			@PathVariable String chatRoomTitle,
			@RequestHeader long userNo
			) {
		
		try {
			ChatJoin join = new ChatJoin();
			
			join.setUserNo(userNo);
			join.setChatRoomNo(chatRoomNo);
			
			List<ChatMessage> cmList = chatService.joinChatRoom(join);
			
			if(cmList != null) {
				return ResponseEntity.ok(cmList);
			}else {
				return ResponseEntity.notFound().build();
			}
		}catch (Exception e) {
			log.error("예외 발생: {}", e.getMessage(), e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Collections.emptyList());
		}
	}
	
	@DeleteMapping("/exitChat/{chatRoomNo}")
	public int exitChat(
			@PathVariable int chatRoomNo,
			@RequestHeader long userNo
			) {
		
		try {
			ChatJoin join = new ChatJoin();
			
			join.setUserNo(userNo);
			join.setChatRoomNo(chatRoomNo);
			
			log.info("userNo = {}", userNo);
			log.info("chatRoomNo = {}", chatRoomNo);
			
			int result = chatService.exitChat(join);
			
			log.info("result == {}", result);
			
			if(result > 0) {
				return result;
			}else {
				return 0;
			}
		}catch (Exception e) {
			log.error("예외 발생: {}", e.getMessage(), e);
			return 0;
		}
	}
	
	@PostMapping("/selectUserChatList")
	public List<ChatRoom> selectUserChatList(
			@RequestBody Map<String, Object> requestBody
			){
			
			long userNo = Long.parseLong(requestBody.get("userNo").toString());
			List<ChatRoom> ucList = chatService.selectUserChatList(userNo);
			
			return ucList;
	}
	
	@PostMapping("/addStar")
	public ResponseEntity<String> addStars(@RequestBody Map<String, Object> map) {
		
        int result = chatService.addStars(map);
        
        log.info("result = {}", result);
        
        if(result > 0) {
        	return ResponseEntity.ok("고정됨");
        }else {
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
        }
	}
	
	@PostMapping("/getStar")
	public Map<String, Object> getStars(@RequestBody Map<String, Object> map){
		Map<String, Object> result = new HashMap();
		// fav list
		result.put("list", chatService.getStars(map));
		
		boolean status;
		if(result.size() > 0) {
			status = true;
		}else {
			status = false;
		}
		// fav list Y/N
		result.put("status", status);
		
		return result;
	}
	
	@PostMapping("/delStar")
	public ResponseEntity<String> delStar(@RequestBody Map<String, Object> map){
		
		
		log.info("map ={}", map);
		
		int result = chatService.delStar(map);
		
		log.info("result ={}", result);
		
		if(result > 0) {
			return ResponseEntity.ok("고정 해제");
		}else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
		}
	}
}
