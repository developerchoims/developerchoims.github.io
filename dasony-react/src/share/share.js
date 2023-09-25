import { useEffect, useState } from 'react';
import HeartIcon from '../heart';
import { Button } from 'react-bootstrap';
import './share.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import BoardHeart from '../Board/BoardHeart';
import Loading from '../common/Loading';


export const Share = () => {

    
    const navigate = useNavigate();
    const [isFilled, setIsFilled] = useState(false);

    const userRegion = localStorage.getItem("loginUserRegion");
    const boardCateNo = 3101;
    const [list, setList] = useState(null);
    const [img, setImg] = useState(null);

    const settingText = (text, n) => {
        return text.length>n?text.substring(0, n-1)+'...':text;
    }

    /*무한 스크롤 */
    const [loading, setLoading] = useState(false);

    const  fetchData =  async ()=>{
        setLoading(true);
        await axios.post("/dasony/api/share", {userRegion:userRegion, boardCateNo:boardCateNo})
        .then(res=>{
            setList(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        });

        await axios.post("/dasony/board/boardImg", 0, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(res=>{
            setImg(res.data);
            console.log(res.data);
          })
          .catch(err=>{
            console.log(err);
          });

          setLoading(false);
    }

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
          fetchData(); // 스크롤 이벤트 감지 시 데이터 가져오기
        }
      };

    useEffect(()=>{
       
        fetchData(); 

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [])

    
  
    return(
        <div className="share-container">
            
            {loading?<Loading/>:
            <>
            <div style={{display:'flex', justifyContent:'right'}}>
            </div>
            <div className="share-content">
                {list&&
                list.map(share=>{
                    return(
                        <Link 
                            key={share.board.boardNo}
                            to={{
                                pathname: `/board/share/list/${share.board.boardNo}`
                            }}
                            >
                            <div key={share.board.boardNo} 
                                    className="share-content-box">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th colSpan={2}>{share.user.userNick}{" "} <span>{share.board.boardWriteDate}</span></th>
                                        </tr>
                                        <tr>
                                            <td className='left-td' rowSpan={2}>
                                                {img&&
                                                img
                                                .filter(i=>(
                                                    i.boardNoRef==share.board.boardNo
                                                    &&
                                                    i.boardImgLevel == 1
                                                ))
                                                .map(i=>(
                                                    <div key={i.boardImgNo} className='share-content-img'>
                                                        <img src={`http://localhost:8083/dasony/resources/images/board/${i.boardImgModName}`}/>
                                                    </div>
                                                ))}
                                            </td>
                                            <td className='right-td'>
                                                <div>
                                                    {settingText(share.board.boardContent, 100)}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='right-td'><div><div><i className="bi bi-chat"/>{share.replyCount}</div><div><BoardHeart boardNo={share.board.boardNo} isFilled={isFilled} setIsFilled={setIsFilled} /></div></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Link>
                        
                    )
                })}
                
                
            </div>
            </>
        }
        </div>
        
    );
}