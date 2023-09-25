import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {MainChecking} from '../main/mainModal'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import {SHA256} from 'crypto-js';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../atoms';
import './mypagecss.css';
import { Link } from 'react-router-dom';



const MypageInfo = () => {
    let secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY;

    const [isEditing, setIsEditing] = useState(false); 

    const navigate = useNavigate();

    const [loginUserInfo, setLoginUserInfo] = useState([]);
    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const loginUserRegion = localStorage.getItem("loginUserRegion");

    /*data 전달 값 함수 만들기 */
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [npwd,setNpwd] = useState('');
    const [chkPwd, setChkPwd] = useState('');
    const [encPwd, setEncPwd] = useState('');
    const [nick, setNick] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [emailId, setEmailId] = useState('');
    const [email, setEmail] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [readOnly, setReadOnly] = useState(true);
    const [completeEmail, setCompleteEmail] = useState('');
    const [show, setShow] = useState(false);
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [completeAddress, setCompleteAddress] = useState('');
    const [completeDuplicateId, setCompleteDuplcateId] = useState(false);
    const [completeDuplicateNick, setCompleteDuplcateNick] = useState(false);
    const [nick2,setNick2] = useState('');
    let user = {};


    const handleId = (event)=>{setIdValid(false); setDisable(true);setId(event.target.value);}
    const handlePwd = (event)=>{setEncPwd(SHA256(event.target.value, secretKey).toString());}
    const handleChkPwd = (event)=>setChkPwd(event.target.value);
    const handleNick = (event)=>{setNickValid(false); setDisable(true);setNick(event.target.value)};
    const handleName = (event)=>setName(event.target.value);
    const handlePhone = (event)=>setPhone(event.target.value);
    const handleEmailId = (event)=>setEmailId(event.target.value);
    const handleEmail = (event)=>{
        const selectVal = event.target.value;
        if(selectVal=='naver.com'|| selectVal=='gmail.com'||selectVal=='kakao.com'||selectVal=='nate.com'){
            setEmail(selectVal);
            setReadOnly(true);
        } else {
            setReadOnly(false);
            setEmail('');
        }
    }
    const handleUserEmail = (event)=>setUserEmail(event.target.value);
    const handleCompleteEmail = ()=>setCompleteEmail(emailId+'@'+email);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlePostcodeComplete = (data) => {
        // 주소 검색 완료 시 실행되는 함수
        handleClose();
        setPostcode(data.zonecode);
        setAddress(data.address);
    };
    const handleDetailAddress = (event)=> setDetailAddress(event.target.value);
    const handleCompleteAddress = ()=>setCompleteAddress(postcode+','+address+','+detailAddress);
    const handleCompleteChk = ()=>{
        handleCompleteAddress();
        handleCompleteEmail(); 
        
        
    }

    
    useEffect(() => {
        axios.post("/dasony/api/getMyInfo", {
          userNo: loginUserNo
        }).then((response) => {         
            const myInfoData = response.data.myInfo;
            
            setId(myInfoData[0].userId);
            setPwd(myInfoData[0].userPwd);
            setChkPwd(myInfoData[0].userPwd);
            setNick(myInfoData[0].userNick);
            setName(myInfoData[0].userName);
            setPhone(myInfoData[0].userPhone);
            setEmail(myInfoData[0].userEmail);
            setAddress(myInfoData[0].userAddress);
            const [emailId2, email2] = myInfoData[0].userEmail.split('@');
            const [address1, address2,address3] = myInfoData[0].userAddress.split(',');
            setEmail(email2);
            setEmailId(emailId2);
            setPostcode(address1);
            setAddress(address2);
            setDetailAddress(address3);
            
        setDisable(false);
        }).catch((error) => {
          console.error("오류남:getmyinfo", error);
        });
      }, []);
    /*유효성 검사 */

    /*버튼 비활성화 */
    const[disable, setDisable] = useState(true);
    const handleDisable = () => {
        setDisable(false);
    }
    
    /*별명, 아이디, 이름에 특수문자 못 쓰게 하기 - 자동 제거 */
    const handleValidTxt = async (event)=>{
        if(event.target.id!='id'&&event.target.id!='emailId'
            &&event.target.id!='email'&&event.target.value.length>6){
            event.target.value = event.target.value.slice(0, 6);
        }
        let oriTxt = event.target.value;
        switch(event.target.id){
            case'id' : 
                        const filteredId = oriTxt.replace(/[^a-zA-Z0-9]/g, '');
                        event.target.value = filteredId;
                        await handleId(event);
                        break;
            case'nick' :
                        const filteredNick = oriTxt.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣]/g, '');
                        event.target.value = filteredNick;
                        await handleNick(event); 
                        break;
            case'name' : 
                        const filteredName = oriTxt.replace(/[^ㄱ-ㅎ가-힣]/g, '');
                        event.target.value = filteredName;
                        await handleName(event); 
                        break;
            case'emailId' :
                        const filteredEmailId = oriTxt.replace(/[^a-zA-Z0-9]/g, '');
                        event.target.value = filteredEmailId;
                        await handleEmailId(event);
                        break;
            case'email':
                        const filteredEmail = oriTxt.replace(/[^a-zA-Z.]/g, '');
                        event.target.value = filteredEmail;
                        await handleUserEmail(event);
                        break;
        }
    }

    /*아이디 글자수 제한 */
    const handleIdLength = () => {
        if(id.length<5){
            alert("아이디는 5글자 이상이어야 합니다");
        }
    }

    /*핸드폰 번호 문자 제한 */
    const handleValidPhone = (event)=>{
        let oriPhone = event.target.value;
        oriPhone = oriPhone.replace(/\D/g, '');
        
        if(oriPhone.length > 3){
            oriPhone = oriPhone.slice(0, 3) + '-' + oriPhone.slice(3);
        }

        if(oriPhone.length>8){
            oriPhone = oriPhone.slice(0, 8) + '-' + oriPhone.slice(8);
        }

        event.target.value = oriPhone;

        handlePhone(event);
    }
    /*비밀번호 암호화 */
        
        /*Encrypt */

        /*Decrypt */
        /*const decrypting = CryptoJS.AES.encrypt(encPwd, secretKey).toString();
        const decPwd = decrypting.toString(CryptoJS.enc.Utf8); */


    /*비밀 번호 글씨 수 검사 */
    const handlePwdLength = () => {
        const pwd1 = document.getElementById("pwd1");
        const pwd2 = document.getElementById("pwd2");
        if(isEditing){

            if(pwd1.value.length<10){
                alert("비밀 번호를 10자 이상 입력해주세요");
            }
        }
    }
    
    /*비밀 번호 동일 검사 */
        /*비밀 번호 동일 검사 결과 txt 설정 */
    const [pwdTxt, setPwdTxt] = useState('');
        /*비밀 번호 동일 검사 결과 txt 설정 */
    const [pwdColor, setPwdColor] = useState('');
        /*비밀 번호 동일 검사 함수 */
    const handleValidatePwd = () => {
        if(pwd && chkPwd){
            if(pwd == chkPwd){
                setPwdColor("#7A7A7A");
                setPwdTxt("비밀 번호가 일치합니다.");
            } else {
                setPwdColor("red");
                setPwdTxt("비밀 번호가 일치하지 않습니다.");
            }
        } else {
            setPwdTxt("");
        }
    }


    /*핸드폰 인증 검사 */

    /* 아이디, 별명 중복 검사 완료 */
    const[idValid, setIdValid] = useState(false);
    const[nickValid, setNickValid] = useState(false);

    useEffect(()=>{
        handleValidatePwd();
         

        if(id&&pwd&&nick&&name&&phone&&completeAddress!=',,'&&completeEmail!='@'
            &&completeDuplicateId&&completeDuplicateNick&&idValid&&nickValid){
                handleDisable();
            }
        

            user = {userNo : loginUserNo, userId:id, userPwd:encPwd, userName:name,
                userNick:nick, userAddress:completeAddress, userPhone:phone, userEmail:completeEmail};
                ;
                
                
                handleCompleteAddress();
                handleCompleteEmail(); 
                
    }, [id, pwd, chkPwd, nick, name, phone, completeEmail, completeAddress,completeDuplicateId,completeDuplicateNick, idValid, nickValid])


    
        
    /*정보 수정 버튼 */
    const handleSubmit = (event) => {

        
        
        event.preventDefault();
        handleCompleteAddress();
        handleCompleteEmail(); 

        user = {userNo : loginUserNo, userId:id, userPwd:encPwd, userName:name,
            userNick:nick, userAddress:completeAddress, userPhone:phone, userEmail:completeEmail};
        
        
        axios.post("/dasony/api/modifyMyInfo", user, {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(response => {
                window.location.reload();
                
            })
            .catch(error => {
                console.error("modify오류",error);
            });
    };


  return (

    <div className="admin-user-datail-container">
          
                <h2>회원 정보</h2>

                <div className="changeLocationButton"><Link to={'/MypageChangeLocation'}><b >지역 수정하기</b></Link></div>
            <div className='user-datail-table'>
                 <table>
               
               
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td><input id='id' type='text' onChange={handleValidTxt} onBlur={handleIdLength} maxLength={20} value={id}   readOnly/></td>
                        {isEditing && (<th style={{textAlign:'left'}}><MainChecking txt='아이디 중복 확인' data={id} setId={setId} 
                        setCompleteDuplcateId={setCompleteDuplcateId} setIdValid={setIdValid}/></th>)}
                    </tr>
                    
                    <tr>
                        <th>새 비밀번호</th>
                        <td><input type='password' id='pwd1' onChange={handlePwd} onBlur={handlePwdLength}   readOnly={!isEditing}  maxLength={20}/></td>
                    </tr>
                    <tr>
                        <th>새 비밀번호 확인</th>
                        <td><input type='password' id='pwd2' onChange={handleChkPwd}   readOnly={!isEditing} maxLength={20}/></td>
                    </tr>
                    <tr>
                        <th>별명</th>
                        <td><input id='nick' type='text' onChange={handleValidTxt}   readOnly={!isEditing} maxLength={6} value={nick}/></td>
                        {isEditing && (
                <th style={{ textAlign: 'left' }}>
                  <MainChecking
                    txt='별명 중복 확인'
                    data={nick}
                    setId={setNick}
                    setCompleteDuplcateId={setCompleteDuplcateNick}
                    setIdValid={setNickValid}
                  />
                </th>
              )}
                    </tr>
                    <tr>
                        <th>이름(실명)</th>
                        <td><input id='name' type='text' onChange={handleValidTxt} maxLength={6}   readOnly={!isEditing} value={name}/></td>
                    </tr>
                    <tr>
                        <th>핸드폰번호</th>
                        <td><input type='text' onChange={handleValidPhone} maxLength={13}   readOnly={!isEditing} value={phone}/></td>
                        {isEditing && (<th style={{textAlign:'left'}}><MainChecking txt='인증하기'/></th>)}
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td>
                            <input id='emailId' type='text' style={{width:'38%', maxWidth:'210px'}} onChange={handleValidTxt}   readOnly={!isEditing} onBlur={handleCompleteEmail} maxLength={20} value={emailId}/>
                            {" "}@{" "}
                            <input id='email' type='text' style={{width:'36%',maxWidth:'207px'}} value={email} readOnly={readOnly} onChange={handleValidTxt}  onBlur={handleCompleteEmail} maxLength={12}/>
                        </td>
                        {isEditing && (<th style={{textAlign:'left'}}>
                            <select onChange={handleEmail}>
                                <option>naver.com</option>
                                <option>kakao.com</option>
                                <option>gmail.com</option>
                                <option>nate.com</option>
                                <option>직접 입력</option>
                            </select>
                        </th>
                        )}
                    </tr>
                           
                    <tr>
                        <th style={{verticalAlign:'top', paddingTop:'2vh'}}>주소</th>
                        <td style={{height:'20vh'}}>
                            <input style={{marginBottom:'1vh'}} className='postcode' type='text' Value={postcode} readOnly/><br/>
                            <input style={{marginBottom:'1vh'}} className='main-address' type='text' Value={address} readOnly/><br/>
                            <input className='detail-address' type='text' onChange={handleDetailAddress} onBlur={handleCompleteAddress}   readOnly={!isEditing} Value={detailAddress}/></td>
                            {isEditing && ( <th style={{verticalAlign:'top', paddingTop:'1.5vh', textAlign:'left'}}><Button onClick={handleShow}>주소 찾기</Button></th>)}
                    </tr>
                    <Modal show={show} onHide={handleClose}>
                        <ModalHeader>주소 찾기</ModalHeader>
                        <ModalBody>{<DaumPostcode onComplete={handlePostcodeComplete}/>}</ModalBody>
                        <Button type='button' className='btn_close' variant='secondary' onClick={handleClose}>닫기</Button>
                        
                    </Modal>
      
                </tbody>
              
                <tfoot>
                    <tr>
                    <td></td>
              <td>
                {/* 수정 중인지 여부에 따라 버튼 텍스트와 클릭 핸들러를 변경 */}
                {isEditing ? (
                  <button onClick={handleSubmit}>수정 완료</button>
                ) : (
                  <button onClick={() => setIsEditing(true)}>수정 하기</button>
                )}
              </td>
              <td></td>
                    </tr>
                </tfoot>
            </table>
            </div>
            
            
        </div>
    
  );
};

export default MypageInfo;
