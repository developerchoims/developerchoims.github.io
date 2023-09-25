import { useState,useEffect } from 'react';
import BoardHeader from './BoardHeader';
import BoardDailyList from './BoardDailyList';
import { useRecoilState } from 'recoil';
import { boardPostState } from '../atoms';
import { nextBoardNoState } from '../atoms';
import BoardWriterCategory from './BoardWriterCategory';
import { edittingState } from '../atoms';
import { useNavigate,useLocation, useParams } from 'react-router-dom';
import OpenEditor from '../service/OpenEditor';
import './boardcssTest.css';
import axios from 'axios';

export const Editting = () => {

  const { boardNo, boardCateNo } = useParams();

  const userNo = parseInt(localStorage.getItem('loginUserNo'));

  /*atom - 보드 수정 정보 저장 */
  const [boardEdit, setBoardEdit] = useRecoilState(edittingState);


  const handleBoardEdit = (e) => {
    const {id, value} = e.target;
    setBoardEdit(prev=>({
        ...prev,
        userNo : userNo,
        [id]:value,
      })

    )
  }

  return (
    <>
      <div className='BoardWriteForm-wrapper'>
        <div className="BoardWriteForm-head-title-wrapper">
          <BoardHeader/>
          <div className="BoardWriteForm-container">
            <div className='form'>
              <div className="BoardWriteForm-search-title-wrapper">
                <div className="row justify-content-md-center boardDetail-title-container">
                  <div className='row'>
                    <BoardWriterCategory/>
                    <div className="col-md-9 BoardWriteForm-title-input">
                      <div className="BoardWriteForm-search-box-title">
                        <input 
                        type="text" 
                        name="boardTitle" 
                        className="BoardWriteForm-search-input-title" 
                        placeholder="제목을 입력하세요."
                        />
                      </div>
                    </div>
                    <div className="col-md-2 BoardWriteForm-category-div"></div>
                      <div className="col-md-9 BoardWriteForm-search-input-tag-wrapper">
                        <div  className="BoardWriteForm-search-box-tag" >
                          <ul className="searchKeyword-ul">
                            
                          </ul>
                          <input type="text" className="BoardWriteForm-search-input-tag"  placeholder="태그를 입력해보세요."
                           />
                        </div>{/* boardList-search-box-tag */}
                      </div>{/* boardList-search-input-tag-wrapper */}
                  </div>{/* row */}
                </div> {/* row justify-content-md-center boardDetail-title-container */}    
              </div>{/* boardList-search-title-wrapper */}


              <div>
                {/* <OpenEditor className="ck-editor" editContent={{content, setContent}}
                defaultValue={newBoardPost.boardContent} 
                onClick={handleInputChange}/> */}
                <textarea
                  className='BoardWriteForm board-input-contentarea'
                  name="boardContent" 
                    />
              </div> 
              <div className='BoardWriteForm-img-input-wrapper'>
                <label htmlFor="file">
                  <div className='boardWriter-img-select'>사진 선택</div>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  // enctype="multipart/form-data"
                  multiple
                  className='boardWriter-img-input'
                />
              </div>
              <div className='boardWriter-img-show-wrapper'>
                {/* {previews?.map((preview, index) => (
                  <div className='boardWriter-img-show-box' key={index}>
                    <div>

                    </div>
                    <img
                      src={preview}
                      width={200}
                      height={200}
                      alt={`${preview}-${index}`}
                    />
                    <div 
                      className='boardWriter-img-show-iomdclos'
                      onClick={() => handleDeletePreview(index)}
                    >
                      X
                    </div>
                  </div>
                ))} */}
              </div>
              <div className='boardWriter-btn board-btn-cntrol-box'>
                <div className='board-btn-wrapper'>
                  <button  className='board-cancel-btn'>취소 버튼</button>
                </div>
                <div className='board-btn-wrapper'>
                  <button type="submit" className='board-submit-btn'>등록</button>  
                </div>
              </div>
            </div>
            <div style={{height:'10vh'}}>{/* 공백용 디브 */}</div>
          </div>{/* BoardWriteForm-container */}
        </div> {/* BoardWriteForm-head-title-wrapper */}
      </div>{/* BoardWriteForm-wrapper */}
    </>
  );
}

