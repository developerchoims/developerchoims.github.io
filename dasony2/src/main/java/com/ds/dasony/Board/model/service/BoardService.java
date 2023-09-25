package com.ds.dasony.Board.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.Board.model.vo.BoardBest;
import com.ds.dasony.Board.model.vo.BoardCare;
import com.ds.dasony.Board.model.vo.BoardDetailExt;
import com.ds.dasony.Board.model.vo.BoardExt;
import com.ds.dasony.Board.model.vo.BoardImg;
import com.ds.dasony.Board.model.vo.BoardShorts;
import com.ds.dasony.Board.model.vo.BoardTag;
import com.ds.dasony.Board.model.vo.BoardVideo;
import com.ds.dasony.Board.model.vo.BoardVsList;
import com.ds.dasony.Board.model.vo.BoardWeather;
import com.ds.dasony.Board.model.vo.BoardWriterForm;
import com.ds.dasony.Board.model.vo.Reply;

public interface BoardService {
	
	public List<BoardExt> boardDailyList(String userRegion);
	public int insertBoard(BoardWriterForm boardWriterForm, List<BoardImg> bImg, BoardTag bt, String severFolderPath) throws Exception;
	public int boardDelete(int boardNo);
	public int insertBordViews(int boardNo);
	public List<BoardDetailExt> boardDetail(int boardNo);
	public BoardWriterForm boardEdit (int BoardNo);
	public int insertReply(Reply r , int userNo);
	public int insertHeart(BoardCare bc);
	public int deleteHeart(BoardCare bc);
	public int serchHeart(BoardCare bc);
	public List<Reply> replySelect(int boardNo);
	public List<BoardImg> boardImg(int boardNo);
	public List<BoardVideo> boardVideo(int boardNo);
    public List<BoardExt> searchList(String userRegion,String btg,String btt);
    public List<BoardExt> nextBtn(Map<String, Object> data);
    public List<BoardExt> backBtn(Map<String, Object> data);
    public int removeReply(int replyNo);
    public List<BoardWeather> weatherList();
	public List<BoardBest> bestList();
	public List<BoardShorts> shortsList();
	public List<BoardVsList> vsList();
	public List<BoardBest> localList();
	public int insertBoardExp(BoardWriterForm boardWriterForm);
//	public int updateBoard(BoardWriterForm boardWriterForm, int boardNo);

    // admin
	public List<BoardExt> adminBoardList();
	public int addMinBoardDelete(int boardNo);



}
