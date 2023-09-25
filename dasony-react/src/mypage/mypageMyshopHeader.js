import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';


const MyShopHeader = () => {
    return(
<div>
    <h2>내 상점</h2>
<div className="mys">
    
            
           <button className='Link-button'><Link to='Likes'>찜한 목록</Link></button>
           <button className='Link-button'><Link to='Point'>포인트 관리</Link></button>
        

           
          </div>
          </div>
    );
}
export default MyShopHeader;

