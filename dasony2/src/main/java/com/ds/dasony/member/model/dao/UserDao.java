package com.ds.dasony.member.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class UserDao {

	private SqlSessionTemplate session;
	@Autowired
	public UserDao (SqlSessionTemplate session) {
		this.session = session;
	}
	public List<User> selectUserList() {
		return session.selectList("memberMapper.selectUserList");
	}
	public int chkValidateId(String userId) {
		return session.selectOne("memberMapper.chkValidateId", userId);
	}
	public int chkValidateNick(String userNick) {
		return session.selectOne("memberMapper.chkValidateNick", userNick);
	}
	public int insertUser(User user) {
		return session.insert("memberMapper.insertUser", user);
	}
	public int location(Map<String, Object> request) {
		return session.update("memberMapper.location", request);
	}
	public User userForLocation(String userId) {
		return session.selectOne("memberMapper.userForLocation", userId);
	}
	public User login(Map userMap) {
		return session.selectOne("memberMapper.login", userMap);
	}
	public User findingId(String subEmail) {
		return session.selectOne("memberMapper.findingId", subEmail);
	}
	public User userInfo(long userNo) {
		return session.selectOne("memberMapper.userInfo", userNo);
	}

	
	public int updateUserPoint(@Param("userNo") long userNo, @Param("newDasonPoint") int newDasonPoint) {
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("newDasonPoint", newDasonPoint);
	    return session.update("memberMapper.updateUserPoint", map);
	}
	
//	public List<User> getUserNames(List<Integer> userNo) {
//		return session.selectOne("memberMapper.getUserNames", userNo);
//	}

	public int userUpdate(User user) {
		return session.update("memberMapper.userUpdate", user);
	}
	public List<User> getMyInfo(int userNo) {
		return session.selectList("memberMapper.getMyInfo",userNo);
	}
	public int modifyMyInfo(Map<String, Object> myInfo) {
		int result = session.update("memberMapper.modifyMyInfo",myInfo);
		return result;
	}
	public int changeNewPwd(Map<String,Object> pwdInfo) {
		return session.update("memberMapper.changeNewPwd",pwdInfo);
	}
	public List<ProductCare> getMyLikesList(int userNo) {
		List<ProductCare> result =  session.selectList("shopMapper.getMyLikesList", userNo);
		return result;
	}
	public int deleteLikes(Map<String,Object> deletelike) {
		return session.delete("shopMapper.deleteLikes",deletelike);
	}
	public List<User> getMypoint(int userNo) {
		List<User> result =  session.selectList("memberMapper.getMyPoint",userNo);
		return result;
	}
	public int getMyTicket(int userNo) {
		return session.selectOne("memberMapper.getMyTicket",userNo);
	}
	public List<PointUser> getMyPointList(int userNo) {
		List<PointUser> result = session.selectList("point.getMyPointList",userNo);
		return result;
	}
	public List<Board> getMyBoardList(int userNo) {
		List<Board>result = session.selectList("board.getMyBoardList",userNo);
				return result;
	}
	public List<Donation> getMyDonationList(int userNo) {
		List<Donation>result = session.selectList("donationMapper.getMyDonationList",userNo);
		return result;
	}
	public List<Event> getMyEventList(int userNo) {
		List<Event>result = session.selectList("event.getMyEventList",userNo);
		return result;
	}
	public List<Game> getMyGameList(int userNo) {
		List<Game>result = session.selectList("game.getMyGameList",userNo);
		return result;
	}
	public int delteMyAlertList(Map<String, Integer> requestBody) {
		int result = session.delete("alert.deleteMyAlertList", requestBody);
		return result;
	}
	public int modifyNewPwd(Map<String, Object> myInfo) {
		int result = session.update("memberMapper.modifyNewPwd", myInfo);
		return result;
	}
	public int alertAfterClick(Map<String,Object> alertNo) {
		return session.update("alert.alertAfterClick",alertNo);
	}
	
	
	


}
