
import ShopHeader from './shopHeader';
import ControlledCarousel from './shopBanner';
import HeartIcon from '../heart';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ShopBest from './shopBest';
import './shop.css';

const Shop = ()=>{


    return(
        <div className='shop-origin-container'>
        <ShopHeader/>
        <Outlet/>
        </div>
    );
}

export default Shop;