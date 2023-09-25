import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import './adminUserDetail.css';
import { useState, useEffect } from "react";
import { AdminUserModal } from "./adminUserModal";
import { useParams } from "react-router-dom";
import axios from 'axios';

export const AdminUserDetail = () => {

    const {userNo} = useParams();
    const [user, setUser] = useState({
        userNo : "",
        userId : "",
        userName : "",
        userNick : "",
        userPwd : "",
        userPhone : "",
        userEmail : "",
        userAddress : "",
        userStatus : "",
        userLevel : "",
        userModDate : "",
        userJoinDate : ""
    });

    const userLevelMap = {
        "A" : "지역새싹",
        "B" : "지역루키",
        "C" : "지역프로",
        "D" : "지역달인",
        "E" : "지역장인",
        "Z" : "관리자"
    }

{/*회원 정보 디테일 가져오기 */}
    const handleUserDetail = ()=>{
        axios.post('/dasony/api/userInfo', {userNo:userNo})
        .then(res=>{
            setUser(res.data.user);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요.");
        })}

    const [show, setShow] = useState(false);
    const handleOn = ()=> setShow(true);
    const handleOff = () => setShow(false);


    useEffect(()=>{
        handleUserDetail();
    }, []);


    return(
        <div className="admin-user-datail-container">
            <div className="admin-user-datail-head">
                <div>회원 목록</div>
            </div>
            <div className='admin-user-datail-table'>
                <table>
                    <tbody>
                        <tr>
                            <th>회원 번호</th>
                            <td>{user.userNo}</td>
                        </tr>
                        <tr>
                            <th>회원 이름</th>
                            <td>{user.userName}</td>
                        </tr>
                        <tr>
                            <th>회원 아이디</th>
                            <td>{user.userId}</td>
                        </tr>
                        <tr>
                            <th>회원 별명</th>
                            <td>{user.userNick}</td>
                        </tr>
                        <tr>
                            <th>핸드폰 번호</th>
                            <td>{user.userPhone}</td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>{user.userEmail}</td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td style={{fontSize:"90%"}}>{user.userAddress}</td>
                        </tr>
                        <tr>
                            <th>상태</th>
                            <td>{user.userStatus}</td>
                        </tr>
                        <tr>
                            <th>등급</th>
                            <td>{userLevelMap[user.userLevel]}</td>
                        </tr>
                        <tr>
                            <th>수정 날짜</th>
                            <td>{user.userModDate}</td>
                        </tr>
                        <tr>
                            <th>가입 날짜</th>
                            <td>{user.userJoinDate}</td>
                        </tr>
                    </tbody>
                </table>
                <AdminUserModal title={'회원 정보 수정'} btnTitle={'회원 정보 수정'} 
                                user={user} handleUserDetail={handleUserDetail}/>
            </div>
            
            
        </div>
    );}