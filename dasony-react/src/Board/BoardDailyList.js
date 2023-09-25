import {Link, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Board.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { boardCateState, boardPostState } from '../atoms';
import BoardListHeader from './BoardListHeader';
import {BoardDetailcategoryState, BoardVotecategoryState, BoardShortscategoryState, BoardInterestCategoryState, 
  BoardJMTCategoryState, BoardFashionCategoryState, BoardLocalCategoryState } from '../atoms';
import axios from 'axios';

import Loading from "../common/Loading";

const BoardDailyList = ()=>{

  const[boardData,setBoardData]=useState([]);
  const [reply, setReply] = useState([]);


  /*무한 스크롤 기능 */
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {

  if (path == listDailyOptions) {
    setListBoardCate(listDailyCategory);
    setListPath(pathD);
   } else if (path == listInterestOptions) {
    setListBoardCate(boardInterestCategory);
    setListPath(pathI);
   } else if (path == listJmtOptions) {
    setListBoardCate(boardJMTCategory);
    setListPath(pathJ);
   } else if (path == listFashionOptions) {
    setListBoardCate(boardFashionCategory);
    setListPath(pathF);
   } else {
    setListBoardCate(boardLocalCategory);
    setListPath(pathL);
   }
    setLoading(true);
    axios.get(`http://localhost:3000/dasony${path}?userRegion=${localStorage.loginUserRegion}`)
      .then((response) => {
        setBoardData(response.data);
      })
      .catch((error) => {
        console.error('서버 요청 오류:', error);
      });
    setLoading(false);
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
      fetchData(); // 스크롤 이벤트 감지 시 데이터 가져오기
    }
  };
  /* axios 시작 */
  console.log('게시판리스트 boardData ===>',boardData);
  console.log('replyreplyreply reply ===>',reply);
  /* axios 끝 */

  /* 보드 카테고리 atom관련 시작  ain 0904*/
  // const [boardPost, setBoardPost] = useRecoilState(boardPostState);
  const boardInterestCategory = useRecoilValue(BoardInterestCategoryState);
  const boardJMTCategory = useRecoilValue(BoardJMTCategoryState);
  const boardFashionCategory = useRecoilValue(BoardFashionCategoryState);
  const boardLocalCategory = useRecoilValue(BoardLocalCategoryState);
  /* 보드 카테고리 atom관련 끝  */

  /* 현재 경로와 비교하기 위함 ain 0904*/
  const location = useLocation();
  const path = location.pathname;
  // console.log('보드리스트 path :',path);
  localStorage.getItem("loginUserNo") // 유저 번호
  localStorage.getItem("loginUserRegion") // 유저 지역
  

  /* atom과 구조가 달라서 daily 카테고리 전용 따로 뽑음  ain 0904*/
  const [listDailyCategory, setListDailyCategory] = useState([
      { name: '일상', value: '1101' },
      { name: '날씨', value: '1104' },
      { name: '투표', value: '1103' },
      { name: '쇼츠', value: '1102' },
  ]);

  /* 현재 경로 비교연산 밑작업용 ain 0904 */
  const listDailyOptions = path.includes('daily') ? path : null;
  const listInterestOptions = path.includes('interest')? path : null;
  const listJmtOptions = path.includes('jmt')? path : null;
  const listFashionOptions = path.includes('fashion')? path : null;
  // console.log('보드리스트 listDailyOptions :',listDailyOptions);

  /* 경로 이동을 위한 ain 0904 */
  const [listPath, setListPath] = useState([]);
  const pathD = "/general/daily/";
  const pathI = "/general/interest/";
  const pathJ = "/info/jmt/";
  const pathF = "/info/fashion/";
  const pathL = "/info/local/";

  /* listBoardCate 현재 경로에 맞는 카테고리 들어감 ain 0904 */
 const [listBoardCate, setListBoardCate] = useState([]);
//  console.log('listBoardCate----->',listBoardCate);
 useEffect(() => {
 
  fetchData(); // 초기 데이터 로드

  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
  
}, []);
  // console.log('게시판리스트 listBoardCate ===>',listBoardCate);

  /* 키워드 검색시 사용하는 state. ain 0904 */
  const [keyword, setKeyword] = useState([]);
  const [inputContent, setInputContent] = useState('');


  /* 키워드 enter사용시 키워드 생성 ain 0904 */
  const enter = (e) =>{
    if(e.key == 'Enter'){
      e.preventDefault();
      if(keyword.includes(inputContent) || inputContent.trim() === '' ){
        console.log('enter key 눌림 : ', inputContent );
        return;
      }
      setKeyword([...keyword, inputContent]);
      setInputContent('');
    }
  };

  /* 키워드 엑스 버튼 이벤트 삭제됨 ain 0904*/
  const deleteKeyWord = (index)=>{
    setKeyword(keyword.filter((item, i) => item !== keyword[index]));
    setInputContent('');
  }
  // console.log('BoardDailyList : 'boardPost.boardCateNo, boardCateStateValue.name);

  const handleLinkClick = (e) =>{
    const boardNo = e;
    console.log('조회수 구하기 위한 boardNo 확인 ===>',boardNo);

    axios.get(`http://localhost:3000/dasony/board/boardViewsCount?boardNo=${boardNo}`)
    .then((res)=>{
      console.log('Axios 요청 성공:', res.data);
    })
    .catch((error)=>{
      console.log('Axios 요청 오류',error);
    })
  };


  /*  검색 기능 관련 시작 */

  /* 제목 내용 검색 시작*/
  const [searchKeyword, setSearchKeyword] = useState({
      userRegion: localStorage.loginUserRegion,
      boardTag: keyword,
      boardContent : '',
      boardTitle : '',
  });
  const handleInputChange  = (e) =>{
    const {name, value} = e.target;
    let upTagArr = [...keyword, inputContent];
    const search = {
      ...searchKeyword,
      userRegion: localStorage.loginUserRegion,
      boardTag: upTagArr,
      boardContent : '',
      [name]: value
    };
    setSearchKeyword(search);
  }
  console.log('검색 할 값 searchKeyword ====>',searchKeyword)

  /* 제목 내용 검색 끝*/

  /* 키워드 검색 시작*/
  /* 키워드 검색 끝*/

  const [searchData, setSearchData] = useState({
    boardTitle: '',
    boardContent : '',
  });
  const handleSearachKeyword = (e) => {
    e.preventDefault();
    if (!searchKeyword.boardTitle && !searchKeyword.boardTag) {
      alert("검색할 내용을 입력해주세요.");
      return;
    }
    const searchKey = {
      boardTitle: searchKeyword.boardTitle,
      boardContent : searchKeyword.boardTitle,
    };
    setSearchData(searchKey);
    // console.log('검색 버튼 클릭 searchData',searchData);
    // console.log('검색 버튼 클릭 searchKey',searchKey);

  };
  // console.log('왜 안돼냐 searchData',searchData);

  function isTitleMatch(board) {
    return !searchData.boardTitle || board.boardTitle.includes(searchData.boardTitle);
  }
  
  function isContentMatch(board) {
    return !searchData.boardContent || board.boardContent.includes(searchData.boardContent);
  }
  
  function isTagMatch(board) {
    // const searchTags = board?.boardTag.boardTag.split('_');
    return !keyword || keyword.length === 0 || keyword.some((tag) => board?.boardTag.boardTag.includes(tag));
  }
    /* 키워드 리셋 핸들러 ain 0904 */
    const handleReset = () => {
      setSearchKeyword({
        userRegion: localStorage.loginUserRegion,
        boardTag: '',
        boardContent : '',
        boardTitle : '',
      });
      setKeyword([]);
    };
  

  return(
    <>

      <div className="BoardList-head-title-wrapper">
        <BoardListHeader path={path}/>
        </div>

        <div className="boardList-container">
          <div className="row justify-content-md-center boardList-search-title-wrapper">
            <form action="" method="GET">
              <div className="row">
                <div className="col-md-9 boardList-search-input-title-wrapper">
                  <div className="boardList-search-box-title">
                    <input type="text" name="boardTitle" value={searchKeyword.boardTitle} onChange={handleInputChange} className="boardList-search-input-title" placeholder="제목, 내용을 검색해보세요"/>
                      <div className="boardList-search-input-title-img-div">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        {/* <i className="bi bi-search boardList-search-input-title-imgcon"></i> */}
                        {/* <img className="boardList-search-input-title-imgcon" src="/resources/img/돋보기아이콘.png"/> */}
                      </div>
                  </div>
                </div>
                <div className="col-3 col-md-3">
                  <button type="button" className="boardList-search-btn" onClick={handleSearachKeyword}>검색</button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-9 boardList-search-input-tag-wrapper">
                  <div  className="boardList-search-box-tag" >
                  <ul className="searchKeyword-ul">
                    {
                      keyword.map( (item, index) => (
                        <li className="sKeyword" key={index}>
                          {item}
                          <p
                          onClick={() => {deleteKeyWord(index)}} className="boardSearchClose">x</p>
                      
                        </li>
                      ))}
                  </ul>
                  <input 
                        type="text" 
                        className="boardList-search-input-tag" 
                        placeholder="태그로 검색해보세요"
                        value={inputContent}
                        onKeyDown={enter}
                        onChange={(e) => {setInputContent(e.target.value)
                          handleInputChange(e);}}
                        />
                      
                  </div>

                  <div className="boardList-search-input-tag-img-div">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16">
                      <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                    {/* <i className="bi bi-tag-fill boardList-search-input-tag-icon"></i> */}
                    {/* <img className="boardList-search-input-tag-icon" src="/resources/img/태그아이콘.png"/>
                    <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="꼬리표 아이콘">꼬리표 아이콘  제작자: Dave Gandy - Flaticon</a> */}
                  </div >
                </div>
                <div className="col-1 col-md-1">
                  <button type="button" className="boardList-search-reset-btn" onClick={handleReset}>
                    <img src="/resources/board/ricon.png" className="boardList-search-reset-btn-icon" />
                      <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="주기 아이콘">주기 아이콘  제작자: redempticon - Flaticon</a>
                  </button>
                  
                </div>
              </div>
            </form>
          </div>
        <div className="boardList-list-wrapper">
          
        {loading?<Loading/>:
            //  {boardData.map((boardItem) => (
            //   <li key={boardItem.id}>
            //     <Link to={`/board/${boardItem.id}`}>{boardItem.title}</Link>
            //   </li>
            boardData && boardData.filter((board) => 
              listBoardCate.some((category) => category.name === board?.boardCate.boardSmallCate))
              .filter((board) => isTitleMatch(board) || isContentMatch(board) || isTagMatch(board))
              .map((board, index) => (
            <ul key={index} className="boardList-list-ul-wrapper">        
              <li className="boardList-list-li">
                <div className="boardList-list-wrapper">
                  <div className="boardList-list-container">
                        <Link
                          to={
                            board.boardCate.boardCateNo == '1103'
                            ?
                            '/board/general/daily/vs/detail/'+board.boardNo
                            :board.boardCate.boardCateNo == '1102'
                            ?
                            '/board/general/daily/shorts/detail/'+board.boardNo
                            :
                            '/board'+listPath+'detail/'+board.boardNo
                            } onClick={()=>handleLinkClick(board.boardNo)} style={{textDecoration:'none'}}>
                          <div className="boardList-list-content-container">
                              <div className="boardList-list-keyword" style={{ 
                                            border : 'none',
                                            width: '3vw',
                                            height : '2vh',
                                            borderRadius: '15%',
                                            color: 'white',
                                            backgroundColor:
                                            board.boardCate.boardSmallCate === '일상' ? 'lightgray' :
                                            board.boardCate.boardSmallCate === '맛집' ? 'lightgray' :
                                            board.boardCate.boardSmallCate === '게임' ? 'lightgray' :
                                            board.boardCate.boardSmallCate === '캐주얼' ? 'lightgray' :
                                            board.boardCate.boardSmallCate === '복지' ? 'lightgray' :
                                            board.boardCate.boardSmallCate === '날씨' ? '#89ba88' :
                                            board.boardCate.boardSmallCate === '혼밥' ? '#89ba88' :
                                            board.boardCate.boardSmallCate === '방송' ? '#89ba88' :
                                            board.boardCate.boardSmallCate === '포멀' ? '#89ba88' :
                                            board.boardCate.boardSmallCate === '교육' ? '#89ba88' :
                                            board.boardCate.boardSmallCate === '투표' ? '#CB9DE7' :
                                            board.boardCate.boardSmallCate === '혼술' ? '#CB9DE7' :
                                            board.boardCate.boardSmallCate === '취미' ? '#CB9DE7' :
                                            board.boardCate.boardSmallCate === '스트릿' ? '#CB9DE7' :
                                            board.boardCate.boardSmallCate === '대여' ? '#CB9DE7' :
                                            board.boardCate.boardSmallCate === '쇼츠' ? '#84abee' :
                                            board.boardCate.boardSmallCate === '분위기' ? '#84abee' :
                                            board.boardCate.boardSmallCate === '기타' ? '#84abee' :
                                            board.boardCate.boardSmallCate === '걸리시' ? '#84abee' :
                                            board.boardCate.boardSmallCate === '의료' ? '#84abee' : 'lightgray'}}>{board.boardCate.boardSmallCate}</div>
                              <div className="boardList-list-content-title">{board.boardTitle}</div>
                              <div className="boardList-list-content"dangerouslySetInnerHTML={{ __html: board.boardContent }}></div>
                              <div className="boardList-list-content-info"><span>{board.user.userNick}</span><span>{board.boardWriteDate}</span></div>          
                              <div className="boardList-list-content-action">
                                <span><img src="/resources/board/eicon.png"/>{board.boardViews} <span style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/-" title="비밀번호 표시 아이콘">비밀번호 표시 아이콘  제작자: exomoon design studio - Flaticon</span></span>
                                <span><img src="/resources/board/hicon.png"/>{board.boardCare.userViewCount} <span style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="심장 아이콘">심장 아이콘  제작자: Noplubery - Flaticon</span></span>
                                <span><img src="/resources/board/ticon.png"/>{board.reply.replyCount} <span style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="대화 아이콘">대화 아이콘  제작자: exomoon design studio - Flaticon</span></span></div>
                          </div>
                        </Link>
                      <div className="boardList-list-img">
                        {
                          !(board.boardCate.boardSmallCate=='쇼츠')?
                          <img src={board.boardImg.boardImgModName?
                            "http://localhost:8083/dasony"+board.boardImg.boardImgPath+board.boardImg.boardImgModName
                            : "https://i.postimg.cc/rmRJRyvp/dasony-logo.png"} alt="썸네일" className="board-img"/>
                            
                            :<video controls className="board-video-thumb" muted>
                              <source 
                              src={`http://localhost:8083/dasony/resources/images/board/video/${board.boardVideo.videoModName}`} 
                              type="video/mp4" />
                            </video>
                        }
                        </div>
                  </div>
                </div>
              </li>
           </ul>
            ))}
          <ul>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
    </>
  );

}

export default BoardDailyList;
