import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from "react";
import './BoardDetail.css';
import '../point/ShopProductDetail.css';
import Heart from '../heart';
import { useRecoilState } from 'recoil';
import { boardPostState } from '../atoms';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Vote from './Vote';
import Shorts from './Shorts'
import BoardDetailReply from './BoardDetailReply';
import axios from 'axios';
import BoardHeart from './BoardHeart';



const BoardDetail = () =>{
  
  const userNo = parseInt(localStorage.getItem("loginUserNo"));
  const userRegion = localStorage.getItem("loginUserRegion");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  localStorage.getItem("loginUserNo") // 유저 번호
  
  /*동영상 사진 경로 맵 */
  const userImgMap = {
    'A':`/resources/common-img/levelone.png`,
    'B':`/resources/common-img/leveltwo.png`,
    'C':`/resources/common-img/levelthree.png`,
    'D':`/resources/common-img/levelfour.png`,
    'E':'./resources/common-img/levelfive.png',
    'Z':`/resources/common-img/levelgod.jpg`
  }


  /* 현재 경로 비교연산 밑작업용 ain 0904 */
  const dailyPath = path.includes('daily') ? path : null;
  const interestPath = path.includes('interest')? path : null;
  const jmtPath = path.includes('jmt')? path : null;
  const fashionPath = path.includes('fashion')? path : null;
  const sharePath = path.includes('share')? path : null;

  const pathD = "/general/daily/";
  const pathI = "/general/interest/";
  const pathJ = "/info/jmt/";
  const pathF = "/info/fashion/";
  const pathL = "/info/local/";
  const pathS = "/share/list";

    /* 경로 이동을 위한 ain 0904 */
  const [listPath, setListPath] = useState([]);
  useEffect(() => {
    if (path == dailyPath) {
      setListPath(pathD);
    } else if (path == interestPath) {
      setListPath(pathI);
    } else if (path == jmtPath) {
      setListPath(pathJ);
    } else if (path == fashionPath) {
      setListPath(pathF);
    } else if(path == sharePath){
      setListPath(pathS);
    } else {
      setListPath(pathL);
    }
  }, []);
  
/* 게시글 이동 이전글, 다음글 */
  const [boardPost, setBoardPost] = useRecoilState(boardPostState);
  const { boardNo } = useParams();

  let filteredBoard = boardPost.filter((board) => board.boardNo == boardNo);
  const currentIndex = boardPost.findIndex((board) => board.boardNo === boardNo);
  const prevIndex = (currentIndex - 1 + boardPost.length) % boardPost.length;
  const nextIndex = (currentIndex + 1) % boardPost.length;

  const element = useRef(null);

  const onMoveBox = ()=>{
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


   /* 모달 관련 시작 */
    /* 모달 시작 */
    const [show, setShow] = useState(false);
    const [modalText, setModalText] = useState(`게시글을 삭제하시겠습니까?`);
    const [modalButton, setModalButton] = useState('inline-block');
    const [modalButtonText, setModalButtonText] = useState('취소');
  
    const handleClose = () => setShow(false);
    const handleShow = () => {
        handleModalOff();
        setShow(true);
    }
    const handleModalOn = ()=>{

      axios.get(`http://localhost:3000/dasony/board/boardDelete/${boardNo}`)
      .then(res =>{
        setModalText(`정상적으로 삭제되었습니다.`);
        setModalButton('none');
        setModalButtonText('확인');
      })
      .catch(error =>{
        console.log('error ', error);
      });                          }
    const handleModalOff = ()=>{
                                    setModalText(<div textalign='center'>게시글을 삭제하시겠습니까?<br/><br/></div>);
                                    setModalButton('inline-block');
                                    setModalButtonText('취소');
   
                                }
    const handleModalOffAndClose = () => {
        if(modalButtonText == '확인' && modalButton == 'inline-block' && show){
            handleModalOff();
        }
        window.location.href =`/board${listPath}`;
        handleClose(true);
    }
    /* 모달 끝 */
    /* 신고 모달 ain 0905 */
    const [accusedShow, setAccusedShow] = useState(false);
    const [acuusedText, setAccusedText] = useState(`답글을 삭제하시겠습니까?`);
  
    const handleAccusedClose = () => setAccusedShow(false);
    const handleAccusedShow = () => {
      handleAccusedModalOff();
        setAccusedShow(true);
    }
    const handleAccusedModalOn = ()=>{
                                    setAccusedText(`정상적으로 신고되었습니다.`);
                                    setModalButton('none');
                                    setModalButtonText('확인');
                                }
    const handleAccusedModalOff = ()=>{
                                    setAccusedText(<div textalign='center'>신고 하시겠습니까?<br/><br/></div>)
                                    setModalButton('inline-block');
                                    setModalButtonText('취소');
                                }
                                  // <Button onClick={handleModalOffAndClose} style={{display:modalButton}}>삭제</Button>
    const handleAccusedModalOffAndClose = () => {
        if(modalButtonText == '확인' && modalButton == 'inline-block' && show){
          handleAccusedModalOff();
        }
        handleAccusedClose(true);
    }
    /* 신고 모달 끝 */
  /* 모달 관련 끝 */



  const[boardData,setBoardData]=useState([]);
  const[reply, setReply] = useState([]);
  const [newReplyText, setNewReplyText] = useState([]);
  const [isFilled, setIsFilled] = useState(null);
  /*boardVs */
  const [voteList, setVoteList] = useState([]);
  /*share */
 const [share, setShare] = useState(null);
  
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
   /* axios 시작 */
   useEffect(() => {
    
    if (listPath.length === 0) {
      // listPath가 비어있을 때는 호출하지 않도록 예외 처리
      return;
    }

    const fetchData = async() => {
      // Axios를 사용하여 서버로 GET 요청을 보냅니다.
      let url = '';
      if(listPath != pathS){
        url = `http://localhost:3000/dasony/board${listPath}detail/${boardNo}`
      } else {
        url = `http://localhost:3000/dasony/board${listPath}/${boardNo}`
      }
      await axios.get(url) // 서버의 API 엔드포인트에 맞게 수정
      .then((response) => {
        setBoardData(response.data.boardData);
        setReply(response.data.replyList);
      })
      .catch((error) => {
        console.error('서버 요청 오류:', error);
      });

    await axios.get(`http://localhost:3000/dasony/board/serchHeart?boardNo=${boardNo}&userNo=${localStorage.loginUserNo}`)
    .then(response => {
      const result = response.data;
      setIsFilled(result);

    })
    .catch(error => {
      console.error('좋아요 정보를 가져오는 중 오류 발생:', error);
    });

  /*보드 이미지 불러오기 - 서버 */
    await axios.post("/dasony/board/boardImg", boardNo, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res=>{
      setImg(res.data);
    })
    .catch(err=>{
      console.log(err);
    })

    /*share 부르기 */
    if(path.includes('share')){
      const boardCateNo = 3101;
      await axios.post("/dasony/api/share", {userRegion:userRegion, boardCateNo:boardCateNo})
            .then(res=>{
                setShare(res.data);
            })
            .catch(err=>{
                console.log(err);
            });
    }

    /*보드 비디오 불러오기 - 서버 */
    await axios.post("/dasony/board/boardVideo", boardNo, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res=>{
      setVideo(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
  

  /*투표 기록 불러오기 - 서버 */
    await axios.post("/dasony/api/voteList", boardNo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res=>{
        setVoteList(res.data);
      })
      .catch(err=>{
        console.log(err);
      });

      
    }
    fetchData();
    
    
  }, [listPath, boardNo,isFilled, userNo]); // 빈 배열을 두번째 인자로 전달하면 컴포넌트가 마운트될 때 한 번만 실행

  /* axios 끝 */

//================================================================

  /*boardVS part */
  
  const [clickedLeft, setClickedLeft] = useState('nonClicked');
  const [clickedRight, setClickedRight] = useState('nonClicked');
  const handleClickedLeft = () => {
    if(clickedRight ==='nonClicked'){
      //오른쪽 선택x
      if(clickedLeft === 'nonClicked'){ 
        // 왼쪽 선택x => 초기 상태
        setClickedLeft('clicked');
        handleOption('left', 'plus');
        handleVsOption('left');
      } else {                          
        // 왼쪽 선택o => 왼쪽 한 번 더 클릭
        alert("이미 선택한 항목입니다.");
      }
    } else {
      //오른쪽 선택o
      if(clickedLeft === 'nonClicked'){
        //왼쪽 선택x => 오른쪽 선택된 상황에서 왼쪽 선택
        setClickedRight('nonClicked');
        setClickedLeft('clicked');
        handleOption('right', 'minus');
        handleOption('left', 'plus'); 
        handleVsOption('left');
      } else {
        //왼쪽 선택o => 있을 수 없는 경우
          //확인용 메시지
        alert("불가능한 경우입니다.");
      }
    }
    
  }
  const handleClickedRight = () => {
    if(clickedLeft ==='nonClicked'){
      //왼쪽 선택x
      if(clickedRight === 'nonClicked'){
        //오른쪽 선택x ==> 초기 상황
        setClickedRight('clicked');
        handleOption('right', 'plus');
        handleVsOption('right');
      } else {
        //오른쪽 선택o ==> 오른쪽 한 번 더 클릭
        alert("이미 선택한 항목입니다.");
      }
    } else {
      //왼쪽 선택o
      if(clickedRight === 'nonClicked'){
        //오른쪽 선택x ==> 왼쪽 선택된 상황에서 오른쪽 선택
        setClickedLeft('nonClicked');
        setClickedRight('clicked');
        handleOption('left', 'minus');
        handleOption('right', 'plus');
        handleVsOption('right');
      } else {
        //오른쪽 선택o ==> 있을 수 없는 상황
          //확인용 메시지
        alert("불가능한 경우입니다.");
      }
    }
    
  }

  /*옵션 투표 수 플마 - 서버 */
  const handleOption = (option, pm) => {
    axios.post("/dasony/api/optionPm", {option:option, pm:pm})
    .then(res=>{
    })
    .catch(err=>{
      console.log(err);
      alert("다시 시도해주세요");
    })
  }
  /*투표 기록 남기기 - 서버 */
  const handleVsOption = (option)=>{
    axios.post("/dasony/api/vsOption", 
                {userNo:userNo, boardNo:boardNo, vsOption:option})
    .then(res=>{
      alert("투표 완료");
      window.location.reload();
    })
    .catch(err=>{
      console.log(err);
      alert("다시 시도해주세요");
    })
  }

    /*투표 기록으로 css 설정하기 */
    const handleVoteCss = () => {
      for(const vote of voteList){
        if(vote.userNo == userNo && vote.vsOption == 'left'){
          setClickedLeft('clicked');
          setClickedRight('nonClicked');
        } else if(vote.userNo == userNo && vote.vsOption == 'right'){
          setClickedRight('clicked');
          setClickedLeft('nonClicked');
        }
      }
    }

    useEffect(()=>{
      handleVoteCss();
    })

    /* 게시글 이동 axios 사용 시작 */


  const HandleLBackBtn = (e) =>{
    const boardMiddleCate = e;
    const boardNoBack = newReplyText.boardNo;

    axios.post(`http://localhost:3000/dasony/board/backBtn/${boardNo}/${boardMiddleCate}`)
    .then(response => {
      const backBtn = response.data;
      const backNo = backBtn[0].boardNo;
      navigate("/board" + listPath + "detail/" + backNo);
    })
    .catch(error => {
      console.error('좋아요 정보를 가져오는 중 오류 발생:', error);
    });
  };

  const HandleNextBtn = (e) =>{
    const boardMiddleCate = e;
    const boardNoBack = newReplyText.boardNo;
  axios.post(`http://localhost:3000/dasony/board/nextBtn/${boardNo}/${boardMiddleCate}`)
  .then(response => {
    const nextBtn = response.data;
    const nextNo = nextBtn[0].boardNo;
    navigate("/board" + listPath + "detail/" + nextNo);
  })
  .catch(error => {
    console.error('좋아요 정보를 가져오는 중 오류 발생:', error);
  });
};

/* 답글 모달 시작 */
const [reshow, setReShow] = useState(false);
const [reModalText, setReModalText] = useState(`답글을 삭제하시겠습니까?`);
const [reModalButton, setReModalButton] = useState('inline-block');
const [reModalButtonText, setReModalButtonText] = useState('취소');

const handleReClose = () => setReShow(false);
const handleReShow = () => {
    handleReModalOff();
    setReShow(true);
}

const handleReModalOff = ()=>{

                           setReModalText(<div textalign='center'>답글을 삭제하시겠습니까?<br/><br/></div>);
                           setReModalButton('inline-block');
                           setReModalButtonText('취소');
 }

/* 모달 끝 */
 
// 이미지 경로를 생성하는 함수
  function getUserImage(board) {
    const userResult = board;
    if (userResult >= 0 && userResult <= 100) {
      return '/resources/common-img/levelone.png';
    } else if (userResult >= 101 && userResult <= 200) {
      return '/resources/common-img/leveltwo.png';
    } else if (userResult >= 201 && userResult <= 300) {
      return '/resources/common-img/leveltwo.png';
    } else if (userResult >= 301 && userResult <= 400) {
      return '/resources/common-img/levelfour.png';
    } else if (userResult >= 401 && userResult <= 500) {
      return '/resources/common-img/levelfive.png';  
    } else {
      return '/resources/common-img/levelgod.jpg';
    }



}



  return (
      <>
        <div ref={element} className='BoardDetail-wrapper'>
          {
            boardData
            .map((board)=>(
              <div key={board.boardNo} className='BoardDetail-side-wrapper'>   
                <div className='BoardDetail-main-wrapper'>
                  <div className="BoardDetail-head-list">
                      <span className="BoardDetail-head-list-text">
                        일반 게시판
                      </span>
                      <span className='BoardDetail-head-btn-wrapper'>
                        <button
                          type="button" 
                          className="BoardDetail-boardlist-list-btn board-submit-btn"
                          onClick={()=>navigate("/board"+listPath)}
                        >목록</button>
                        <button
                          type="button" 
                          id="backBtn"
                          className="BoardDetail-boardlist-back-btn board-submit-btn board-backBtn"
                          onClick={()=>HandleLBackBtn(board.boardCate?.boardMiddleCate)}
                        >이전글</button>
                        <button
                          type="button" 
                          id="nextBtn"
                          className="BoardDetail-boardlist-next-btn board-submit-btn board-nextBtn"
                          onClick={()=>HandleNextBtn(board.boardCate?.boardMiddleCate)}
                        >다음글</button>
                      </span>
                  </div>
    
                  <div className='BoardDetail-boardlist-title-wrapper'>
                    <div className='BoardDetail-boardlist-title-flexdiv'>
                      <div className='BoardDetail-boardlist-title-container'>
                        <span className='BoardDetail-boardlist-title-keyword'>{board?.boardCate.boardSmallCate}</span>
                        <span className='BoardDetail-boardlist-title'>{board?.board.boardTitle}</span>
                      </div>
                      <div className='BoardDetail-boardlist-userInterface'>
                        <span>
                          <button className='Board-reply-recoment-accused-btn'
                          onClick={handleAccusedShow}
                          ><i className="bi bi-cone-striped"></i>
                          </button>
                          <Modal reshow={accusedShow} onHide={handleAccusedClose}>
                          <ModalHeader>
                              유저 신고
                          </ModalHeader>
                          <ModalBody>
                              <div style={{textAlign:'center'}}>
                              {acuusedText}
                              </div>
                          </ModalBody>
                          <ModalFooter>
                              <Button onClick={handleAccusedModalOffAndClose}>{reModalButtonText}</Button>
                              <Button onClick={handleAccusedModalOn} style={{display:reModalButton}}>신고</Button>
                          </ModalFooter>
                        </Modal>
                      </span>
                      <span>
                      <button
                            className='BoardDetail-boardlist-meetball-btn'
                            type='button'
                            onClick={handleShow}
                            ><i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <Modal show={show} onHide={handleClose}>
                              <ModalHeader>
                                 게시글 삭제
                              </ModalHeader>
                              <ModalBody>
                                  <div style={{textAlign:'center'}}>
                                  {modalText}
                                  </div>
                              </ModalBody>
                              <ModalFooter>
                                  <Button onClick={handleModalOffAndClose}>{modalButtonText}</Button>
                                  <Button onClick={handleModalOn} style={{display:modalButton}}>삭제</Button>
                              </ModalFooter>
                            </Modal>
                        </span>
                        <span>
                          <button
                          style={{display:userNo!=board.user.userNo?'none':'inline'}}
                          className='Board-reply-recoment-accused-btn'
                          onClick={()=>navigate(
                            path.includes('vs')
                            ?
                            '/board/general/daily/vs/edit/'+board?.board.boardNo
                            :path.includes('shorts')
                            ?
                            '/board/general/daily/shorts/edit/'+board?.board.boardNo
                            :
                            '/board'+listPath+'edit/'+board?.board.boardNo+'/'+board?.boardCate.boardCateNo
                            
                            )}
                          >
                            수정
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className='BoardDetail-boardlist-title-userinfo-container'>
                      
                      <div className='BoardDetail-boardlist-title-userinfo'>
                        
                        <span className='BoardDetail-boardlist-title-userinfo-img'>
                          <img 
                          key={board?.user.userExp}
                          src={getUserImage(board?.user.userExp)}/>
                        </span>
                        <span className='BoardDetail-boardlist-title-userinfo-nikname'>{board?.user.userNick}</span>
                        <span className='BoardDetail-boardlist-title-userinfo-date'>{board.board.boardWriteDate}</span>
                      </div>
                      <div className='BoardDetail-boardlist-title-views-wrapper'>
                        <span className='BoardDetail-boardlist-title-views'>조회{board.board.boardViews}</span>
                        <span className='BoardDetail-boardlist-title-views'>추천{board.userViewCount}</span>
                        <span className='BoardDetail-boardlist-title-views'>답글{board.replyCount}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ margin:'1vh'}}>
                  {img&&
                  !(path.includes('share'))
                  ?
                  (
                    img.map(img => (
                    <div key={img.boardImgNo} className='BoardDetail-userImg-views-container'>
                        <div className='BoardDetail-userImg-views-li' key={img.boardImgLevel}>
                          {img.boardImgModName
                            ?(<img
                            src={`http://localhost:8083/dasony${img.boardImgPath}${img.boardImgModName}`}
                            alt={`썸네일 ${img.boardImgLevel}`}
                            className="board-img"/>) 
                            : ('')}
                        </div>
                    </div>
                     ))
                     )
                    :
                    (<>
                    <div className="share-img-box">
                    {path.includes('share')&&img?.map(img=>(
                      
                      <img key={img?.boardImgNo} src={`http://localhost:8083/dasony${img?.boardImgPath}${img?.boardImgModName}`}
                       style={{width:'150px'}}/>
                    ))}
                      
                    </div>
                    </>)}
                    
                  </div>
                  <div className='BoardDetail-boardlist-content-wrapper'>
                    {(board.boardCate.boardCateNo!=1103
                    &&board.boardCate.boardCateNo!=1102
                    &&board.boardCate.boardCateNo!=3101?
                    (<div className='BoardDetail-boardlist-content'
                    dangerouslySetInnerHTML={{ __html: board.board.boardContent }}
                    >
                    </div>)
                    :board.boardCate.boardCateNo==1103?(
                      <>
                      <br/>
                      <div className='vote-content-box'>
                        <div className='vote-div' id={clickedLeft} onClick={handleClickedLeft}>
                          {board.boardVs.boardOptionLeft}<br/><br/>
                          {board.boardVs.choiceLeft}표 
                        </div>
                        <div style={{textAlign:'center'}}>vs</div>
                        <div className='vote-div' id={clickedRight} onClick={handleClickedRight}>
                          {board.boardVs.boardOptionRight}<br/><br/>
                          {board.boardVs.choiceRight}표 
                        </div>
                      </div>
                      <div className='vote-content-txt'>{board.boardVs.boardContent}</div>
                      <br/><br/>
                      </>)
                      :board.boardCate.boardCateNo==1102?(
                        <>
                        { 
                        video&&video.map(vi=>(
                          <div className='BoardDetail-userVideo-views-container' key={vi.videoNo}>
                            <div className='BoardDetail-userVideo-views-li'>
                              
                              <div className='video-box'> 
                                <video id="vid" controls className="board-video" autoPlay loop>
                                    <source src={`http://localhost:8083/dasony${vi.videoPath}${vi.videoModName}`} type="video/mp4" />
                                </video>
                                <div className='video-content'>
                                  <div className='video-user-box'>
                                    <div className='video-user-thumb'>
                                      <img src={userImgMap[board.user.userLevel]}/>
                                    </div> 
                                    <div>{board.user.userNick}<br/></div>
                                  </div>
                                  {board.board.boardContent}
                                </div>
                                </div>
                            </div>
                            <br/><br/>
                            <br/><br/>
                        </div>
                        ))}
                        </>
                      )
                      :(
                        <>
                        {
                          share&& share.filter(s=>(
                            s.boardNo == boardNo
                          )).map(s=>(
                            <div>
                              <br/>
                              <div style={{fontSize:'1.3vw', textAlign:'center'}}>
                                {s.board.boardContent}
                              </div>
                              <br/>
                            </div>
                          ))
                        }
                        </>
                      ))}

                  </div>
                <BoardDetailReply editContent={{newReplyText, setNewReplyText}} replyList={reply} boardData={boardData} listPath={listPath}/>
                </div>
                <div className='BoardDetail-side-container'>
                  <div className='BoardDetail-side-by-side'>
                    <div className='BoardDetail-side-haert'><BoardHeart boardNo={boardNo} isFilled={isFilled} setIsFilled={setIsFilled}/></div>
                    <div className="">
                      <button
                      onClick={onMoveBox}
                      className='BoardDetail-side-up'
                    >
                      <i className="bi bi-arrow-up-square"></i></button></div>
                  </div>
                </div>
              </div> 
            ) )
          }
          
        </div>
      </>
  )
}
export default BoardDetail;