import './shopBest.css';
import HeartIcon from '../heart';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';

const ShopHeart = ()=>{
    const userRegion = localStorage.getItem("loginUserRegion");
    const userNo = localStorage.getItem("loginUserNo");

    const pathMap = {
        'B' : 'cafebakery',
        'L' : 'culture',
        'O' : 'eatout',
        'C' : 'convenient'
    }

    {/*회원 정보 불러오기 */}
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


{/*상품 정보 불러오기 */}
    {/*상품 정보 설정 */}
    const [product, setProduct] = useState(null);
    
    useEffect(()=>{
    handleUserInfo();
        {/*상품 정보 불러오기 - 서버*/}
    const handleProductInfo = () => {
        axios.post("/dasony/api/productCareInfo", {userNo:userNo})
        .then(res=>{
            console.log("허어",res.data.product);
            setProduct(res.data.product);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요.");
        });
    };
            handleProductInfo();
    }, [userNo])

    return(
        <div className="shopBest-container">
            <div className="shopBest-title">{userName}님의 마음에 든 상품</div>
            <div className="shopBest-box">
            {
                    !product?
                    <span style={{width:'300px',textAlign:'left', fontWeight:900, fontSize:'30px', letterSpacing:'0.2vw'}}>
                        아직 준비중입니다.
                    </span>
                    :product.map(p=>{return(
                                <div key={p.productNo} className="shopBest-item">
                                    <Link
                                        to={`/shop/cate/${pathMap[p.shopCate]}/${p.shopName}/${p.productName}`} 
                                        state= {{ product: p} }
                                    >
                                        <div className="shopBest-item-img">
                                            {p.productImg.map(pro=>{return(
                                                <img src={pro}/>
                                            )})}
                                        </div>
                                        <div className='shopBest-item-shop'>{p.shopName}</div>
                                        <div className='shopBest-item-product'>{p.productName}</div>
                                    </Link>
                                    <div className='shopBest-item-point'>
                                        {p.productAmount} 다손{" "}
                                        <span style={{color:'#CB9DE7'}}><HeartIcon product={p}/></span>
                                    </div>
                                </div>
                            )})
                }
                
            </div>
        </div>
    );
}

export default ShopHeart;