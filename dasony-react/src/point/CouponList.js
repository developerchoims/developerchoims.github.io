import './CouponList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from "../common/Loading";

const CouponList = () => {
    const userNo = localStorage.getItem("loginUserNo") || 0;

    //회원 정보 불러오기 
    const [userName, setUserName] = useState('');
    const handleUserInfo = () => {
        axios.post('/dasony/api/userInfo', {userNo: userNo})
        .then(res=>{
            setUserName(res.data.user.userName);
        })
        .catch(err=> {
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }

    const statusMap = {
        'Y': '사용 완료',
        'N': '미사용'
    }

    const [couponList, setCouponList] = useState([]);
    const [product, setProduct] = useState([]);

    const handleCouponList = () => {
        axios.post('/dasony/api/couponList', { userNo: userNo })
            .then(res => {
                setCouponList(res.data.couponList);
                setProduct(res.data.productMap.product);
            })
            .catch(err => {
                console.error(err);
                alert("다시 시도해주세요");
            });
    }
    

    //무한 스크롤 이벤트 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;
            
            if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
                fetchData(); // 스크롤 이벤트 감지 시 데이터 가져오기
            }
        };

        const fetchData = async() => {
            setLoading(true);
            await handleUserInfo();
            await handleCouponList();
            setLoading(false);
        }

        fetchData();

        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>        
         {loading?<Loading/>:
        <div className="coupon-container">
            <div className="coupon-title">{userName}님의 쿠폰</div>
            {couponList.length === 0 ? (
                <span style={{ width: '300px', textAlign: 'left', fontWeight: 900, fontSize: '30px', letterSpacing: '0.2vw' }}>
                    아직 준비중입니다.
                </span>
            ) : (
                couponList.map((coupon) => (
                    <div key={coupon.couponNo} className="coupon-list">
                        {product
                            .filter(p => p.productNo === coupon.productNo)
                            .map(p => (
                                <Link key={p.productNo} to={`/shop/coupon/${coupon.couponOkey}`} state={{ coupon: coupon, product:p }}>
                                    <div className="coupon-item">
                                        <div className="coupon-img">
                                            <img src={p.productImg} alt={p.productName} />
                                        </div>
                                        <div className="coupon-info">
                                            <div>{coupon.productName}</div>
                                            <div>{coupon.couponName}</div>
                                        </div>
                                        <div className="coupon-date">{coupon.couponExpireDate}까지</div>
                                        <div className="coupon-use">{statusMap[coupon.couponUseStatus]}</div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                ))
            )}
        </div>}
        </>

    );
}

export default CouponList;