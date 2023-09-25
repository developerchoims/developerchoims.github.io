import './Board.css';
import { useEffect, useState } from 'react';
import { boardPostState } from '../atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { boardCateState } from '../atoms';
import { useRecoilState, useRecoilValue  } from 'recoil';
import {BoardDetailcategoryState, BoardVotecategoryState, BoardShortscategoryState, BoardInterestCategoryState, 
  BoardJMTCategoryState, BoardFashionCategoryState, BoardLocalCategoryState } from '../atoms';

const BoardWriterCategory = () =>{
  const location = useLocation();
  const path = location.pathname;
  const [boardCateItem, setBoardCateItem] = useState('');
   // Recoil 상태 가져오기
   const [boardCateStateValue, setBoardCateState] = useRecoilState(boardCateState);
   const boardDetailCategory = useRecoilValue(BoardDetailcategoryState);
   const boardVotecategory = useRecoilValue(BoardVotecategoryState); 
   const boardShortscategory = useRecoilValue(BoardShortscategoryState);
   const boardInterestCategory = useRecoilValue(BoardInterestCategoryState);
   const boardJMTCategory = useRecoilValue(BoardJMTCategoryState);
   const boardFashionCategory = useRecoilValue(BoardFashionCategoryState);
   const boardLocalCategory = useRecoilValue(BoardLocalCategoryState);

  
  // Category 토글에 사용됨
  // const BoardDetailcategory = [
  //   { name: '일상', value: 'AD01' },
  //   { name: '날씨', value: 'AD04' },
  // ];
  // const BoardVotecategory = (
  //   { name: '쇼츠', value: 'AD02' }
  // );
  // const BoardShortscategory = (
  //   { name: '투표', value: 'AD03' }
  // );
  // const BoardInterestCategory = [
  //   { name: '게임', value: 'AI01' },
  //   { name: '방송', value: 'AI02' },
  //   { name: '취미', value: 'AI03' },
  //   { name: '기타', value: 'AI04' },
  // ];
  // const BoardJMTCategory = [
  //   { name: '맛집', value: 'BJ01' },
  //   { name: '혼밥', value: 'BJ02' },
  //   { name: '혼술', value: 'BJ03' },
  //   { name: '분위기', value: 'BJ04' },
  // ];
  // const BoardFashionCategory = [
  //   { name: '캐주얼', value: 'BF01' },
  //   { name: '포멀', value: 'BF02' },
  //   { name: '스트릿', value: 'BF03' },
  //   { name: '걸리시', value: 'BF04' },
  // ];
  // const BoardLocalCategory = [
  //   { name: '복지', value: 'BL01' },
  //   { name: '교육', value: 'BL02' },
  //   { name: '대여', value: 'BL03' },
  //   { name: '의료', value: 'BL04' },
  // ];

  // useEffect(() => {
  //   // 초기화 시점에 전역 상태 초기값으로 업데이트
  //   setBoardCateState(boardCateItem);
  // }, [boardCateItem]);

  
   // 카테고리 목록을 저장할 배열
   const dailypath = new RegExp("daily/dwriter");
   const dailypath2 = new RegExp("daily/edit");

   const dailyOptions = path.match(dailypath) ? path : null;
   const dailyOptions2 = path.match(dailypath2) ? path : null;
   const shortsOptions = path.includes('swriter')? path : null;
   const voteOptions = path.includes('vwriter')? path : null;
   const interestOptions = path.includes('interest')? path : null;
   const jmtOptions = path.includes('jmt')? path : null;
   const fashionOptions = path.includes('fashion')? path : null;

  const [boardCate, setBoardCate] = useState([]);
  useEffect(() => {
    if (path == dailyOptions) {
      setBoardCate(boardDetailCategory);
    }else if( path == dailyOptions2 ){
      setBoardCate(boardDetailCategory);
    } else if (path == shortsOptions) {
      setBoardCate(boardShortscategory);
    } else if (path == voteOptions) {
      setBoardCate(boardVotecategory);
    } else if (path == interestOptions) {
      setBoardCate(boardInterestCategory);
    } else if (path == jmtOptions) {
      setBoardCate(boardJMTCategory);
    } else if (path == fashionOptions) {
      setBoardCate(boardFashionCategory);
    } else {
      setBoardCate(boardLocalCategory);
    }
  }, []);
 
   const handleBoardDCate = (e) => {
     const selectedValue = e.target.value;
     const selectedCategory = boardCate.find(cat => cat.value === selectedValue);
     setBoardCateItem(selectedValue);
     setBoardCateState(selectedCategory);
   };
   console.log('boardCateItem',boardCateItem);

 return(
  <div className="col-md-2 boardDetail-category-div">
    <select id="boardDetail-category" onChange={handleBoardDCate} value={boardCateItem}>
      <option value="" disabled hidden>선택</option> {/* 기본 옵션 */}
      {boardCate.map((option, index) => (
        <option onClick={(e)=>{setBoardCateItem(e.target.value);}} value={option.value} key={index}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
 )
}
export default BoardWriterCategory;
