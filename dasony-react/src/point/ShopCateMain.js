import './ShopCateMain.css';
import HeartIcon from "../heart";
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';


const ShopCateMain = ()=>{
   
    const navigate = useNavigate();

   const {shopCate, keyword} = useOutletContext();

   const pathMap = {
    'B' : 'cafebakery',
    'L' : 'culture',
    'O' : 'eatout',
    'C' : 'convenient'
    }

   console.log("shopCate",shopCate);

   const userRegion = localStorage.getItem("loginUserRegion");

    {/*샵 정보 설정 */}
    const [shopList, setShopList] = useState([]);
    {/*샵 리스트 가져오기 - 서버 */}
    const handleShopList = ()=> {
        if(shopCate){
            axios.post('/dasony/api/shopList/', {userRegion:userRegion, shopCate:shopCate})
            .then(res => {
                setShopList(res.data.shopList);
            })
            .catch(err => {
                console.log(err);
                alert("다시 시도해주세요.");
            });
        }
    
    };

    
    {/*상품 정보 불러오기 */}
    {/*상품 정보 설정 */}
    const [product, setProduct] = useState([]);
    {/*상품 정보 불러오기 - 서버*/}
    const handleProductInfo = async () => {
        if(shopCate){
            axios.post("/dasony/api/admin/productInfo",
             {shopOkey:null, shopCate:shopCate, userRegion:userRegion})
            .then(res=>{
                setProduct(res.data.product);
            })
            .catch(err=>{
                console.log(err);
                alert("다시 시도해주세요.");
            })
        }
        
    }

    

    useEffect(()=>{
        handleShopList();
        handleProductInfo();
    }, [shopCate, userRegion])
   

    return(
        <div className='shopCate-main-container'>

            <div className="shopCate-box-head">
                <div>상점</div>
                <Link to={`/shop/cate/${pathMap[shopCate]}/store`}><div>더 보기</div></Link>
            </div>{/* shopCate-box-head 끝*/}

            <div className="shopCate-store-box">
                
            {
                (shopList==''?
                <span style={{width:'300px',textAlign:'left', fontWeight:900, fontSize:'30px', letterSpacing:'0.2vw'}}>
                    아직 준비중입니다.
                </span>
                :shopList.filter(s=>{return(s.shopName.includes(keyword))})
                        .map(s=>{return(
                            <div key={s.shopOkey}>
                                <Link to={`/shop/cate/${pathMap[s.shopCate]}/${s.shopName}/product`} state={{shopOkey:s.shopOkey}}>{s.shopName}</Link></div>
                        )})
                        .splice(0,4))
            }
                
            </div>{/* shopCate-store-box 끝*/}

            <div className="shopCate-box-head">
                <div>상품</div>
                <Link to={`/shop/cate/${pathMap[shopCate]}/every/product`}><div>더 보기</div></Link>
            </div>{/* shopCate-box-head 끝*/}
            <div className="shopBest-box">
                {
                    product==null?
                    <span style={{width:'300px',textAlign:'left', fontWeight:900, fontSize:'30px', letterSpacing:'0.2vw'}}>
                        아직 준비중입니다.
                    </span>
                    :product.filter(p=>{return (p.productName.includes(keyword)||
                                                p.shopName.includes(keyword))})
                            .map(p=>{return(
                                <div key={p.productNo} className="shopBest-item">
                                    <Link
                                        to={`/shop/cate/${pathMap[shopCate]}/${p.shopName}/${p.productName}`} 
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
                            .splice(0,4)
                }
                    
            </div>{/* shopCate-best-box 끝*/}
        </div>
    );
}

export default ShopCateMain;