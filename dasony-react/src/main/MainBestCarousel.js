import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import './MainBestCarousel.css';
import { useRecoilState } from 'recoil';
import { bestListState, shortsListState, vsListState, localListState } from '../atoms';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const MainBestCarousel = () =>{
    const boardCateMap = {
        1101 : '../board/general/daily/detail/',
        1102 : '../board/general/daily/shorts/detail/',
        1103 : '../board/general/daily/vs/detail/',
        1104 : '../board/general/daily/detail/',
        1201 : '../board/general/interest/detail/',
        1202 : '../board/general/interest/detail/',
        1203 : '../board/general/interest/detail/',
        1204 : '../board/general/interest/detail/',
        2101 : '../board/info/jmt/detail/',
        2102 : '../board/info/jmt/detail/',
        2103 : '../board/info/jmt/detail/',
        2104 : '../board/info/jmt/detail/',
        2201 : '../board/info/fashion/detail/',
        2202 : '../board/info/fashion/detail/',
        2203 : '../board/info/fashion/detail/',
        2204 : '../board/info/fashion/detail/',
        2301 : '../board/info/local/detail/',
        2302 : '../board/info/local/detail/',
        2303 : '../board/info/local/detail/',
        2304 : '../board/info/local/detail/',
        3101 : '../board/share/list/detail/'
    }

    /*글자 수 제한 함수  */
    const settingText = (text, n) => {
        return text.length>n?text.substring(0, n-1)+'...':text;
    }
    const userNo = localStorage.getItem("loginUserNo");
    const userRegion = localStorage.getItem("loginUserRegion");

    const [index, setIndex] = useState(0);

    const [bestList, setBestList] = useRecoilState(bestListState);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(()=>{
        const fetchData = async()=>{
            
            await axios.post("/dasony/board/bestList")
            .then(res=>{
                setBestList(res.data);
            })
            .catch(err=>{
                console.log(err);
            });
            
        }

        fetchData();
    },[])

    return(
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <div className='home-best-carousel'>
            {
                bestList && bestList.length > 0 && bestList[0].board &&bestList.filter(best=>(
                    best.user.userRegion == userRegion
                )).slice(0,3).map(best=>(
                    <Link key={best.board.boardNo}  to={boardCateMap[best.board.boardCateNo]+best.board.boardNo}>
                        
                    <div key={best.board.boardNo} className='home-best-box'>
                        <div style={{height:'9vw', width:'9vw',overflow:'hidden'}}>
                            {
                                best.boardVideo.videoModName&&best.boardImg.boardImgModName
                                ?
                                <>
                                    <img src={`http://localhost:8083/dasony${best.boardImg.boardImgPath}/${best.boardImg.boardImgModName}`}/>
                                </> 
                                :!best.boardVideo.videoModName&&best.boardImg.boardImgModName
                                ?
                                <>
                                    <img src={`http://localhost:8083/dasony${best.boardImg.boardImgPath}/${best.boardImg.boardImgModName}`}/>
                                </>
                                :best.boardVideo.videoModName&&!best.boardImg.boardImgModName
                                ?
                                <>
                                    <video id="vid" controls className="board-video">
                                        <source src={`http://localhost:8083/dasony${best.boardVideo.videoPath}${best.boardVideo.videoModName}`} type="video/mp4" />
                                    </video>
                                </>
                                :
                                <>
                                    <img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/>
                                </>
                            }
                        </div>
                        <div style={{fontSize:'100%'}} className='best-text-box'>
                            <div className='best-user-text'>
                                {settingText(best.user.userNick,8)}
                            </div>
                            <div className='best-title-text'>
                                {settingText(best.board.boardTitle,8)}
                            </div>
                        </div>
                    </div>
                    </Link>
                ))
            }
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className='home-best-carousel'>

            {
                bestList && bestList.length > 0 && bestList[0].board &&bestList.filter(best=>(
                    best.user.userRegion == userRegion
                )).slice(3,6).map(best=>(
                    <Link key={best.board.boardNo} to={
                        best.board.boardCateNo == '1103'
                        ?
                        '../board/general/daily/vs/detail/'+best.board.boardNo
                        :
                        best.board.boardCateNo == '1102'?
                        '../board/general/daily/shorts/detail/'+best.board.boardNo
                        :
                        best.board.boardCateNo == '3101'?
                        '../board/share/list/'+best.board.boardNo
                        :
                        '../board/share/list/'+best.board.boardNo
                    }>
                    
                    <div className='home-best-box'>
                        <div style={{height:'9vw', width:'9vw',overflow:'hidden'}}>
                            {
                                best.boardVideo.videoModName&&best.boardImg.boardImgModName
                                ?
                                <>
                                    <img src={`http://localhost:8083/dasony${best.boardImg.boardImgPath}/${best.boardImg.boardImgModName}`}/>
                                </> 
                                :!best.boardVideo.videoModName&&best.boardImg.boardImgModName
                                ?
                                <>
                                    <img src={`http://localhost:8083/dasony${best.boardImg.boardImgPath}/${best.boardImg.boardImgModName}`}/>
                                </>
                                :best.boardVideo.videoModName&&!best.boardImg.boardImgModName
                                ?
                                <>
                                    <video id="vid" controls className="board-video" autoPlay loop muted>
                                        <source src={`http://localhost:8083/dasony${best.boardVideo.videoPath}${best.boardVideo.videoModName}`} type="video/mp4" />
                                    </video>
                                </>
                                :
                                <>
                                    <img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/>
                                </>
                            }
                        </div>
                            <div style={{fontSize:'100%'}} className='best-text-box'>
                                <div className='best-user-text'>
                                    {settingText(best.user.userNick,8)}
                                </div>
                                <div className='best-title-text'>
                                    {settingText(best.board.boardTitle,8)}
                                </div>
                            </div>
                    </div>
                    </Link>
                ))
            }
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

const MainLocalCarousel = () =>{

    const boardCateMap = {
        1101 : '../board/general/daily/detail/',
        1102 : '../board/general/daily/shorts/detail/',
        1103 : '../board/general/daily/vs/detail/',
        1104 : '../board/general/daily/detail/',
        1201 : '../board/general/interest/detail/',
        1202 : '../board/general/interest/detail/',
        1203 : '../board/general/interest/detail/',
        1204 : '../board/general/interest/detail/',
        2101 : '../board/info/jmt/detail/',
        2102 : '../board/info/jmt/detail/',
        2103 : '../board/info/jmt/detail/',
        2104 : '../board/info/jmt/detail/',
        2201 : '../board/info/fashion/detail/',
        2202 : '../board/info/fashion/detail/',
        2203 : '../board/info/fashion/detail/',
        2204 : '../board/info/fashion/detail/',
        2301 : '../board/info/local/detail/',
        2302 : '../board/info/local/detail/',
        2303 : '../board/info/local/detail/',
        2304 : '../board/info/local/detail/',
        3101 : '../board/share/list/detail/'
    }

/*글자 수 제한 함수  */
const settingText = (text, n) => {
    return text.length>n?text.substring(0, n-1)+'...':text;
}
    const userNo = localStorage.getItem("loginUserNo");
    const userRegion = localStorage.getItem("loginUserRegion");

    const [index, setIndex] = useState(0);

    const [localList, setLocalList] = useRecoilState(localListState);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(()=>{
        const fetchData = async()=>{
            
            await axios.post("/dasony/board/localList")
            .then(res=>{
                setLocalList(res.data);
            })
            .catch(err=>{
                console.log(err);
            });
            
        }

        fetchData();
    },[])


    return(
        <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <div className='local-carousel'>
                            {
                                localList && localList.length > 0 && localList[0].board &&localList.filter(local=>(
                                    local.user.userRegion == userRegion
                                ))
                                .slice(0,3)
                                .map(local=>(
                                    <Link key={local.board.boardNo} to={boardCateMap[local.board.boardCateNo]+local.board.boardNo}>
                                    <div className='local-box'>
                                        
                                        <div className='local-box-img'>
                                            {
                                                local.boardVideo.videoModName&&local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <img src={`http://localhost:8083/dasony${local.boardImg.boardImgPath}/${local.boardImg.boardImgModName}`}/>
                                                </> 
                                                :!local.boardVideo.videoModName&&local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <img src={`http://localhost:8083/dasony${local.boardImg.boardImgPath}/${local.boardImg.boardImgModName}`}/>
                                                </>
                                                :local.boardVideo.videoModName&&!local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <video id="vid" controls className="board-video" autoPlay loop>
                                                        <source src={`http://localhost:8083/dasony${local.boardVideo.videoPath}${local.boardVideo.videoModName}`} type="video/mp4" />
                                                    </video>
                                                </>
                                                :
                                                <>
                                                    <img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/>
                                                </>
                                            }
                                        </div>
                                        <div className='local-box-text'>
                                            <div className='local-box-nick-text'>
                                                {settingText(local.user.userNick,8)}
                                            </div>
                                            <div className='local-box-content-text'>   
                                                {settingText(local.board.boardTitle,14)}
                                            </div>
                                        </div >
                                    </div>
                                    </Link>
                                ))
                            }
                            </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='local-carousel'>
                            {
                                localList && localList.length > 0 && localList[0].board &&localList.filter(local=>(
                                    local.user.userRegion == userRegion
                                ))
                                .slice(3,6)
                                .map(local=>(
                                    <Link key={local.board.boardNo} to={
                                        local.board.boardCateNo == '1103'
                                        ?
                                        '../board/general/daily/vs/detail/'+local.board.boardNo
                                        :
                                        local.board.boardCateNo == '1102'
                                        ?
                                        '../board/general/daily/shorts/detail/'+local.board.boardNo
                                        :
                                        local.board.boardCateNo == '3101'
                                        ?
                                        '../board/share/list/'+local.board.boardNo
                                        :
                                        local.board.boardCateNo == '2101'||local.board.boardCateNo == '2102'||
                                        local.board.boardCateNo == '2103'||local.board.boardCateNo == '2104'
                                        ?
                                        '../board/info/jmt/detail/'+local.board.boardNo
                                        :
                                        local.board.boardCateNo == '2201'||local.board.boardCateNo == '2202'||
                                        local.board.boardCateNo == '2203'||local.board.boardCateNo == '2204'
                                        ?
                                        '../board/info/fashion/detail/'+local.board.boardNo
                                        :
                                        '../board/info/local/detail/'+local.board.boardNo
                                    }>
                                    <div className='local-box'>
                                        <div className='local-box-img'>
                                            {
                                                local.boardVideo.videoModName&&local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <img src={`http://localhost:8083/dasony${local.boardImg.boardImgPath}/${local.boardImg.boardImgModName}`}/>
                                                </> 
                                                :!local.boardVideo.videoModName&&local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <img src={`http://localhost:8083/dasony${local.boardImg.boardImgPath}/${local.boardImg.boardImgModName}`}/>
                                                </>
                                                :local.boardVideo.videoModName&&!local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <video id="vid" controls className="board-video" autoPlay loop>
                                                        <source src={`http://localhost:8083/dasony${local.boardVideo.videoPath}${local.boardVideo.videoModName}`} type="video/mp4" />
                                                    </video>
                                                </>
                                                :
                                                <>
                                                    <img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/>
                                                </>
                                            }
                                        </div>
                                        <div className='local-box-text'>
                                            <div className='local-box-nick-text'>
                                                {settingText(local.user.userNick,8)}
                                            </div>
                                            <div className='local-box-content-text'>   
                                                {settingText(local.board.boardTitle,14)}
                                            </div>
                                        </div >
                                    </div>
                                    </Link>
                                ))
                            }
                            </div>
                    </Carousel.Item>
        </Carousel>
    );
}

const MainShortsCarousel = () => {

    /*글자 수 제한 함수  */
    const settingText = (text, n) => {
        return text.length>n?text.substring(0, n-1)+'...':text;
    }
    const userNo = localStorage.getItem("loginUserNo");
    const userRegion = localStorage.getItem("loginUserRegion");

    const navigate = useNavigate();
    const [shortsList, setShortsList] = useRecoilState(shortsListState);
    const [index, setIndex] = useState(0);

    const [left, setLeft] = useState(0);
    const handleLeft = () => {
        if(-40<left && left< -30){
            setLeft(0);
        } else {
            setLeft(left-12.8);
            console.log(left);
        }
    }
    const handleRight = () => {
        if(-10<left && left <15 ){
            setLeft(0);
        } else {
            setLeft(left+12.8);
            
            console.log(left);
        }
    }

    const handleNav = (id) => {
        let url = '../board/general/daily/shorts/detail/'+id;

        navigate(url);
                                        
    }


    useEffect(()=>{
        const fetchData = async()=>{
            
            await axios.post("/dasony/board/shortsList")
            .then(res=>{
                setShortsList(res.data);
                setIndex(shortsList.length);
            })
            .catch(err=>{
                console.log(err);
            });
            
        }

        fetchData();
    },[])


    return(
        <div className='mainShorts-container'>
            <span className='carousel-btn-left' onClick={handleRight}>
                    {"<"}
            </span>
            
            {shortsList?.[0]?.board?.boardNo&&shortsList?.filter(shorts=>(
                    shorts.user.userRegion == userRegion
                )).slice(0, 6).map(shorts=>{
                return(
                    <div id={shorts.board.boardNo}
                         key={shorts.board.boardNo} 
                         onClick={()=>handleNav(shorts.board.boardNo)}
                         className='mainShorts-box' style={{left:`${left}vw`}}>
                        <div>
                        <video id="vid" controls className="board-video" muted autoplay>
                            <source src={`http://localhost:8083/dasony${shorts.boardVideo.videoPath}${shorts.boardVideo.videoModName}`} type="video/mp4" />
                        </video>
                        </div>
                        <div>
                            <div style={{textAlign:'center', fontSize:'1vw', padding:'0.5vw'}}>
                                <div className='shorts-box-nick-text'>
                                    {settingText(shorts.user.userNick, 8)}
                                </div>
                                <div>
                                    {settingText(shorts.board.boardTitle, 8)}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <span className='carousel-btn-right' onClick={handleLeft}>
                {">"}
            </span>
        </div>
        
    );
}

const MainVsCarousel = () => {

    const navigate = useNavigate();

    /*글자 수 제한 함수  */
    const settingText = (text, n) => {
        return text.length>n?text.substring(0, n-1)+'...':text;
    }
    const userNo = localStorage.getItem("loginUserNo");
    const userRegion = localStorage.getItem("loginUserRegion");


    const [vsList, setVsList] = useRecoilState(vsListState);
    const [index, setIndex] = useState(0);
    const [left, setLeft] = useState(0);

    const handleLeft = () => {
        let changedLeft = 0;
        if(-18*4<left&& left<=-18*3){
            changedLeft = 0;
            setLeft(changedLeft);
        } else {
            changedLeft = left-19.25;
            setLeft(left-19.25);
        }
    }
    const handleRight = () => {
        let changedLeft = 0;
        if(-17<=left && left<17){
            changedLeft = 0;
            setLeft(changedLeft);
        } else {
            changedLeft=left+19.25;
            setLeft(changedLeft);
        }
    }

    const handleNav = (id) => {
        let url = '../board/general/daily/vs/detail/'+id;

        navigate(url);
                                        
    }
    

    useEffect(()=>{
        const fetchData = async()=>{
            
            await axios.post("/dasony/board/vsList")
            .then(res=>{
                setVsList(res.data);
                setIndex(vsList.length);
            })
            .catch(err=>{
                console.log(err);
            });
            
        }

        fetchData();
    },[])

    return(
        <div className='mainVs-container'>
            <span className='vs-carousel-btn-left' onClick={handleRight}>
                {"<"}
            </span>
            
            {vsList && vsList.length > 0 && vsList[0].boardVs &&vsList.filter(vs=>(
                    vs?.user.userRegion == userRegion
                )).slice(0, 6).map(vs=>{
                return(
                    <div key={vs?.boardVs.boardNo} 
                        onClick={()=>handleNav(vs.boardVs.boardNo)}
                        className='mainVs-box' style={{left:(left+'vw')}}>
                        <span>{settingText(vs.boardVs.boardTitle, 8)}</span><br/>
                        <div>
                            <div>
                                {vs.boardVs.boardOptionLeft} 
                            </div>
                            <div>VS</div>
                            <div>
                                {vs.boardVs.boardOptionRight} 
                            </div>
                        </div>
                    </div>
                )
            })}
            <span className='vs-carousel-btn-right' onClick={handleLeft}>
                {">"}
            </span>
        </div>
        
    );
}


export {MainBestCarousel, MainLocalCarousel, MainShortsCarousel, MainVsCarousel};