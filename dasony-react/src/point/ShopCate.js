import { useLocation, Outlet, useNavigate, useParams } from 'react-router-dom';
import './ShopCate.css';
import HeartIcon from "../heart";
import {useState, useEffect} from 'react';
import ShopCateProduct from './ShopCateProduct';

const ShopCate = ()=>{
    const {product} = useParams();
    const location = useLocation();
    const path = location.pathname;

    const pathMap = {
        'B' : 'cafebakery',
        'L' : 'culture',
        'O' : 'eatout',
        'C' : 'convenient'
    }

    const navigate = useNavigate();

/*카테고리 설정 */
    const [shopCate, setShopCate]= useState(location.state?location.state.shopCate:null);
    const handleShopCateCss = () => {
        const allDivs = document.querySelectorAll('.shopCate-div');
        allDivs.forEach((div) => {
            if(shopCate == div.id){
                div.style.backgroundColor = '#CB9DE7';
                div.style.color = 'white';
                setShopCate(div.id);
            } else {
                div.style.backgroundColor = 'white';
                div.style.color = '#CB9DE7';
            }
            
        });
    }
    const handleNavCate = (e) =>{
        navigate(`/shop/cate/${pathMap[e.target.id]}/main`);
    }

    const handleSetShopCate = ()=>{
        let id = "";
        if(path.includes('eatout')){
            id = 'O';
        } else if(path.includes('cafebakery')){
            id = 'B';
        } else if(path.includes('culture')){
            id = 'L';
        } else if(path.includes('convenient')){
            id = 'C';
        }
        
        setShopCate(id);
        console.log(shopCate);
    }

    {/*검색창 유무 설정 */}
    const [searchDisplay, setSearchDisplay] = useState('block');
    const handleSearchDisplay=() => {
        if(product){
            setSearchDisplay('none');
        }
    }
    useEffect(()=>{
        handleSearchDisplay();
        
        handleSetShopCate();
        
        handleShopCateCss();
    },[shopCate])

/*검색어 설정 */
    const [keyword, setKeyword] = useState('');
    const handleKeyword = (e) => {
        setKeyword(e.target.value);
    }
   
    return(
        <div className="shopCate-container">
            <div className='shopCate-title-box'>
                <div className="shopCate-div" id="B" onClick={handleNavCate}>카페/베이커리</div>
                <div className="shopCate-div" id="O" onClick={handleNavCate}>외식</div>
                <div className="shopCate-div" id="C" onClick={handleNavCate}>편의점</div>
                <div className="shopCate-div" id="L" onClick={handleNavCate}>문화 생활</div>
            </div>{/* shopCate-title-box 끝*/}

            <div className="shopCate-search-box" style={{display:searchDisplay}}>
                <input type="search" onChange={handleKeyword} value={keyword}/>{" "}<input type='button' value='검색'/>
            </div>{/* shopCate-search-box 끝*/}
            <Outlet context={{store:'백년손님', shopCate:shopCate, keyword:keyword}}/>
        </div>/* shopCate-container 끝*/
    );
}

export default ShopCate;