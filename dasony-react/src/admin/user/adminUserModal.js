import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from "react-bootstrap";
import './adminUserDetail.css';
import { useState, useEffect } from "react";
import axios from 'axios';

export const AdminUserModal = (props) => {

    const [show, setShow] = useState(false);
    const handleOn = ()=> setShow(true);
    const handleOff = () => setShow(false);

    const [modifyUser, setModifyUser] = useState({
        
        userNo: '',
        userId: '',
        userName: '',
        userNick: '',
        userPwd: '',
        userPhone: '',
        userEmail: '',
        userAddress: '',
        userStatus: '',
        userLevel: '',
        userModDate: '',
        userJoinDate: ''
    });

    console.log("modifyUserId좀 보자",modifyUser.userId);

    const handleModifyUser = (event)=>{
        const {id, value} = event.target;
        setModifyUser(preveUser=>({
            ...preveUser,
            [id]:value
        }));
        console.log(modifyUser);
    }


    
{/*회원 정보 수정 - 서버 */}
const handleUserUpdateSub = () => {
    axios.patch("/dasony/api/admin/userUpdate", modifyUser, {
        headers : {
            "Content-Type": "application/json; charset=utf-8"
    }})
    .then(res=>{
        alert(res.data);
        props.handleUserDetail();
    })
    .catch(err=>{
        setModifyUser({
            userNo: props.user.userNo,
            userId: props.user.userId,
            userName: props.user.userName,
            userNick: props.user.userNick,
            userPwd: props.user.userPwd,
            userPhone: props.user.userPhone,
            userEmail: props.user.userEmail,
            userAddress: props.user.userAddress,
            userStatus: props.user.userStatus,
            userLevel: props.user.userLevel,
            userModDate: props.user.userModDate,
            userJoinDate: props.user.userJoinDate
        });
        console.log(err);
        alert("다시 시도해주세요.");
    })
    handleOff();
}



    useEffect(() => {
        if (props.user) {
            setModifyUser({
                userNo: props.user.userNo,
                userId: props.user.userId,
                userName: props.user.userName,
                userNick: props.user.userNick,
                userPwd: props.user.userPwd,
                userPhone: props.user.userPhone,
                userEmail: props.user.userEmail,
                userAddress: props.user.userAddress,
                userStatus: props.user.userStatus,
                userLevel: props.user.userLevel,
                userModDate: props.user.userModDate,
                userJoinDate: props.user.userJoinDate
            });
        }
    }, [props.user]);

    return(
        <>
        <Button className="btn btn-primary" onClick={handleOn}>{props.btnTitle}</Button>
        <Modal  show={show} fullscreen={true}>
                <ModalHeader>{props.title}</ModalHeader>
                <ModalBody>
                    <table className="modalUserTable">
                        <tbody>
                            <tr>
                                <th>회원 번호</th>
                                <td>{props.user.userNo}</td>
                            </tr>
                            <tr>
                                <th>회원 이름</th>
                                <td>
                                    <input id='userName' type='text' value={modifyUser.userName} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>회원 아이디</th>
                                <td>{props.user.userId}</td>
                            </tr>
                            <tr>
                                <th>회원 별명</th>
                                <td>{props.user.userNick}</td>
                            </tr>
                            <tr>
                                <th>핸드폰 번호</th>
                                <td>
                                    <input id='userPhone' type='text' value={modifyUser.userPhone} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>
                                    <input id='userEmail' type='text' value={modifyUser.userEmail} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    <input id='userAddress' type='text' value={modifyUser.userAddress} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>상태</th>
                                <td>
                                    <select id='userStatus' value={modifyUser.userStatus} onChange={handleModifyUser}>
                                        <option>Y</option>
                                        <option>N</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>등급</th>
                                <td>
                                    <select id='userLevel' value={modifyUser.userLevel} onChange={handleModifyUser}>
                                        <option>지역새싹</option>
                                        <option>지역루키</option>
                                        <option>지역프로</option>
                                        <opt
                                        ion>지역달인</opt>
                                        <option>지역장인</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>수정 날짜</th>
                                <td>{props.user.userModDate}</td>
                            </tr>
                            <tr>
                                <th>가입 날짜</th>
                                <td>{props.user.userJoinDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-danger'  onClick={handleOff}>취소</Button>
                    <Button className="btn btn-primary"  onClick={handleUserUpdateSub}>확인</Button>
                </ModalFooter>
            </Modal>
            </>
    );
}