import { useEffect, useState } from 'react'
import axios from 'axios';

export default function KakaoMsg() {
    const userNo = localStorage.getItem("loginUserNo");
    
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 
                    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let secretKey = '';
    
    const handleSecretKey = () => {
        secretKey = '';
        for(let i=0; i<3; i++){
            if((Math.floor(Math.random() * 90) + 10)%2!=0){
                secretKey += alphabet[Math.floor(Math.random() * 26)]
                            += alphabet[Math.floor(Math.random() * 26)];
            } else {
                secretKey += (Math.floor(Math.random() * 90) + 10).toString();
            }
        }
        if(secretKey.length>6){
            secretKey = secretKey.substring(0,6);
        }
    }
    
    
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

  const kakaoButton = async() => {
    await handleSecretKey();

    if (window.Kakao) {
      kakao = window.Kakao;
        

      if (!kakao.isInitialized()) {
        kakao.init(kakaoKey);
      }

      kakao.Share.sendCustom({
        templateId:98523,
        templateArgs: {
          'secretKey':secretKey 
        },
      });
    }
  }
    
	
	return (
        <button id='kakaotalk-sharing-btn' onClick={kakaoButton}>정보 이용 동의</button>
	)
}