import './ShopMyCoupon.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import KakaoShare from '../common/KakaoShare';



const ShopMyCoupon = () => {

    const location = useLocation();
    const coupon = location.state.coupon;
    const product = location.state.product;
    console.log(coupon, product);


    return(
        <>
        <div className="shopMyCoupon-container">
            <div className="myCoupon-info">
                <div className='myCoupon-img'>
                    <img src={product.productImg}/>
                </div>
                <div className='myCoupon-info-head'>
                    {product.shopName}
                </div>
                
                <div className='myCoupon-info-middle'>
                    {product.productName}
                </div>
                
            </div>
            <div className="myCoupon-code"> 
                <div>
                    <img src={`http://bwipjs-api.metafloor.com/?bcid=code128&text=${coupon.couponOkey}&scale=3&includetext&backgroundcolor=ffffff`}/>
                </div>
                <span>유효 기간 {coupon.couponExpireDate}까지</span>
                <div>
                    <KakaoShare product={product} coupon={coupon}/>
                </div>
            </div>
            
        </div>
        <div className='coupon-alert1'>쿠폰은 교환, 환불, 연장이 불가능합니다.</div>
        <div className='coupon-alert2'>1+1, 2+1, 덤 증정, 할인 등의 행사 적용은 되지 않을 수 있습니다.</div>
        </>
    );
}

export default ShopMyCoupon;