import './Board.css';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BoardDailyList from './BoardDailyList';

const BoardListHeader = (props) => {
  const [selectedPath, setSelectedPath] = useState('');
  const {path} = props;
  // const location = useLocation();
  const n = useNavigate();
  // const path = location.pathname;

  let generalList = [
    { name: '일상게시판', value: '/board/general/daily', boardKey: 'general' },
    { name: '관심사게시판', value: '/board/general/interest', boardKey: 'general' },
  ];

  let infoList = [
    { name: '맛집게시판', value: '/board/info/jmt' , boardKey: 'info' },
    { name: '패션게시판', value: '/board/info/fashion', boardKey: 'info' },
    { name: '지역사회서비스', value: '/board/info/local', boardKey: 'info' },
  ];

  const handlePathChange = (e) => {
    n(e.target.value);
    setSelectedPath(e.target.value);
  };

  useEffect(() => {
    setSelectedPath(path); // 현재 경로에 맞게 선택된 값을 업데이트
  }, [path]);

  let boardOptions = path.includes('general') ? generalList : infoList;

  return (
    <div className="row justify-content-md-center BoardList-head-title">
      <div className="col-md-9 BoardList-head-title-text">
        <select className='boardListSelect' value={selectedPath} onChange={handlePathChange} >
          <option value=''>게시판 선택</option>
          {boardOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.name}</option>
          ))}
        </select>
      </div>
        <div className="col-3 col-md-3">
          <Link to={selectedPath.includes('daily/')? selectedPath+'dwriter':selectedPath+'/dwriter'} style={{textDecoration:'none'}}>
            <button className="board-li BoardList-head-title-btn" id="dwriter"                                       
                    // onClick={(event)=>{HandleOpacity(event.target.id);}}
            >글쓰기</button>
          </Link>
        </div>
        
      </div>

  );
};

export default BoardListHeader;