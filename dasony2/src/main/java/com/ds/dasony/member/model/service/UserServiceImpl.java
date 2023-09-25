package com.ds.dasony.member.model.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.donation.model.vo.Donation;
import com.ds.dasony.donation.model.vo.DonationList;
import com.ds.dasony.event.model.vo.Event;
import com.ds.dasony.game.model.vo.Game;
import com.ds.dasony.member.model.dao.UserDao;
import com.ds.dasony.member.model.vo.User;
import com.ds.dasony.point.model.vo.PointUser;
import com.ds.dasony.shop.model.vo.Product;
import com.ds.dasony.shop.model.vo.ProductCare;
import com.ds.dasony.ticket.model.vo.Ticket;

@Service
public class UserServiceImpl implements UserService{

	private final UserDao userDao;
	
	@Autowired
	public UserServiceImpl(UserDao userDao) {
		this.userDao = userDao;
	}
	@Override
	public List<User> selectUserList() {
		return userDao.selectUserList();
	}
	@Override
	public int chkValidateId(String userId) {
		return userDao.chkValidateId(userId);
	}
	@Override
	public int chkValidateNick(String userNick) {
		return userDao.chkValidateNick(userNick);
	}
	@Override
	public int insertUser(User user) {
		return userDao.insertUser(user);
	}

	@Override
	public int location(Map<String, Object> request) {
		return userDao.location(request);
	}
	@Override
	public User userForLocation(String userId) {
		return userDao.userForLocation(userId);
	}
	@Override
	public User login(Map userMap) {
		return userDao.login(userMap);
	}
	@Override
	public User findingId(String subEmail) {
		return userDao.findingId(subEmail);
	}
	@Override
	public User userInfo(long userNo) {
		return userDao.userInfo(userNo);
	}

	
	@Override
	public int updateUserPoint(long userNo, int newDasonPoint) {
		return userDao.updateUserPoint(userNo, newDasonPoint);
	}
	
//	@Override
//	public Map<Long, String> getUserNames(List<Integer> userNo) {
//		
//		 List<User> users = userDao.getUserNames(userNo);
//
//		return users.stream()
//                .collect(Collectors.toMap(User::getUserNo, User::getUserName));
//	}

	@Override
	public int userUpdate(User user) {
		return userDao.userUpdate(user);
	}
	@Override
	public List<User> getMyInfo(int userNo){
		return userDao.getMyInfo(userNo);
	}
	@Override
	public int modifyMyInfo(Map<String, Object> myInfo) {
		return userDao.modifyMyInfo(myInfo);
	}
	@Override
	public int changeNewPwd(Map<String,Object> pwdInfo) {
		return userDao.changeNewPwd(pwdInfo);
	}
	@Override
	public List<ProductCare> getMyLikesList(int userNo){
		return userDao.getMyLikesList(userNo);
	}
	@Override
	public int deleteLikes(Map<String,Object> deletelike) {
		return userDao.deleteLikes(deletelike);
	}
	@Override
	public List<User>getMyPoint(int userNo) {
		return userDao.getMypoint(userNo);
	}
	@Override
	public int getMyTicket(int userNo){
		return userDao.getMyTicket(userNo);
	}
	@Override
	public List<PointUser> getMyPointList(int userNo){
		return userDao.getMyPointList(userNo);
	}
	@Override
	public List<Board> getMyBoardList(int userNo){
		return userDao.getMyBoardList(userNo);
	}
	@Override
	public List<Donation> getMyDonationList(int userNo){
		return userDao.getMyDonationList(userNo);
	}
	@Override
	public List<Event> getMyEventList(int userNo){
		return userDao.getMyEventList(userNo);
	}
	@Override
	public List<Game> getMyGameList(int userNo){
		return userDao.getMyGameList(userNo);
	}
	@Override
	public int deleteMyAlertList(Map<String, Integer> requestBody) {
		return userDao.delteMyAlertList(requestBody);
	}
	@Override
	public int modifyNewPwd(Map<String, Object> myInfo) {
		return userDao.modifyNewPwd(myInfo);
	}
	@Override
	public int alertAfterClick(Map<String,Object> alertNo) {
		return userDao.alertAfterClick(alertNo);
	}
	


}
