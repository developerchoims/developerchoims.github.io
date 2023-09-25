import '../user/adminUser.css';
import './adminCalendar.css';
import { Button, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import AdvancedExample from './Pagination';
import { useState, useEffect } from 'react';
import { AdminUserModal } from '../user/adminUserModal';
import axios from 'axios';
import { event } from 'jquery';

export const AdminCalendar = () => {


    {/*달력 리스트 Y 서버 전송 */}
    const handleCalendarAdmit = (id) => {
        axios.patch('/dasony/api/calendarAdmit', {calendarNo:id})
        .then(res=>{
            alert(res.data);
        })
        .catch(err=>{
            console.log(err);
            alert('승인 실패');
        })
    }

    {/*달력 리스트 N 서버 전송 */}
    const handleCalendarCancle = (id)=>{
        axios.delete(`/dasony/api/calendarCancle/${id}`)
        .then(res=>{
            alert(res.data);
        })
        .catch(err=>{
            console.log(err);
            alert('삭제 실패');
        })
    }

    {/*달력 리스트 검색 */}
    const [keyword, setKeyword] = useState('');
    const handleKeyword = (e)=>{
        setKeyword(e.target.value);
    }

    

    return(
        <div className="admin-user-container">
            <div className="admin-user-head">
                <div>달력 신청 목록</div>
                <div><input onChange={handleKeyword} type="text" value={keyword}/><Button className="btn btn-primary">검색</Button></div>
            </div>
            <AdvancedExample handleCalendarAdmit={handleCalendarAdmit} handleCalendarCancle={handleCalendarCancle} keyword={keyword}/>
        </div>
    );
}