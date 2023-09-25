import React, { useEffect, useState } from 'react';
import '../heart.css';
import axios from 'axios';

const BoardHeart = (props) => {
  const { boardNo , isFilled , setIsFilled} = props;
  localStorage.getItem("loginUserNo");

    const handleHeartClick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      setIsFilled(!isFilled);

      const formData = new FormData();
      const boardHeart = {
        boardNo: boardNo,
        userNo : localStorage.loginUserNo,
      };
      Object.entries(boardHeart).forEach((item) => {
        formData.append(item[0], item[1]);
      });


        // 클라이언트에서 서버로 요청 보내기
        if (!isFilled) {
          // 하트를 비운 상태에서 클릭하면 등록 요청을 보냅니다.
          axios.post('http://localhost:3000/dasony/board/insertHeart',formData,{

          })
          .then(response => {
              console.log('하트 등록 성공:', response.data);
          })
          .catch(error => {
              console.error('하트 등록 실패:', error);
          });
      } else {
          // 하트를 채운 상태에서 클릭하면 삭제 요청을 보냅니다.
          
          axios.delete(`http://localhost:3000/dasony/board/deleteHeart?boardNo=${boardNo}&userNo=${localStorage.loginUserNo}`)
          .then(response => {
              console.log('하트 삭제 성공:', response.data);
          })
          .catch(error => {
              console.error('하트 삭제 실패:', error);
          });
      }
    };

    return (
        <>
          <i className={isFilled? 'bi bi-heart-fill' : 'bi bi-heart'} onClick={handleHeartClick}/>
        </>
    );
};

export default BoardHeart;