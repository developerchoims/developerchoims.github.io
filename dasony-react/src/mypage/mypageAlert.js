import React from 'react';
import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Modal,ModalBody, ModalHeader } from 'react-bootstrap';



// import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
const MypageAlert = () => {

    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const loginUserRegion = localStorage.getItem("loginUserRegion");
    const [alert, setAlert] = useState([]);
    const [selectedAlertContent, setSelectedAlertContent] = useState(null); 
    

  useEffect(() => {
    axios.post("/dasony/api/getMyAlertList", {
      userNo: loginUserNo
    }).then((response) => {
      setAlert(response.data.alertList);
    }).catch((error) => {
      console.error("오류남:", error);
    });
  }, [alert]);

  const afterClick = (alertNo) =>{
    axios.post("/dasony/api/alertAfterClick",{
    alertNo : alertNo
    }
    ).then((response)=>{
    }).catch((error)=>{
      console.log(error);
    })
  }

  const handleDelete = (alertNo) => {
    axios.post("/dasony/api/deleteMyAlertList",{
      userNo: loginUserNo ,
      alertNo : alertNo
    }).then((response) => {
      console.log(alert.alertStatus);
    }).catch((error) => {
      console.error("삭제오류남:", error);
    });
  }

  const handleAlertContentClick = (content) => {
    setSelectedAlertContent(content);
    setShow(true);
  }

  // 추가: 모달 창 닫기
  const closeModal = () => {
    setSelectedAlertContent(null);
  }
  const[show, setShow] = useState(false);

    
    return(
    <div className='act-table'>
        <h2>내 알림</h2>

        {/* <button onClick={sendEmail}>테스트</button> */}
        <div className="jefftable">
      <table>
        <thead>
          <tr>
            <th className='nf-history-header2'>알람 번호</th>
            <th className="nf-history-header4">알림 날짜</th>
            <th className="nf-history-header1">알림 제목</th>
            <th className='nf-history-header4'>카테고리</th>
            <th className="nf-history-header3"></th>
          </tr>
        </thead>
        <tbody>
          {alert.map((item,index)=>(
            <tr key={index} className={item.alertStatus === "A" ? "afterClick" : ""}>
                <td className="nf-td1">{item.alertNo}</td>
                <td className="nf-td3">{item.alertDate}</td>
                <td className="nf-td2">
                 <span className="alert-content-link"
                    onClick={() => {
                      handleAlertContentClick(item.alertContent);
                      afterClick(item.alertNo);
                    }}>
                    {item.alertTitle}
                  </span>
                </td>
                <td className="nf-td1" >
                {item.alertCate === 'G' && <span>게임</span>}
                {item.alertCate === 'T' && <span>응모권</span>}
                {item.alertCate === 'P' && <span>포인트 사용</span>}
                {item.alertCate === 'D' && <span>기부</span>}
                {item.alertCate === 'A' && <span>관리자 메세지</span>}
                {item.alertCate === 'R' && <span>답글</span>}
                {item.alertCate === 'E' && <span>이벤트</span>}
                </td>
                <td className="nf-td1">
                <button className="delete-button" onClick={() => handleDelete(item.alertNo)}>삭제</button>
                </td>            
            </tr>
            ))}
        </tbody>
      </table>
      </div>
      {selectedAlertContent && (
        <Modal className="modalAlert" show={show} onHide={setShow}>
          <div className="modal-contentAlert">
          <ModalHeader>알림 <button  onClick={closeModal} style={{ fontSize: "45px" }} className="close-modal">&times;
          </button></ModalHeader>
          <ModalBody>
            <b>{selectedAlertContent}</b>
          </ModalBody>
          </div>
        </Modal>
      )}
    </div>
    


    );
}
export default MypageAlert;