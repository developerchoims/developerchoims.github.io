import { useState } from 'react';
import '../Board/Board.css';
import { Outlet, Link } from 'react-router-dom';

export const ShareHeader = () =>{
  const [keyword, setKeyword] = useState([]);
  const [inputContent, setInputContent] = useState('');

  const handleReset = () => {
    setKeyword([]);
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
          <div className="BoardList-head-title-wrapper">
        <div className="row justify-content-md-center BoardList-head-title">
          <div className="col-md-9 BoardList-head-title-text">나눔 게시판</div>
            <div className="col-3 col-md-3">
              <Link to="/board/share/hwriter" style={{textDecoration:'none'}}>
                <button className="board-li BoardList-head-title-btn" id="hwriter"                                       
                        // onClick={(event)=>{HandleOpacity(event.target.id);}}
                >글쓰기</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center boardList-search-title-wrapper">
          <form action="" method="GET">
            <div className="row">
              <div className="col-md-9 boardList-search-input-title-wrapper">
                <div className="boardList-search-box-title">
                  <input type="text" className="boardList-search-input-title" placeholder="제목, 내용을 검색해보세요"/>
                    <div className="boardList-search-input-title-img-div">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>
                      {/* <i className="bi bi-search boardList-search-input-title-imgcon"></i> */}
                      {/* <img className="boardList-search-input-title-imgcon" src="/resources/img/돋보기아이콘.png"/> */}
                    </div>
                </div>
              </div>
              <div className="col-3 col-md-3">
                <button type="submit" className="boardList-search-btn">검색</button>
              </div>
            </div>
            <div className="row">
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
                <input 
                      type="text" 
                      className="boardList-search-input-tag" 
                      placeholder="태그로 검색해보세요"
                      value={inputContent}
                      onKeyDown={enter}
                      onChange={(e) => setInputContent(e.target.value)}
                      />                 
                </div>
                <div className="boardList-search-input-tag-img-div">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                  </svg>
                  {/* <i className="bi bi-tag-fill boardList-search-input-tag-icon"></i> */}
                  {/* <img className="boardList-search-input-tag-icon" src="/resources/img/태그아이콘.png"/>
                  <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="꼬리표 아이콘">꼬리표 아이콘  제작자: Dave Gandy - Flaticon</a> */}
                </div >
              </div>
              <div className="col-1 col-md-1">
                <button type="button" className="boardList-search-reset-btn" onClick={handleReset}>
                  <img src="/resources/board/ricon.png" className="boardList-search-reset-btn-icon" />
                    <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="주기 아이콘">주기 아이콘  제작자: redempticon - Flaticon</a>
                </button>
              </div>
            </div>
          </form>
        </div>
        <Outlet/>
    </>
  )
}
