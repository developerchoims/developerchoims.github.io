import { useEffect, useLayoutEffect, useState } from "react";
import HeartIcon from "../heart";
import { useLocation, useNavigate, useParams ,useOutletContext, Link} from "react-router-dom";
import './ShopCateProduct.css';
import axios from 'axios';


const ShopCateProduct = () => {
    const {shopCate, keyword} = useOutletContext();
    const {store} = useParams();
    const [storeDisplay, setStoreDisplay] = useState('');
    const [storeTitle, setStoreTitle] = useState(store==null?'every':store);
    const location = useLocation();
    const shopOkey = location.state==null?null:location.state.shopOkey;
    const userRegion = localStorage.getItem("loginUserRegion");
    console.log("store",store,"shopOkey",shopOkey);

    const pathMap = {
        'B' : 'cafebakery',
        'L' : 'culture',
        'O' : 'eatout',
        'C' : 'convenient'
        }


{/*상품 정보 불러오기 */}
    {/*상품 정보 설정 */}
    const [product, setProduct] = useState([]);
    {/*상품 정보 불러오기 - 서버*/}
    const handleProductInfo = () => {
        axios.post("/dasony/api/admin/productInfo", {shopOkey:shopOkey, shopCate:shopCate, userRegion:userRegion})
        .then(res=>{
            setProduct(res.data.product);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }

    const navigate = useNavigate();

    const handleNoneStoreName = ()=> setStoreDisplay('none');
    const handleBlockStoreName = () => setStoreDisplay('block');



    useEffect(() => {
        console.log("productShopCate", shopCate);
        handleProductInfo();
        
        if(storeTitle=='every'){
            handleNoneStoreName();
        }else {
            handleBlockStoreName();
        }

    }, [shopCate]);

    
   
    return(
        <div className="shopCate-product-container">
            <div className="shopCate-store-title">
                <div>상품</div>
            </div>
            <div className="title-for-product" style={{display:storeDisplay}}>
                <div>{storeTitle}</div>
            </div>

            <div className="shopBest-box">
                {product&&product.filter(p=>{return(p.productName.includes(keyword))}).map(p=>{
                            return(
                                <div>
                                    <Link
                                            to={`/shop/cate/${pathMap[shopCate]}/${p.shopName}/${p.productName}`}
                                                state= {{product: p }}
                                    >
                                        <div key={p.productNo} className="shopBest-item">
                                            <div className="shopBest-item-img">
                                                <img src= {p.productImg}/>
                                            </div>
                                            <div className='shopBest-item-shop'>{p.shopName}</div>
                                            <div className='shopBest-item-product'>{p.productName}</div>
                                        </div>
                                    </Link>
                                    <div className='shopBest-item-point'>
                                        {p.productAmount} 다손{" "}
                                        <HeartIcon product={p}/>
                                    </div>
                                </div>
                            )
                        })}
                
                    

            </div>{/* shopCate-best-box 끝*/}

        </div>
    );
}

export default ShopCateProduct;