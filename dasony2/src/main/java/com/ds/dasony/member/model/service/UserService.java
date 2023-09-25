package com.ds.dasony.member.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.donation.model.vo.Donation;
import com.ds.dasony.donation.model.vo.DonationList;
import com.ds.dasony.event.model.vo.Event;
import com.ds.dasony.game.model.vo.Game;
import com.ds.dasony.member.model.vo.User;
import com.ds.dasony.point.model.vo.PointUser;
import com.ds.dasony.shop.model.vo.Product;
import com.ds.dasony.shop.model.vo.ProductCare;
import com.ds.dasony.ticket.model.vo.Ticket;

public interface UserService {

	public List<User> selectUserList();

	public int insertUser(User user);

	public int chkValidateId(String userId);

	public int chkValidateNick(String userNick);

	public User login(Map<String, Object> userMap);

	public User userForLocation(String string);

	public int location(Map<String, Object> request);

	public User findingId(String subEmail);

	public User userInfo(long userNo);


	public int updateUserPoint(long userNo, int newDasonPoint);

//	public Map<Long, String> getUserNames(List<Integer> userNo);

	public int userUpdate(User user);

	public List<User> getMyInfo(int userNo);

	public int modifyMyInfo(Map<String, Object> myInfo);

	public int changeNewPwd(Map<String,Object> pwdInfo);

	public List<ProductCare> getMyLikesList(int userNo);

	public int deleteLikes(Map<String,Object> deletelike);

	public List<User> getMyPoint(int userNo);

	public int getMyTicket(int userNo);

	public List<PointUser> getMyPointList(int userNo);

	public List<Board> getMyBoardList(int userNo);

	public List<Donation> getMyDonationList(int userNo);

	public List<Event> getMyEventList(int userNo);

	public List<Game> getMyGameList(int userNo);

	public int deleteMyAlertList(Map<String, Integer> requestBody);

	public int modifyNewPwd(Map<String, Object> myInfo);

	public int alertAfterClick(Map<String,Object>alertNo);

	



}
