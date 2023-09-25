import React, { useState } from 'react';
import './heart.css';
import axios from 'axios';

const HeartIcon = ({productNo}) => {
    const [isFilled, setIsFilled] = useState(true);  
    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    
    const handleHeartClick = () => {
        axios.post("/dasony/api/deleteLikes", {
            userNo : loginUserNo,
            productNo : productNo
        }, {
            headers: {
              "Content-Type": "application/json", 
            },
          })
            .then((response) => {
            })
            .catch((error) => {
              console.error("오류남:", error);
            });
    };

    return (
        <i className={isFilled ? 'bi bi-heart-fill' : 'bi bi-heart'} onClick={handleHeartClick}/>
    );
};

export default HeartIcon;