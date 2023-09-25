

import './Home.css';
import { useState, useEffect } from 'react';
import {MainBestCarousel, MainLocalCarousel, MainShortsCarousel, MainVsCarousel} from "./MainBestCarousel";
import Weather from './Weather';
import axios from 'axios';

const Home = () =>{


    const userNo = localStorage.getItem("loginUserNo");
    const userRegion = localStorage.getItem("loginUserRegion");

    /*글자 수 제한 함수  */
    const settingText = (text, n) => {
        return text.length>n?text.substring(0, n-1)+'...':text;
    }

    /*날씨, 베스트 리스트 정보 설정 */
    const [weatherList, setWeatherList] = useState(null);
    /*날씨 리스트 가져오기 - 서버 */
    useEffect(()=>{
        const fetchData = async()=>{
            await axios.post("/dasony/board/weatherList",)
            .then(res=>{ //
                setWeatherList(res.data);
            })
            .catch(err=>{
                console.log(err);
            });
         //?/?
         let a  = 0;   
        }
        fetchData();
    },[])
    return (
        <div className="home-container">
            <div className="home-weather">
               <div className='home-title'>오늘같은 날씨엔...</div> 
               <div className='home-content'>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <div>
                                        <Weather/>
                                    </div>
                                </td>
                                <td>

                                
                                {weatherList && weatherList.length > 0 && weatherList[0].board &&weatherList.filter(weather=>(

                                        weather.user.userRegion == userRegion
                                    )).slice(0, 3).map(weather=>{
                                        return(
                                            weather.boardImg.boardImgModName
                                            ?
                                            <div key={weather.board.boardNo} className='weather-board-info'>
                                                <div>
                                                    <img src={`http://localhost:8083/dasony/${weather.boardImg.boardImgPath}/${weather.boardImg.boardImgModName}`}/>
                                                </div>
                                                <div className='userNick-box' style={{fontSize:'70%'}}>
                                                    {weather.user.userNick}
                                                </div>
                                                <div>
                                                    {settingText(weather.board.boardTitle, 10)}
                                                </div>
                                            </div>
                                            :
                                            <div className='weather-board-info'>
                                                <div>
                                                    <img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/>
                                                </div>
                                                <div style={{fontSize:'70%'}}>
                                                    {weather.user.userNick}
                                                </div>
                                                <div>
                                                    {settingText(weather.board.boardTitle, 10)}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                </td>
                            </tr>
                        </thead>
                    </table>
               </div>
            </div>

            <br/>

            <div className="home-best">
                <div className='home-title'>실시간 인기글 Best</div>
                <div className='home-content'>
                    <MainBestCarousel/>
                </div>
            </div>

            <br/>
            
            <div className="home-shorts">
                <div className='home-title'>다쇼츠</div>
                <div className='home-content'>
                    <MainShortsCarousel/>
                </div>
            </div>

            <br/>

            <div className="home-info">
                <div className='home-title'>우리 지역 소식</div>
                <div className='home-content'>
                    <MainLocalCarousel/>
                </div>
            </div>

            <br/>

            <div className="home-vs">
                <div className='home-title'>다소니 세기의 대결</div>
                <div className='home-content'>
                    <MainVsCarousel/>
                </div>
            </div>
        </div>

    );
        
}
export default Home;