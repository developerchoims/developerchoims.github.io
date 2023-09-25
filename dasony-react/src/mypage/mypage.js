import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MypageHeader from './mypageHeader';




const Mypage = ()=>{

    return(
        <div className='Mypage'>
        <MypageHeader/>
        <Outlet/>
        </div>
    );
}

export default Mypage;