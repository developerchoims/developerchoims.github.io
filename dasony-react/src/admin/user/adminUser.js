import './adminUser.css';
import { Button, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import AdvancedExample from './UserPagination';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const AdminUser = () => {
    
    {/*새로운 회원 추가 모달 열기 */}
    const [show, setShow] = useState(false);
    const handleOn = ()=> setShow(true);
    const handleOff = () => setShow(false);

    const [newUser, setNewUser] = useState({
        oriKey: '',
        name : '',
        id : '',
        pwd : '',
        nick: ''
    });
{/*새로운 회원 추가 */}
    const handleNewUser = (event) => {
        const { id, value} = event.target;

        setNewUser(prevUser => ({
            ...prevUser,
            [id]: value
        }));
    }

      
{/*회원 리스트 검색 */}
  const [keyword, setKeyword] = useState('');
  const handleKeyword = (e)=>{
      setKeyword(e.target.value);
  }


    return(
        <div className="admin-user-container">
            <div className="admin-user-head">
                <div>회원 목록</div>
                <div><input type="text" onChange={handleKeyword} value={keyword}/><Button className="btn btn-primary">검색</Button></div>
            </div>
                <AdvancedExample keyword={keyword}/>
        </div>
    );
}