import { useState } from 'react';
import './Board.css';
// import { styled } from '@mui/system';
// import { Select } from '@mui/material';

// const CustomSelect = styled(Select)(({ theme }) => ({
//   '& .MuiSelect-select': {
//     width: '160px',
//     height: '46px',
//   },
// }));


const BoardWTitle =()=>{

  const [keyword, setKeyword] = useState([]);
  const [inputContent, setInputContent] = useState('');

  const BoardDetailcategory = [ 		
    { name: '일상', value: 'daily' },
    { name: '날씨', value: 'weather' },
    { name: '투표', value: 'vote' },
    { name: '쇼츠', value: 'shorts' }
  ];
  
  const [bdcateItem, setBdcateItem] = useState('');

  const handleBoardDCate = (e) => {
    console.log(e);
    // const selectedCategory = BoardDetailcategory.find(category => category.value === e.target.value);
    setBdcateItem(e.target.value); // 선택한 카테고리 객체를 저장
  };

  const enter = (e) =>{
    if(e.key == 'Enter'){
      e.preventDefault();
      if(keyword.includes(inputContent) || inputContent.trim() === '' ){
        console.log('enter key 눌림 : ', inputContent );
        return;
      }
      setKeyword([...keyword, inputContent]);
      setInputContent('');
    }
  }

  const deleteKeyWord = (index)=>{
    setKeyword(keyword.filter((item, i) => item !== keyword[index]));
    setInputContent('');
  }


  return(
    <>
      <div className="boardList-search-title-wrapper">
        <div className="row justify-content-md-center boardDetail-title-container">
          <div className='row'>
            <div className="col-md-2 boardDetail-category-div">
              <select id="boardDetail-category" onChange={handleBoardDCate} value={bdcateItem}>
                {BoardDetailcategory.map((item) => (
                  <option onClick={(event)=>{setBdcateItem(event.target.value);}} value={item.value} key={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-9 boardDetail-title-input">
              <div className="boardList-search-box-title">
                      <input type="text" className="boardList-search-input-title" placeholder="제목, 내용을 검색해보세요"/>
              </div>
            </div>
            <div className="col-md-2 boardDetail-category-div"></div>
            <div className="col-md-9 boardList-search-input-tag-wrapper">
              <div  className="boardList-search-box-tag" >
                <ul className="searchKeyword-ul">
                  {
                    keyword.map( (item, index) => (
                      <li className="sKeyword" key={index}>
                        {item}
                        <p
                        onClick={() => {deleteKeyWord(index)}} className="boardSearchClose">x</p>
                    
                      </li>
                    ))}
                </ul>
                <input type="text" className="boardList-search-input-tag"  placeholder="태그로 검색해보세요"
                  value={inputContent} onKeyDown={enter} onChange={(e) => setInputContent(e.target.value)}/>
              </div>{/* boardList-search-box-tag */}
            </div>{/* boardList-search-input-tag-wrapper */}
          </div>{/* row */}
        </div> {/* row justify-content-md-center boardDetail-title-container */}    
      </div>{/* boardList-search-title-wrapper */}
    
    </>

  )


}
export default BoardWTitle;