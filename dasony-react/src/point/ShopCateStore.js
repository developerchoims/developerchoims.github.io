import { useState, useEffect } from 'react';
import './ShopCateStore.css';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const ShopCateStore = () => {

    const navigate = useNavigate();

    const {shopCate, keyword} = useOutletContext();

   const pathMap = {
    'B' : 'cafebakery',
    'L' : 'culture',
    'O' : 'eatout',
    'C' : 'convenient'
    }

    const userRegion = localStorage.getItem("loginUserRegion");

    console.log("shopCate", shopCate, "userRegion", userRegion);

    {/*샵 정보 설정 */}
    const [shopList, setShopList] = useState([]);
    {/*샵 리스트 가져오기 - 서버 */}
    const handleShopList = ()=> {
        if(shopCate){
            axios.post('/dasony/api/shopList/', {userRegion:userRegion, shopCate:shopCate})
            .then(res => {
                setShopList(res.data.shopList);
                console.log(res.data.shopList);
            })
            .catch(err => {
                console.log(err);
                alert("다시 시도해주세요.");
            });
        }
    
    };

    useEffect(()=>{
        handleShopList();
    },[shopCate, keyword])

    
    return(
        <div className="shopCate-store-main">
            <div className="shopCate-store-title">
                <div>상점</div>
            </div>{/* shopCate-box-head 끝*/}

            <div className="shopCate-store-box">
                {
                    shopList?
                    shopList
                    .filter(s=>{
                        return(s.shopName.includes(keyword))
                    }).map(s=>{
                        return(
                                <div><Link to={`/shop/cate/${pathMap[s.shopCate]}/${s.shopName}/product`} state={{shopOkey:s.shopOkey}}>{s.shopName}</Link></div>
                            
                        )
                    }) : ("상점을 준비중입니다.")
                }
            </div>
        </div>
    );
}

export default ShopCateStore;