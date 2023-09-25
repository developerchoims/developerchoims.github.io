import './ShopMain.css';
import ControlledCarousel from './shopBanner';
import { Link, useNavigate } from 'react-router-dom';
import HeartIcon from '../heart';
import {useState, useEffect} from 'react';
import axios from 'axios';

const ShopMain = ()=>{

    const userRegion = localStorage.getItem("loginUserRegion");

    const pathMap = {
        'B' : 'cafebakery',
        'L' : 'culture',
        'O' : 'eatout',
        'C' : 'convenient'
        }

    {/*샵 정보 설정 */}
    const [shopList, setShopList] = useState([]);
    {/*샵 리스트 가져오기 - 서버 */}
  const handleShopList = ()=> {
    axios.post('/dasony/api/shopList/', {userRegion:userRegion})
    .then(res => {
        setShopList(res.data.shopList);
    })
    .catch(err => {
        console.log(err);
        alert("다시 시도해주세요.");
    });
    };

{/*상품 정보 불러오기 */}
    {/*베스트 상품 정보 설정 */}
    const [bestProduct, setBestProduct] = useState([]);
    {/*베스트 상품 정보 불러오기 - 서버*/}
    const handleProductBestInfo = () => {
        console.log(bestProduct);
        axios.post("/dasony/api/productBestInfo", {userRegion:userRegion})
        .then(res=>{
            setBestProduct(res.data.product);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }

    useEffect(()=>{
        handleShopList();
        handleProductBestInfo();
    },[userRegion])

    {/*해당 매장으로 이동 */}
    const navigate = useNavigate();
    const handleShopNavi = (s)=>{
        navigate(`/shop/cate/${pathMap[s.shopCate]}/${s.shopName}/product`, {state:{shopOkey:s.shopOkey}});
    }

    return(
        <div className="shop-container">

            <ControlledCarousel/>

            <div className="shop-cate">
                <div className='shop-title'>상품 카테고리</div>
                <div className='cate-box'>
                    <Link to='/shop/cate/cafebakery/main' state={{shopCate:'B'}}>카페<br/>베이커리</Link>
                    <Link to='/shop/cate/eatout/main' state={{shopCate:'O'}} style={{paddingTop:'6.5%'}}>외식</Link>
                    <Link to='/shop/cate/convenient/main' state={{shopCate:'C'}} style={{paddingTop:'6.5%'}}>편의점</Link>
                    <Link to='/shop/cate/culture/main' state={{shopCate:'L'}}>문화<br/>생활</Link>
                </div>
            </div>{/*shop-cate끝*/}

            <div className="shop-title">실시간 Best</div>
            <div className="shopBest-box">
                {
                    bestProduct&&bestProduct.map(p=>{
                        return(
                            
                            <div key={p.productNo} className="shopBest-item">
                                <Link
                                    to={`/shop/cate/${pathMap[p.shopCate]}/${p.shopName}/${p.productName}`} 
                                    state= {{ product: p} }
                                >
                                    <div className="shopBest-item-img">
                                        <img src={p.productImg}></img>
                                    </div>
                                    <div className='shopBest-item-shop'>{p.shopName}</div>
                                    <div className='shopBest-item-product'>{p.productName}</div>
                                </Link>
                                <div className='shopBest-item-point'>{p.productAmount} 다손{" "}<HeartIcon  product={p}/></div>
                            </div>
                        )
                    })
                    .splice(0,4)
                }


            </div>
            <div className="shop-new">
                <div className='shop-title'>새로 입점한 상점 </div>
                <div className='new-box'>
                {
                    shopList.map(s=>{
                                return(
                                    <div key={s.shopOkey} onClick={()=>{handleShopNavi(s);}}>{s.shopName}</div>
                                )
                            }).splice(0, 3)
                }
                  
                </div>
            </div>{/*shop-new끝*/}
            
        </div>//shop-container끝
    );
}

export default ShopMain;