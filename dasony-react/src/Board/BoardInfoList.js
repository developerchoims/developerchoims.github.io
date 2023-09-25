import {Link} from 'react-router-dom';
import './Board.css';
import SearchAndKeyword from '../SearchAndKeyword';


const BoardinfoList = ()=>{


  return(
    <>
      <div className="BoardList-head-title-wrapper">
        <div className="row justify-content-md-center BoardList-head-title">
          <div className="col-md-9 BoardList-head-title-text">맛집 게시판</div>
            <div className="col-3 col-md-3">
              <Link to="/board/dwriter" style={{textDecoration:'none'}}>
                <button className="board-li BoardList-head-title-btn" id="dwriter"                                       
                        // onClick={(event)=>{HandleOpacity(event.target.id);}}
                >글쓰기</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="boardList-container">
          <SearchAndKeyword/>
        <div className="boardList-list-wrapper">
          <ul className="boardList-list-ul-wrapper">
            <li className="boardList-list-li">
              <div className="boardList-list-wrapper">
                <div className="boardList-list-container">
                    <Link to='/board/general/daily/detail' style={{textDecoration:'none'}}>
                      <div className="boardList-list-content-container">
                          <div className="boardList-list-keyword">날씨</div>
                          <div className="boardList-list-content-title">유기동물 봉사자 찾아요</div>
                          <div className="boardList-list-content">반달이네 유기동물 센터에서 함께 봉사하실 용자를 찾아요. 파티원 모집합니다 지현, 유진, 미선, 정준, 아인 원하시면 당근을 흔들어주세요~ (원양어선 아님)</div>
                          <div className="boardList-list-content-info"><span>박지현</span><span>2023.08.22</span><span>11:50</span></div>
                          <div className="boardList-list-content-action">
                            <span><img src="/resources/common-img/boardImg/비밀번호표시아이콘.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/-" title="비밀번호 표시 아이콘">비밀번호 표시 아이콘  제작자: exomoon design studio - Flaticon</a></span>
                            <span><img src="/resources/common-img/boardImg/빈하트.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="심장 아이콘">심장 아이콘  제작자: Noplubery - Flaticon</a></span>
                            <span><img src="/resources/common-img/boardImg/대화아이콘.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="대화 아이콘">대화 아이콘  제작자: exomoon design studio - Flaticon</a></span></div>
                      </div>
                    </Link>
                    <div className="boardList-list-img">
                      <img src="/resources/common-img/boardImg/지현님슈퍼슈퍼지능.jpg" alt="썸네일" className="board-img"/>
                    </div>
                </div>
              </div>
            </li>
            <li className="boardList-list-li">
              <div className="boardList-list-wrapper">
                <div className="boardList-list-container">
                    <div className="boardList-list-content-container">
                        <div className="boardList-list-keyword">날씨</div>
                        <div className="boardList-list-content-title">유기동물 봉사자 찾아요</div>
                        <div className="boardList-list-content">반달이네 유기동물 센터에서 함께 봉사하실 용자를 찾아요. 파티원 모집합니다 지현, 유진, 미선, 정준, 아인 원하시면 당근을 흔들어주세요~ (원양어선 아님)</div>
                        <div className="boardList-list-content-info"><span>박지현</span><span>2023.08.22</span><span>11:50</span></div>
                        <div className="boardList-list-content-action">
                          <span><img src="/resources/common-img/boardImg/비밀번호표시아이콘.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/-" title="비밀번호 표시 아이콘">비밀번호 표시 아이콘  제작자: exomoon design studio - Flaticon</a></span>
                          <span><img src="/resources/common-img/boardImg/빈하트.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="심장 아이콘">심장 아이콘  제작자: Noplubery - Flaticon</a></span>
                          <span><img src="/resources/common-img/boardImg/대화아이콘.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="대화 아이콘">대화 아이콘  제작자: exomoon design studio - Flaticon</a></span></div>
                    </div>
                    <div className="boardList-list-img">
                      <img src="/resources/common-img/boardImg/지현님슈퍼슈퍼지능.jpg" alt="썸네일" className="board-img"/>
                    </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );

}

export default BoardinfoList;