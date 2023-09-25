import './Board.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from "react";
import './BoardDetail.css';
import '../point/ShopProductDetail.css';
import BoardReComent from './BoardReComent';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const BoardDetailReply = (props) =>{
  const userNo = parseInt(localStorage.getItem('loginUserNo'));


  /* 답글 댓글 시작 */
  const {listPath,boardData, replyList} = props; // BoardDetail에서 가져온 경로, board Detail 데이터
  const { boardNo } = useParams();

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  /* 답글 시작 */
  const [newReplyText, setNewReplyText] = useState({
    boardNo : boardNo,
    userNo : localStorage.loginUserNo,
    replyContent : '',
    replyWriteDate : getCurrentDateTime(),
});

  const handleMainReplyChange = (e) =>{
    const {name, value} = e.target;

    const ReplyChange = {
      boardNo : boardNo,
      userNo : localStorage.loginUserNo,
      replyWriteDate : getCurrentDateTime(),
      replyLevel : '',
          [name]: value
    };
    setNewReplyText(ReplyChange);
  };

  /* 답글 끝 */
  /* 답글 axios 전송 시작 */

  const handleSubmitReply =(e)=>{
    e.preventDefault(); 

    if(!newReplyText.boardNo || !newReplyText.userNo || !newReplyText.replyContent || !newReplyText.replyWriteDate ){
      alert("모든 값을 바르게 입력해주세요.");
      return;
    }

    const formData = new FormData();
    let replyData = {
      boardNo : newReplyText.boardNo,
      userNo : newReplyText.userNo,
      replyContent : newReplyText.replyContent,
      replyWriteDate : newReplyText.replyWriteDate,
      replyLevel : e.target.id
    };

    Object.entries(replyData).forEach((item) => {
      formData.append(item[0], item[1]);
    });

    // FormData의 key 확인
    for (let key of formData.keys()) {
    }
    // FormData의 value 확인
    for (let value of formData.values()) {
    }

    axios.post(`http://localhost:3000/dasony/board/reply`,formData,{
    }).then((response)=>{
      window.location.reload();
    }).catch((error)=>{
      console.error('업로드 실패', error);
      alert("업로드에 실패하였습니다.");
    });


  }
  /* 답글 axios 전송 끝 */


   /* 모달 시작 */
   const [show, setShow] = useState(false);
   const [modalText, setModalText] = useState(`답글을 삭제하시겠습니까?`);
   const [modalButton, setModalButton] = useState('inline-block');
   const [modalButtonText, setModalButtonText] = useState('취소');
 
   const [buttonId, setButtonId] = useState(null);
   const handleClose = () => {
      setShow(false);
      setButtonId(null);
  }
   const handleShow = (id) => {
       setShow(true);
       setButtonId(id);
   }
   const handleModalOn = ()=>{

    // axios.delete('/replyDelete')
        setModalText(`정상적으로 삭제되었습니다.`);
        setModalButton('none');
        setModalButtonText('확인');
    }
   const handleModalOff = ()=>{
        setModalText(<div textalign='center'>답글을 삭제하시겠습니까?<br/><br/></div>);
        setModalButton('inline-block');
        setModalButtonText('취소');
    }
   const handleModalOffAndClose = () => {
       if(modalButtonText == '확인' && modalButton == 'inline-block' && show){
           handleModalOff();
       }
       handleClose();
   }
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
  /* 모달 끝 */
  
  const handleReplyShow = (e)=>{
    const targetId = e.target.id;
    const reReplyDiv = document.querySelectorAll('.replycoment-form-container');
    reReplyDiv.forEach((div) => {
      if (div.id === targetId && div.style.display == 'none') {
        div.style.display = 'block';
      } else if(div.id ===targetId && div.style.display == 'block'){
        div.style.display = 'none';
      } else {
        div.style.display = 'none';
      }
    });
  };
  
  const handleReplyClose = ()=>{
    // document.querySelector('.replycoment-form-container').style.display='none';
    //etReReply('');
    //setIsReplyContainerVisible(false);
  }

  /* 답글 댓글 끝 */

  /* 리댓 답답글 시작 */
  /* 답답글 input change 이벤트 */
  const [reReply,setReReply] = useState({
      userNo:userNo,
      replyContent: '',
      replyWriteDate : '',
      boardNo: boardNo,
      mainReplyNo: '',
      replyLevel: ''
  });
  const handleReReply = (e) => {
    setReReply(prev=>({
      ...prev,
      userNo:userNo,
      replyContent: e.target.value,
      replyWriteDate : getCurrentDateTime(),
      boardNo: boardNo,
      mainReplyNo: e.target.id,
      replyLevel: e.target.getAttribute('mainReplyNo')
    }));
  }
/*답답글 정보 저장 - 서버 */
  const handleSubmitReReply =(e)=>{
    e.preventDefault(); 

    if(!reReply.boardNo || !reReply.userNo || !reReply.replyContent || !reReply.replyWriteDate ){
      alert("모든 값을 바르게 입력해주세요.");
      return;
    }

    const formData = new FormData();
    let reReplyData = {
      boardNo : reReply.boardNo,
      userNo : reReply.userNo,
      replyContent : reReply.replyContent,
      replyWriteDate : reReply.replyWriteDate,
      replyLevel : reReply.replyLevel,
      mainReplyNo : reReply.mainReplyNo
    };

    Object.entries(reReplyData).forEach((item) => {
      formData.append(item[0], item[1]);
    });

    // FormData의 key 확인
    for (let key of formData.keys()) {
    }
    // FormData의 value 확인
    for (let value of formData.values()) {
    }

    axios.post(`http://localhost:3000/dasony/board/reply`,formData,{
    }).then((response)=>{
      window.location.reload();
    }).catch((error)=>{
      console.error('업로드 실패', error);
      alert("업로드에 실패하였습니다.");
    });

  }
           
/* 리댓 답답글 시작 */

        /* 답글 모달 시작 */
        const [nReshow, setNReShow] = useState(false);
        const [nReModalText, setNReModalText] = useState(`답글을 삭제하시겠습니까?`);
        const [nReModalButton, setNReModalButton] = useState('inline-block');
        const [nReModalButtonText, setNReModalButtonText] = useState('취소');
      
        const handleNReClose = () => setReShow(false);
        const handleNReShow = () => {
            handleNReModalOff();
            setNReShow(true);
        }
        const handleNReModalOn = (e)=>{
          const nreplyNo = e;
          axios.get(`http://localhost:3000/dasony/board/boardNReplyDelete/${nreplyNo}`)
          .then(res =>{
            setNReModalText(`정상적으로 삭제되었습니다.`);
            setNReModalButton('none');
            setNReModalButtonText('확인');
          })
          .catch(error =>{
            console.log('error ', error);
          });       
  
                                }
        const handleNReModalOff = ()=>{
                                  setNReModalText(<div textalign='center'>답글을 삭제하시겠습니까?<br/><br/></div>);
                                  setNReModalButton('inline-block');
                                  setNReModalButtonText('취소');
        }
        const handleNReModalOffAndClose = () => {
            if(nReModalButtonText == '확인' && nReModalButton == 'inline-block' && nReshow){
            handleNReModalOff();
            }
            handleNReClose();
        }
      /* 모달 끝 */

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
  const handleReModalOn = (e)=>{
     const replyNo = e;
     axios.get(`http://localhost:3000/dasony/board/boardReplyDelete/${replyNo}`)
     .then(res =>{
       setReModalText(`정상적으로 삭제되었습니다.`);
       setReModalButton('none');
       setReModalButtonText('확인');
     })
     .catch(error =>{
     });       
                           }
  const handleReModalOff = ()=>{

                             setReModalText(<div textalign='center'>답글을 삭제하시겠습니까?<br/><br/></div>);
                             setReModalButton('inline-block');
                             setReModalButtonText('취소');
   }
  const handleReModalOffAndClose = () => {
      if(reModalButtonText == '확인' && reModalButton == 'inline-block' && reshow){
       handleReModalOff();
      }
      navigator()
      handleReClose();
  }

  /*리댓 삭제 */
const handleRemoveReply = () => {
   axios.post("/dasony/board/removeReply", buttonId, {
     headers:{
       "Content-Type": "application/json; charset=utf-8"
     }
   })
   .then(res=>{
     alert(res.data);
   })
   .catch(err=>{
     console.log(err);
   })
  
   handleClose();
}
   

  return(
    <>
        <div className='BoardDetail-boardlist-reply-wrapper'>
          <div style={{margin:'30px', fontSize:'20px'}}>댓글 {boardData[0].replyCount} 개<br/></div>
      {replyList&&
      replyList
      .filter(reply=>{
        
        return(reply.replyLevel=='1' && reply.rboardNo == boardNo)
      })
      .sort((a, b) => a.replyNo - b.replyNo)
      .map((reply, replyIndex) => (
        <>
        <ul key={replyIndex}>
        <li key={replyIndex}>
            <div className='BoardDetail-boardlist-reply'>
              <div className='BoardDetail-boardlist-reply-container'>
                  <div className='BoardDetail-boardlist-reply-userinfo-wrapper'>
                      <span className='BoardDetail-boardlist-title-userinfo-img'>
                        <img src={
                          reply.userLevel == 'A'
                          ?
                          `/resources/common-img/levelone.png`
                          :
                          reply.userLevel == 'B'
                          ?
                          `/resources/common-img/leveltwo.png`
                          :
                          reply.userLevel == 'C'
                          ?
                          `/resources/common-img/levelthree.png`
                          :
                          reply.userLevel == 'D'
                          ?
                          `/resources/common-img/levelfour.png`
                          :
                          reply.userLevel == 'E'
                          ?
                          './resources/common-img/levelfive.png'
                          :
                          reply.userLevel == 'F'
                          ?
                          `/resources/common-img/levelgod.jpg`
                          :
                          `/resources/common-img/levelgod.jpg`
                        }/>
                      </span>
                    <span className='BoardDetail-boardlist-reply-userinfo-nikname'>{reply.ruserNick}</span>
                      <span className='BoardDetail-boardlist-reply-userinfo-date'>{reply.replyWriteDate}</span>
                  </div>
                  <div className='BoardDetail-boardlist-reply-control-wrapper'>
                      <span className='BoardDetail-boardlist-reply-btn'>
                        {/******************************************************* */}
                        <button
                          id={reply.replyNo}
                          type='button'
                          onClick={handleReplyShow}
                          ><i className="bi bi-chat-text"></i>
                          리댓달기
                          </button>
                          {/******************************************************* */}
                      </span>
                      <span className='Board-reply-recoment-accused-span'>
                        <button className='Board-reply-recoment-accused-btn'
                        onClick={handleAccusedShow}
                        ><i className="bi bi-cone-striped"></i>
                        </button>
                        <Modal show={accusedShow} onHide={handleAccusedClose}>
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
                          id={reply.replyNo}
                          className='BoardDetail-boardlist-meetball-btn'
                          type='button'
                          onClick={() => handleShow(reply.replyNo)}
                          ><i className="bi bi-three-dots-vertical"></i>
                      </button>
                      </span>
                  </div>
                </div>
                <div className='BoardDetail-boardlist-reply-content-wrapper' >
                  <div style={{padding:'1% 0% 0% 5%'}} className='BoardDetail-boardlist-reply-content'>
                    {reply.replyContent}
                  </div>
                  <hr/>
                  {/******************************************************* */}
                    <div id={reply.replyNo} className='replycoment-form-container' style={{display:'none'}}>
                    <span className='replycoment-form'>
                      <input
                        id={reply.replyNo}
                        className='replycoment-input'
                        mainReplyNo = '2'
                        type='text'
                        onChange={handleReReply}
                        placeholder='답글에 답글을 등록해보세요'
                        value={reReply.replyContent}
                        />
                    </span>
                    {/******************************************************* */}
                    <span>
                      <button
                      type='button'
                      className='BoardDetail-boardlist-reply-btn board-submit-btn'
                      onClick={handleSubmitReReply}
                      >답글달기</button>
                    </span>
                  </div>
                  {replyList&&replyList
                  .filter((rep)=>{
                    
                    return(rep.mainReplyNo == reply.replyNo)
                  })
                  .sort((a, b) => a.replyNo - b.replyNo)
                  .map(rep=>{
                    return(
                      <>
                      <ul key={rep.replyNo}>
                        <li key={rep.replyNo}>

{/*============================================*/}
<div className='BoardDetail-boardlist-reply'>
              ㅣ<div className='BoardDetail-boardlist-reply-container'>
                  <div className='BoardDetail-boardlist-reply-userinfo-wrapper'>
                      <span className='BoardDetail-boardlist-title-userinfo-img'>
                      <img src={
                          reply.userLevel == 'A'
                          ?
                          `/resources/common-img/levelone.png`
                          :
                          reply.userLevel == 'B'
                          ?
                          `/resources/common-img/leveltwo.png`
                          :
                          reply.userLevel == 'C'
                          ?
                          `/resources/common-img/levelthree.png`
                          :
                          reply.userLevel == 'D'
                          ?
                          `/resources/common-img/levelfour.png`
                          :
                          reply.userLevel == 'E'
                          ?
                          './resources/common-img/levelfive.png'
                          :
                          reply.userLevel == 'F'
                          ?
                          `/resources/common-img/levelgod.jpg`
                          :
                          `/resources/common-img/levelgod.jpg`
                        }/>
                      </span>
                    <span className='BoardDetail-boardlist-reply-userinfo-nikname'>{rep.ruserNick}</span>
                      <span className='BoardDetail-boardlist-reply-userinfo-date'>{rep.replyWriteDate}</span>
                  </div>
                  <div className='BoardDetail-boardlist-reply-control-wrapper'>
                      <span className='Board-reply-recoment-accused-span'>
                        <button className='Board-reply-recoment-accused-btn'
                        onClick={handleAccusedShow}
                        ><i className="bi bi-cone-striped"></i>
                        </button>
                        <Modal show={accusedShow} onHide={handleAccusedClose}>
                          <ModalHeader>
                              유저 신고
                          </ModalHeader>
                          <ModalBody>
                              <div style={{textAlign:'center'}}>
                              {acuusedText}
                              </div>
                          </ModalBody>
                          <ModalFooter>
                              <Button onClick={handleAccusedModalOffAndClose}>{modalButtonText}</Button>
                              <Button onClick={handleAccusedModalOn} style={{display:modalButton}}>신고</Button>
                          </ModalFooter>
                        </Modal>
                      </span>
                      <span>
                      <button
                            id={rep.replyNo}
                            className='BoardDetail-boardlist-meetball-btn'
                            type='button'
                            onClick={() => handleShow(rep.replyNo)}
                            ><i className="bi bi-three-dots-vertical"></i>
                        </button>
                      </span>
                  </div>
                </div>
                <div className='BoardDetail-boardlist-reply-content-wrapper' >
                  <div style={{padding:'1% 0% 0% 5%'}} className='BoardDetail-boardlist-reply-content'>
                    <span style={{marginRight:'2%'}}>{`@${reply.ruserNick}`}</span>
                    <span>{rep.replyContent}</span>
                  </div>
                </div>
            </div> 
            {/*================================*/}
                        </li>
                        
                      </ul>
                      
                      <hr/>
                     </>
                    )
                  })}
                  
                  <div className='BoardDetail-boardList-reply-recoment-wrapper'>
                    {/*<BoardReComent/>*/}
                  </div>
                </div>
            </div> 
          </li>
        </ul>
        </>
      ))}
        <div className='BoardDetail-boardlist-reply-form-wrapper'>
          <div className='BoardDetail-boardlist-reply-form-container'>
            <div className='BoardDetail-boardlist-reply-form'>
              <input
                className='BoardDetail-boardlist-reply-form-input'
                type='text'
                name='replyContent'
                value={newReplyText.replyContent}
                onChange={handleMainReplyChange}
                placeholder='답글을 등록해보세요'
                />
            </div>
            <div>
              <button 
              style={{fontWeight: '100'}}
              id='1'
              type='button'
              className='BoardDetail-boardlist-reply-btn board-submit-btn'
              onClick={handleSubmitReply}
              >답글달기</button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader>
            대댓글 삭제
        </ModalHeader>
        <ModalBody>
            <div style={{textAlign:'center'}}>
            대댓글을 삭제하시겠어요?
            </div>
        </ModalBody>
        <ModalFooter>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleRemoveReply} style={{display:modalButton}}>삭제</Button>
        </ModalFooter>
      </Modal>
    </>

  )
}
export default BoardDetailReply;