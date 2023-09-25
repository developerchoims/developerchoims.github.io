import { useEffect, useState,useRef } from 'react';
import './Finding.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {SHA256} from 'crypto-js';

const Finding = ()=>{

    const navigate = useNavigate();
    const form = useRef();
    let secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY;
    /*아이디 찾기 */
    /*아이디 정보 */
    const[subEmail, setSubEmail] = useState(''); 
    const[successFindId,setSuccessFindId] = useState(false);
    const[userName,setUserName] = useState('');
    const userEmail = subEmail;
    const randomPwd = ("#"+Math.floor(Math.random() * 100000000).toString().padStart(8, '0')+"$");
    const newPwd = (SHA256(randomPwd, secretKey).toString());
    
   
    const handleFindingId = () => {
        axios.post('/dasony/api/findingId', {subEmail: subEmail})
        .then(res=>{
            if(res.data.msg != null){
                alert(res.data.msg);
                setSuccessFindId(true);
                setUserName(res.data.userName);
            } else {
                alert(res.data.err);
            }
        })
        .catch((err)=>{
            console.error(err);
            alert("서버 요청 중 오류가 발생했습니다. 잠시 후 이용해주세요.");
        })
    }

    const sendNewPwd = (e) =>{
        e.preventDefault();
        axios.post("/dasony/api/modifyNewPwd", {
            newPwd : newPwd,
            userName : userName,
            userEmail : userEmail
        }, {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(response => {
            })
            .catch(error => {
                console.error("modify오류",error);
            });
        emailjs.sendForm('Dasony','dasonynewPwd', form.current, 'F-MU3Q5TmMwsJT8xo')
      .then((result) => {
        alert("이메일로 새로운 비밀번호를 전송해 드렸습니다!");
        window.location.reload();
      }, (error) => {
        alert("서버 요청 중 오류가 발생했습니다. 잠시 후 이용해주세요.");
      });
  };
        
    

    return(
        <div className="finding-container">
            <table>
                <thead>
                    <tr>
                        <th>아이디 찾기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>이메일</td>
                        <td><input type='text' onChange={(event)=> setSubEmail(event.target.value)} value={subEmail}/></td>
                    </tr>
                </tbody>
                <tfoot>
                <tr><td colSpan={2}><button onClick={handleFindingId}>아이디 찾기</button></td></tr>
                </tfoot>
            </table>
            
            <hr/>

                    <form ref={form} onSubmit={sendNewPwd}>
                    <input style={{display:"none"}} type='text' name="userName" value={userName}/>
                    <input style={{display:'none'}} type='text' name="randomPwd" value={randomPwd}/>
                    <input style={{display:'none'}} type='text' name="userEmail" value={userEmail}/> 
                    </form>
            <table>
                <thead>
                    <tr>
                        <th>비밀번호 재설정</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td><input readOnly={!successFindId} type='text'/></td>
                    </tr>
                    
                </tbody>
                <tfoot>
                <tr><td colSpan={2} onClick={sendNewPwd}><button>새 비밀번호 발급</button></td></tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Finding;