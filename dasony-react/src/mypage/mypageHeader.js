import React, {useEffect, useState } from 'react';
import './mypagecss.css';
import {Link} from 'react-router-dom';
import { green, lightBlue } from '@mui/material/colors';
import { NavItem } from 'react-bootstrap';
import axios from 'axios';
const MypageHeader = () => {

  const [levelName, setLevelName] = useState([]);
  const [levelImg, setLevelImg] = useState([]);
  const [exp, setExp] = useState();
  const [x, setX] = useState(0);
  const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
  useEffect(() => {
    axios.post("/dasony/api/getMyInfo", {
      userNo: loginUserNo
    }).then((response) => {         
        setExp(response.data.myInfo[0].userExp);
    }).catch((error) => {
      console.error("오류남: 레벨", error);
    });
  }, [exp]);

  useEffect ( ()=>{
        let remainder = 0;
        if(exp >= 500){
          remainder = 100;
        }else{
          remainder = exp % 100;
        }
        setX(remainder);
        if(exp<100){
          setLevelName("지역 새싹");
          setLevelImg("/resources/common-img/levelone.png");
        }else if(exp>=100 && exp <200){
          setLevelName("지역 루키");
          setLevelImg("/resources/common-img/leveltwo.png");
        }else if(exp>=200 && exp <300){
          setLevelName("지역 프로");
          setLevelImg("/resources/common-img/levelthree.png");
        }else if(exp>=300 && exp <400){
          setLevelName("지역 달인");
          setLevelImg("/resources/common-img/levelfour.png");
        }else if(exp>= 400 && exp < 500){
          setLevelName("지역 장인");
          setLevelImg("/resources/common-img/levelfive.png");
        }else if(exp >= 500){
          setLevelName("지역 지존");
          setLevelImg("/resources/common-img/levelgod.jpg");
        }
  });

  const bStyle = {
    backgroundColor: 'skyblue',
    width: `${x}%`
  };
  
  return (

    
 <div className="btn-line">
    
 
 
        <div className="user-levelimg">
          <img
            src={levelImg}
            alt=""
            style={{ width: '40px', height: '40px' }}
          />
          <div><b style={{color : 'green'}}>{levelName}</b></div>
          <div className="exp-bar" style={{display: 'flex', border: '1px solid black', margin : '5px', maxWidth:'100px'}}>
            <div className='bbb' style={bStyle}>
              <b>EXP</b>
            </div>
    
              </div>
        </div>
           
        <div className="button-div">
          
        <button className='mypage-btn'>회원정보</button>

        <button className='mypage-btn'>내 상점</button>
        
        <button className='mypage-btn'>내 기부</button>

        <Link className='mypage-link' to='/mypage/Alert'><button className='mypage-btn'>알림 내역</button></Link>
          
          
        </div>
      </div>
  );}
  export default MypageHeader;