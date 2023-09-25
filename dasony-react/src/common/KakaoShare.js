import { useEffect, useState } from 'react'
import axios from 'axios';

export default function KakaoShare(props) {
    const userNo = localStorage.getItem("loginUserNo");
    const coupon = props.coupon;
    const product = props.product;

    let kakao = '';
    let kakaoKey = process.env.REACT_APP_KAKAO_KEY;

    const[userName, setUserName] = useState('');
    const handleUserInfo = () => {
        axios.post('/dasony/api/userInfo', {userNo: userNo})
        .then(res=>{
            setUserName(res.data.user.userName);
        })
        .catch(err=> {
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }

    useEffect(() => {
        handleUserInfo();
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script); 
            if (window.Kakao) {
                kakao = window.Kakao;
            }
            if (!kakao.isInitialized()) {
                kakao.init(kakaoKey);
            }
        }

      }, []);

  const kakaoButton = () => {
    if (window.Kakao) {
      kakao = window.Kakao;
        

      if (!kakao.isInitialized()) {
        kakao.init(kakaoKey);
      }

      kakao.Share.sendCustom({
        templateId:98483,
        templateArgs: {
          'couponExpireDate': coupon.couponExpireDate,
          'shopName': product.shopName,
          'productName': product.productName,
          'code': 'shop/coupon/'+coupon.couponOkey+'/img',
        },
      });
    }
  }
	
	return (
        <span id='kakaotalk-sharing-btn' onClick={kakaoButton}>카카오톡으로 공유하기 <i className="bi bi-wechat"/></span>
	)
}