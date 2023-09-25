import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef } from 'react'; // useRef 추가
import { SHA256 } from 'crypto-js';
import emailjs from '@emailjs/browser';

function MainChecking(props) {
  let secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY;

  const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    getBodyTxt();
    setShow(true);
  }

  const [bodyTxt, setBodyTxt] = useState('');
  const form = useRef(); // useRef 추가

  const getBodyTxt = () => {
    let ModalData = { id: "", nick: "" };
    if (props.txt.includes("아이디")) {
      ModalData.id = props.data;
    } else {
      ModalData.nick = props.data;
    }

    axios.post('/dasony/api/chkValidate', ModalData, {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => {
        if (props.txt.includes('아이디')) {
          if (!response.data) {
            setBodyTxt('사용가능한 아이디입니다.');
            props.setId(ModalData.id);
            props.setIdValid(true);
            props.setCompleteDuplcateId(true);
            return;
          } else {
            setBodyTxt('이미 사용 중인 아이디입니다.');
            props.setId('');
            return;
          }

        } else if (props.txt.includes('별명')) {
          if (!response.data) {
            setBodyTxt('사용가능한 별명입니다.');
            props.setNick(ModalData.nick);
            props.setNickValid(true);
            props.setCompleteDuplcateNick(true);
            return;
          } else {
            setBodyTxt('이미 사용 중인 별명입니다.');
            props.setNick('');
            return;
          }
        } 
        else {
             
            
          const newPwd0 = 1234567890;
          const newPwd = SHA256(newPwd0, secretKey).toString();
          axios.post('/dasony/api/changeNewPwd', {
            userNo: loginUserNo,
            newPwd: newPwd
          }).then((response) => {
          }).catch((error) => {
            console.error("오류남:", error);
          });
        }
      })
      .catch(error => {
        console.log("실패:error:", error);
      })
  }

  return (
    <>
      <button onClick={handleShow}>{props.txt}</button>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader>{props.txt}</ModalHeader>
        <ModalBody>{bodyTxt}</ModalBody>
        <ModalFooter><Button onClick={handleClose}>닫기</Button></ModalFooter>
      </Modal>
    </>
  );
}

export { MainChecking };
