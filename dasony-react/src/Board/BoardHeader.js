import {Link, useLocation} from 'react-router-dom';
import './Board.css';
import { useEffect, useState } from 'react';

const BoardHeader = ()=>{
  const location = useLocation();
  const path = location.pathname;

  const [headerContent, setHeaderContent] = useState(null);

  useEffect(() => {
    if (path.includes('daily')) {
      setHeaderContent(dailyHeader());
    } else {
      setHeaderContent(listHeader());
    }
  }, [path]);


  let dailyHeader = () =>{
    return(
      <>
        <Link to={'/board/general/daily/dwriter'} style={{textDecoration:'none', color: 'black'}}>
          <span className="boardDetail-head-title-text">일반 게시글</span>
        </Link>
        <Link to={'/board/general/daily/vwriter'} style={{textDecoration:'none', color: 'black'}}>
          <span className="boardDetail-head-title-text"> 투표 게시글</span>
        </Link>
        <Link to={'/board/general/daily/swriter'} style={{textDecoration:'none', color: 'black'}}>
          <span className="boardDetail-head-title-text"> 쇼츠 게시글</span>
        </Link>
      </>
    )
  };

  let listHeader = () => {
    return(
      <>
        <Link to={path+'/dwriter'} style={{textDecoration:'none', color: 'black'}}>
          <span className="boardDetail-head-title-text">일반 게시글</span>
        </Link>
      </>
    )
  };


  // let boardPath = path.includes('daily') ? dailyHeader : listHeader;

  // switch(boardPath){
  //   case "dailyHeader" : document.querySelector('.boardDetail-head-title').innerHTML(dailyHeader); return;
  //   case "listHeader" : document.querySelector('.boardDetail-head-title').innerHTML(listHeader); return;
  // }



  return(
    <>
        <div className="boardDetail-head-title">   
        {headerContent}     
        </div>
    </>
  )

}
export default BoardHeader;
