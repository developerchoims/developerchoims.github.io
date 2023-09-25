import './shopHeader.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


const ShopHeader = () => {
    
    /*userPoint, userName받아오기 */
    let userNo = localStorage.getItem("loginUserNo");
    const [userName, setUserName] = useState('');
    const [userPoint, setUserPoint] = useState('');

    const handleUserInfo = () => {
        axios.post('/dasony/api/userInfo', {userNo: userNo})
        .then(res=>{
            setUserName(res.data.user.userName);
            setUserPoint(res.data.user.totalPoint);
        })
        .catch(err=> {
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }

    useEffect(()=>{
        handleUserInfo();
    }, [userPoint])


    return(
        <>
        <div className='shop-nav'>
            <div className="icon">
                <Link to='/shop/main'><i className="bi bi-shop-window"/></Link>
                <Link to='/shop/best'><i className="bi bi-hand-thumbs-up"/></Link>
                <Link to='/shop/coupon/list'><i className="bi bi-wallet2"/></Link>
                <Link to='/shop/heart'><i className="bi bi-heart"/></Link>
            </div>
            <div className='user-info'>
                <div>
                    <i className="bi bi-person"/><span>{" "}{userName}</span>
                </div>
                <div>
                    <i className="bi bi-coin"/><span>{" "}{userPoint}</span>
                </div>
            </div>
            
        </div>{/*shop-nav끝*/}
        </>
    );
}
export default ShopHeader;
