import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './HomeSide.css';
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import axios from 'axios';

const HomeSide = () => {
    const userRegion = localStorage.getItem("loginUserRegion");
    const userNo = localStorage.getItem("loginUserNo");

    {/*달력 보이기 설정 */}
    const [date, setDate] = useState(new Date());

    const [show, setShow] = useState('none');
    const handleClose = ()=> {setShow('none'); }
    const handleOpen = () => {handleCalendar(); setShow('block');}
    const handleStyle = ()=>{
        if(show == 'none'){
            handleOpen();
            return;
        } else {
            handleClose();
        }
    }

    {/*달력 리스트 서버에서 받아오기 */}
    const calendarCateMap = {
        "F":"축제",
        "P":"공연",
        "D":"봉사",
        "E":"기타"
    }
    const [calendarList, setCalendarList] = useState([]);
    const handleCalendar = () => {
        axios.post('/dasony/api/calendarList', {userRegion:userRegion})
        .then(res=> {
            setCalendarList(res.data.calendarList);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }

    {/*달력 일정 추가 모달 보이기 설정 */}
    const [modalShow, setModalShow] = useState(false);
    const handleModalClose = ()=> {
        if(localEvent.calendarCate!=''&& localEvent.calendarDate!='' 
        &&localEvent.calendarSpec!='' && localEvent.calendarName!= '' && localEvent.calendarLocation){
            setModalShow(false);
            handleCalendarSubmit(); 
            setLocalEvent({
                calendarDate: "",
                calendarName: "",
                calendarPlace: "",
                calendarSpec: "",
                calendarCate: "축제",
                userNo:userNo,
                calendarLocation:userRegion
            });
        } else {
            alert('입력창을 모두 채워주세요.');
        }
    }
    const handleModalOpen = () => {setModalShow(true); }
    const handleModaloff = ()=>{
        setModalShow(false);
        setLocalEvent({
            calendarDate: "",
            calendarName: "",
            calendarPlace: "",
            calendarSpec: "",
            calendarCate: "축제",
            userNo:userNo,
            calendarLocation:userRegion
        });
    }

    {/*달력 일정 추가 데이터 추가 */}
    const [localEvent, setLocalEvent] = useState({
                                                    calendarDate: "",
                                                    calendarName: "",
                                                    calendarPlace: "",
                                                    calendarSpec: "",
                                                    calendarCate: "축제",
                                                    userNo: userNo,
                                                    calendarLocation:userRegion
                                                });
    const [subDate, setSubDate] = useState({
                                        dateStart:"",
                                        dateEnd:"",});
   
    const handleSubDate = (e) =>{
        if(e.target.id == 'event-date-start'){
            setSubDate({...subDate, dateStart:e.target.value});
        } else {
            setSubDate({...subDate, dateEnd:e.target.value});
        }
    } 
    
    const handleLocalEvent = (e) => {
        const { id, value } = e.target;
        let date = subDate.dateStart+" ~ "+subDate.dateEnd
        let newName = localEvent.calendarName;
        let newLocation = localEvent.calendarPlace;
        let newEtc = localEvent.calendarSpec;
        let newCate = localEvent.calendarCate;
    
        switch (id) {
            case 'event-name':
                newName = value;
                break;
            case 'event-location':
                newLocation = value;
                break;
            case 'event-etc':
                newEtc = value;
                break;
            case 'event-cate':
                newCate = value==''?'축제':value;
                break;
            default:
                break;
        }
        
        const newEvent = {
            calendarDate: date,
            calendarName: newName,
            calendarPlace: newLocation,
            calendarSpec: newEtc,
            calendarCate: newCate==""?"축제":newCate,
            userNo: userNo,
            calendarLocation:userRegion
        };
        console.log(localEvent);
        console.log(subDate);
        setLocalEvent(newEvent);
    }

    {/* 일정 추가 서버로 보내기 */}
    const handleCalendarSubmit = () => {
        axios.post('/dasony/api/calendarInsert', localEvent, {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }})
        .then(res=>{
            alert(res.data.msg);
            handleCalendar();
        })
        .catch(err=>{
            console.log(err);
            alert("조금 뒤 다시 시도해주세요.");
        })
    }



    
    return(
        <div className="calendar-container"  style={{textAlign:'right'}}>
            <Calendar 
                        onChange={setDate}
                        selectRange={false}/>
            <Button style={{background:'white'
                            , color:'#CB9DE7',
                            border: '3px solid #CB9DE7',
                            marginRight:'1.5vw',
                            marginTop: '1.5vh'}} onClick={handleOpen}>일정 확인</Button>
            <div className="calendar-detail-container" style={{display:show}} >
                <div><button onClick={handleStyle}>x</button></div>
                <div className="calendar-detail-box">
                    우리 지역 달력
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>날짜(기간)</th>
                                    <th>일정 이름</th>
                                    <th>장소</th>
                                    <th>특이 사항</th>
                                    <th>종류</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calendarList.filter(calendar=>calendar.calendarStatus == 'Y')
                                            .map(calendar=>{
                                    return(
                                    <tr key={calendar.calendarNo}>
                                        <td>{calendar.calendarDate}</td>
                                        <td>{calendar.calendarName}</td>
                                        <td>{calendar.calendarPlace}</td>
                                        <td>{calendar.calendarSpec}</td>
                                        <td>{calendarCateMap[calendar.calendarCate]}</td>
                                    </tr>
                                    );
                                })}
                                
                            </tbody>
                            <tfoot style={{width:'100%'}}>
                                <tr>
                                    <td colSpan={5} style={{height:'10vh'}}></td>
                                </tr>
                                <tr>
                                    <td colSpan={5}  style={{fontSize:'1.5vw'}}>
                                        내가 신청한 내역
                                    </td>
                                </tr>
                                <tr>
                                    <th>날짜(기간)</th>
                                    <th>일정 이름</th>
                                    <th>장소</th>
                                    <th>특이 사항</th>
                                    <th>종류</th>
                                </tr>
                                {calendarList.filter(calendar=>calendar.calendarStatus == 'P' && calendar.userNo == userNo)
                                            .map(calendar=>{
                                    return(
                                    <tr key={calendar.calendarNo}>
                                        <td>{calendar.calendarDate}</td>
                                        <td>{calendar.calendarName}</td>
                                        <td>{calendar.calendarPlace}</td>
                                        <td>{calendar.calendarSpec}</td>
                                        <td>{calendarCateMap[calendar.calendarCate]}</td>
                                    </tr>
                                    );
                                })}
                            </tfoot>
                        </table>
                        <div className="local-event-add">
                            <button onClick={handleModalOpen}>일정 추가</button>
                            <Modal show={modalShow} onHide={handleModalClose}>
                                <ModalHeader>우리 지역 이벤트 추가</ModalHeader>
                                <ModalBody>
                                    <table className="modalTable">
                                        <thead>
                                            <tr>
                                                <th>날짜(기간)</th>
                                                <td>
                                                    <input id="event-date-start" onChange={handleSubDate} value={subDate.dateStart} type="date"/>
                                                    {" "}~{" "}
                                                    <input id="event-date-end" onChange={handleSubDate} value={subDate.dateEnd} type="date"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>일정 이름</th>
                                                <td>
                                                    <input id="event-name" onChange={handleLocalEvent} value={localEvent.calendarName} type="text"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>장소</th>
                                                <td>
                                                    <input id="event-location" onChange={handleLocalEvent} value={localEvent.calendarPlace} type="text"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>특이 사항</th>
                                                <td>
                                                    <input id="event-etc" onChange={handleLocalEvent} value={localEvent.calendarSpec} type="text"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>종류</th>
                                                <td>
                                                    <select id="event-cate" onChange={handleLocalEvent} defaultValue={localEvent.calendarCate}>
                                                        <option>축제</option>
                                                        <option>공연</option>
                                                        <option>봉사</option>
                                                        <option>기타</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            
                                        </thead>
                                    </table>
                                </ModalBody>
                                <ModalFooter>
                                    <button className="calendar-detail-btn" onClick={handleModaloff}>취소</button>
                                    <button className="calendar-detail-btn" onClick={handleModalClose}>확인</button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HomeSide;

