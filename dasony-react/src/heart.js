import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './heart.css';
import axios from 'axios';

const HeartIcon = (props) => {

    const location = useLocation();

    const userNo = localStorage.getItem("loginUserNo");

    const navigate = useNavigate();

    const product = props.product;

    const [isFilled, setIsFilled] = useState(false);


    const handleHeartCss = ()=>{
        axios.post('/dasony/api/shopHeartCss', {productNo:product.productNo, userNo:userNo})
        .then(res=>{
            setIsFilled(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        if(product, location.pathname.includes('shop')){
            handleHeartCss();
        }
    },[])

    const handleHeartClick = (event) => {
        event.stopPropagation();
        setIsFilled(!isFilled);
        if(location.pathname.includes('shop')){
            !isFilled?handleShopHeartOn():handleShopHeartOff();
        }
        if(location.pathname.includes('heart')){
            window.location.reload();
        }
    };

    const handleShopHeartOn = () => {
        axios.post('/dasony/api/shopHeartOn', {productNo:product.productNo, userNo:userNo})
        .then(res=>{
            alert(res.data);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요");
        })
    }

    const handleShopHeartOff = () => {
        axios.post('/dasony/api/shopHeartOff', {productNo:product.productNo, userNo:userNo})
        .then(res=>{
            alert(res.data);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요");
        })
    }

    return (
        <i className={isFilled ? 'bi bi-heart-fill' : 'bi bi-heart'} onClick={handleHeartClick}/>
    );
};

export default HeartIcon;