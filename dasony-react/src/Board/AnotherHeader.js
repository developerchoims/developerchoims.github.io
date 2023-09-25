import './AnotherHeader.css';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useRecoilState } from 'recoil';
import {boardVsState, boardShState, shareState} from '../atoms';


export const AnotherHeader = () => {

    /*boardTitle, boardKeyword, boardCateNo, userNo 정보 설정 */
    const location = useLocation();

    const [boardCateNo, setBoardCateNo] = useState(
        location.pathname.includes('vwriter')||location.pathname.includes('vs/edit')?1103
        :location.pathname.includes('swriter')||location.pathname.includes('shorts/edit')?1102
        :location.pathname.includes('dwriter')?1101
        :location.pathname.includes('hwriter')||location.pathname.includes('share/edit')?3101
        :0
    );
    const [boardTitle, setBoardTitle] = useState('');
    const [boardKeyword, setBoardKeyword] = useState('');

    const userNo = parseInt(localStorage.getItem('loginUserNo'));

    /*boardVs, boardShorts - atom */
    const [boardVs, setBoardVs] = useRecoilState(boardVsState);
    const [boardSh, setBoardSh] = useRecoilState(boardShState);
    const [share, setShare] = useRecoilState(shareState);
    const handleBoard = (e)=>{
        let {id, value} = e.target;
        if(id=='boardKeyword'){
            value = handleTag(value);
        }
        if(location.pathname.includes('vwriter')||location.pathname.includes('vs/edit')){
            setBoardVs(prev=>({
                ...prev,
                [id]:value,
                boardCateNo : boardCateNo,
                userNo : userNo
            }));
        } else if(location.pathname.includes('swriter')||location.pathname.includes('shorts/edit')){
            setBoardSh(prev=>({
                ...prev,
                [id]:value,
                boardCateNo : boardCateNo,
                userNo : userNo
            }));
        } else if(location.pathname.includes('hwriter')||location.pathname.includes('share/edit')){
            setShare(prev=>({
                ...prev,
                [id]:value,
                boardCateNo : boardCateNo,
                userNo : userNo
            }));
        }
        
    }

    /*boardKeyword - 띄어쓰기를 '_'로 바꿔주기 */
    const handleTag = (e) => {
        let modifiedString = '';
        
        for (let i = 0; i < e.length; i++) {
            const char = e[i];
            if (char === ' ' && (e[i + 1] === ',' || e[i - 1] === ',')) {
              modifiedString += ' ';
            } else if (char === ' ') {
              modifiedString += '_';
            } else {
              modifiedString += char;
            }
          }
        return modifiedString;
    }



    return(
        <div className="another-header-container">

            <div className="another-header-cate">
                {location.pathname.includes('dwriter')||
                location.pathname.includes('swriter')||
                location.pathname.includes('vwriter')
                ?
                (
                    <>
                        <Link to='/board/general/daily/dwriter'>일반 게시글</Link>
                        <Link to='/board/general/daily/vwriter'>투표 게시글</Link> 
                        <Link to='/board/general/daily/swriter'>쇼츠 게시글</Link>
                    </>
                )
                :location.pathname.includes('vs/edit')
                ?
                <span>투표 게시글</span>
                :location.pathname.includes('shorts/edit')
                ?
                <span>쇼츠 게시글</span>
                :location.pathname.includes("share/edit")
                ?
                <span>나눔 게시글</span>
                :
                (
                    <>
                        <Link to='/board/general/daily/hwriter'>나눔 게시글</Link>
                    </>
                )
                }
                
            </div>


            <div className="another-header-box">
                <div className="another-header-title">
                    <input id='boardTitle' placeholder='제목을 입력하세요'
                            onChange={handleBoard} 
                            value={location.pathname.includes('vwriter')||location.pathname.includes('vs/edit')?boardVs?.boardTitle
                                    :location.pathname.includes('swriter')||location.pathname.includes('shorts/edit')?boardSh?.boardTitle
                                    :location.pathname.includes('hwriter')||location.pathname.includes('share/edit')?share?.boardTitle
                                    :''}/>
                </div>
                <div className="another-header-tag">
                    <input id='boardKeyword' placeholder='태그를 입력하세요'
                            onChange={handleBoard} 
                            value={location.pathname.includes('vwriter')||location.pathname.includes('vs/edit')?boardVs?.boardKeyword
                                    :location.pathname.includes('swriter')||location.pathname.includes('shorts/edit')?boardSh?.boardKeyword
                                    :location.pathname.includes('hwriter')||location.pathname.includes('share/edit')?share?.boardKeyword
                                    :''}/>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>

        </div>
    )
}