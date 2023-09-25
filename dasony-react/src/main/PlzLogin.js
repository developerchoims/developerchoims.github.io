import 'bootstrap/dist/css/bootstrap.min.css';
import {motion} from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './PlzLogin.css';
import {React, useState, useEffect} from 'react';
import axios from 'axios';
import { SHA256 } from 'crypto-js';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../atoms';

const TypingTitle = ({initialWord, fontSize, delay}) =>{
    const[word, setWord] = useState('');
    const[count, setCount] = useState(0);
    const completeWord = initialWord;

    useEffect(()=>{
        if(count<completeWord.length){
            const typingInterval = setInterval(()=>{
                setWord((prevTitleValue)=>{
                    
                    let result = prevTitleValue ? prevTitleValue + completeWord[count] : completeWord[0];
                    setCount(count+1);

                    if(count >= completeWord.length){
                        return prevTitleValue;
                    }
                    
                    return result;
                });
            }, delay);
            return () => clearInterval(typingInterval);
        }
    },[count, completeWord, delay]);

    return (<h1 style={{fontSize:`${fontSize}`}}>{word}</h1>);    
}









const PlzLogin = () => {

    /*회원 가입, 지역 설정 중에 사용했던 데이터 파기 용도 */
    const [user, setUser] = useRecoilState(loginUserState);
    
    /*암호화 키 지정 */
    let secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY;

    /*로그인 기능 */
    const [login, setLogin] = useState({userId:"", userPwd:""});
    const [pwd, setPwd] = useState("");
        /*login 정보 저장 */
    const handleLogin = (event) => {
        if(event.target.id == 'id'){
            const idVal = event.target.value;
            setLogin({...login, userId:idVal});
        } else if(event.target.id == 'pwd'){
            const pwdVal = event.target.value;
            setPwd(pwdVal);
            /*Encrypt */
            setLogin({...login, userPwd:SHA256(event.target.value, secretKey).toString()});
        }
    }
        /*login 정보 서버에 전달 */

            /*로그인 버튼 disable */
    const [disable, setDisable] = useState(true);
    const handleDisable = ()=>{
        /*id, pwd 공백 검사 */
        if(login.userId!=""&& pwd !=""){
            setDisable(false);
        } 
    }

{/*경로 설정 용도 */}
    const loginUserNo = localStorage.getItem("loginUserNo");
    const loginUserLevel = localStorage.getItem("loginUserLevel");

    useEffect(()=>{
        if(loginUserNo){
            if(loginUserLevel==='Z'){
                navigate('/admin/shop');
            } else {
                navigate('/main');
            }
            window.location.reload();
        } else {
            handleDisable();
            setUser({});
        }
    }, [loginUserNo, loginUserLevel, login.userId, pwd])

        /*로그인 정보 전달 */
    const navigate = useNavigate();
    const handleLoginSubmit = () => {
        axios.post('/dasony/api/login', login)
        .then(res=>{
            if(res.data.msg !=null){
                /*atom에 user정보 저장 */
                localStorage.setItem("loginUserNo", res.data.user.userNo);
                localStorage.setItem("loginUserRegion", res.data.user.userRegion);
                localStorage.setItem("loginUserLevel", res.data.user.userLevel);
                alert(res.data.msg);
                if(res.data.user!=null && res.data.user.userLevel == 'Z'){
                    navigate('/admin/shop');
                } else if(res.data.user!=null && res.data.user.userLevel !='Z'){
                    navigate('/main');
                }
            } else {
                alert(res.data.err);
            }
        });
    }

    /*엔터키 이벤트 추가 */
    const handleLoginEnter=(e)=>{
        if(e.key === 'Enter'&&login.userId&&login.userPwd){
            handleLoginSubmit();
        }
    }
    return(
        
        <div className='window hero-container'>
            <video src="/resources/main-vedio/main-background.mp4" autoPlay loop muted />
            <div className="container">
                    <motion.div
                    initial = {{opacity:0, x:100}}
                    animate = {{opacity:1, x:0}}
                    end = {{opacity:1}}
                    transition={{duration : 1}}>
                    <div className='container2'>
                    <div className='login'>{/*로그인 창 */}
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={3}>
                                        <img className='logo-img' src='/resources/common-img/dasony-logo.png'/>
                                        <br/><br/>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th style={{letterSpacing:9}}>아이디</th>
                                    <td colSpan={2}>
                                        <input id='id' type='text' onChange={handleLogin} onKeyDown={handleLoginEnter} value={login.userId}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>비밀번호</th>
                                    <td colSpan={2}>
                                        <input id='pwd' type='password' onChange={handleLogin} onKeyDown={handleLoginEnter} value={pwd}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <button type='submit' onClick={handleLoginSubmit} disabled={disable}>로그인</button>
                                        <hr/>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan={3} style={{paddingBottom:'2vh'}}>*다소니는 로그인 후 이용가능합니다.*</th>
                                </tr>
                                <tr>
                                    <th colSpan={3}>
                                        <Link to='/signUp'>회원 가입</Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={3}>
                                        <Link to='/finding'>아이디/비밀번호 찾기</Link>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <motion.div
                                initial = {{opacity:0, y:100}}
                                animate = {{opacity:1, y:0}}
                                end = {{opacity:1}}
                                transition={{delay:1, duration : 1}}>
                        <div className="container-right">
                            <div>
                                <TypingTitle initialWord='다소니를 찾아주셔서 감사합니다.' fontSize='3vw' delay='200'/>
                                <br/>
                                <motion.div
                                            initial = {{opacity:0, x:100}}
                                            animate = {{opacity:1, x:0}}
                                            end = {{opacity:1}}
                                            transition={{delay:4, duration : 1}}>
                                    <div>주변의 이웃과 즐거운 이야기를 나눠보세요.</div>
                                </motion.div>
                                <motion.div
                                            initial = {{opacity:0}}
                                            animate = {{opacity:1}}
                                            end = {{opacity:1}}
                                            transition={{delay:5.5, duration : 1}}>
                                    <div style={{paddingTop:'40vh', fontSize:'1.5vw'}}>"다소니 : 사랑하는 사람을 뜻하는 순 우리말"</div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                    </div>
                    </motion.div>
            </div>
        </div>
    );
}

export default PlzLogin;