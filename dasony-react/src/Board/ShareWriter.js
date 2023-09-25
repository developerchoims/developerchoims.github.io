import { useRef, useState } from "react"
import { AnotherHeader } from "./AnotherHeader"
import './ShareWriter.css';
import { useRecoilState } from 'recoil';
import {shareState} from '../atoms';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const ShareWriter = () => {

    const inputRef = useRef(null);

    const navigate = useNavigate();

    const boardCateNo = 3101;

    const userNo = localStorage.getItem("loginUserNo");

    const getCurrentDateTime = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      };
    
    const [share, setShare] = useRecoilState(shareState);
    const handleShare = (e) => {
        const {id, value} = e.target;
        setShare(prev=>({
            ...prev,
            [id]:value,
            boardCateNo : boardCateNo,
            userNo : userNo,
            boardWriteDate : getCurrentDateTime()
        }));
    }

    /*이미지 정보 저장 */
    const form = new FormData();
    const handleAddImg = ()=>{
        const fileInput = inputRef.current;
        if (fileInput) {
            const file = fileInput.files;
           
            for(let i = 0; i < file.length; i++) {
                form.append("file", file[i]);
            }
            
        }
    }

    {/*이미지 미리보기 설정 */}
    const[showImages, setShowImages] = useState([]);
    const handleImg = (e)=>{
        const files = e.target.files;
        let fileUrls = [];
        for (let i = 0; i < files.length; i++) {
            const fileUrl = URL.createObjectURL(files[i]);
            fileUrls.push(fileUrl);
        }
        if (fileUrls.length > 5) {
            fileUrls = [];
            e.target.value = [];
            alert("사진은 5개까지만 추가하실 수 있어요");
        } else {
            setShowImages(fileUrls);
        }
    }

    /*나눔 게시글 작성 - 서버 */
    const handleShareSub = () => {
        handleAddImg();
        form.append("share", new Blob([JSON.stringify(share)], {type: "application/json" }));
        axios.post('/dasony/api/shareAdd', form)
        .then(res=>{
            alert(res.data);
            navigate('/board/share/list');
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return(
        <>
            <AnotherHeader/>
                
            <div className="Vote">

                <div className='Vote-Content-container'>
                <div>
                    <br/>
                    <input type="file" ref={inputRef} onChange={handleImg} multiple/>
                    <br/><br/>
                </div>
                <div className="share-img-box">
                {
                    showImages?.map((image, id)=>{
                        return(
                            <img key={id} src={image} style={{width:'150px'}}/>
                        )
                        
                    })
                }
                </div>
                <div>
                    <br/>
                    <textarea rows="8" cols="110"
                            id="boardContent" style={{border:'none'}}
                            onChange={handleShare} value={share?.boardContent}
                            placeholder="나눔할 상품에 대해 설명해주세요!">

                    </textarea>
                </div>
                <div className='vote-button-box'>
                    <button className='vote-button-box-cncl' >취소</button>
                    <button className='vote-button-box-sub' onClick={handleShareSub} >등록</button>
                </div>

                </div>
                
            </div>
        </>
    )
}