import '../main/UserLocation.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../atoms';
import axios from 'axios';

const MypageChangeLocation = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);
    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    {/*지역 정보 */}
    const [city, setCity] = useState('서울특별시');
    const [ward, setWard] = useState('강남구');
    const [location, setLocation] = useState('서울특별시 강남구');
    console.log(loginUserInfo.userNo);
   

    const handleCity = (event) => setCity(event.target.value);
    const handleWard = (event) => setWard(event.target.value);
    const handleLocation = () => {setLocation(city+" "+ward);console.log("location:", location);}
    
    {/*지역 정보 전달 함수 */}
    const handleLocationSubmit = async() =>{
        await handleLocation();
        axios.post('/dasony/api/location', {location:location==""?"서울특별시 강남구":location, userNo:loginUserNo})
        .then(res=>{
            alert("지역 변경 완료했습니다.");
            window.history.back();
        }).catch(error=>{
            alert("지역설정에 실패했습니다. 다시 시도해주세요.");
            window.location.reload();
        });
    }

    return(
        <div className="userLocation-container">
            <h1>어디로 지역을 변경하시겠습니까?</h1>

            <table>
                <thead>
                <tr>
                    <th>시/도 선택</th>
                    <td>
                        <select onChange={handleCity} value={city==''?'서울특별시':city}>
                            <option>서울특별시</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>구 선택</th>
                    <td>
                        <select onChange={handleWard} onBlur={handleLocation} value={ward==''?'강남구':ward}>
                            <option>강남구</option>
                            <option>강동구</option>
                            <option>관악구</option>
                            <option>노원구</option>
                        </select>
                    </td>
                </tr>
                </thead>
            </table>
            <div><button onClick={handleLocationSubmit}>확인</button></div>
        </div>
    );
}

export default MypageChangeLocation;