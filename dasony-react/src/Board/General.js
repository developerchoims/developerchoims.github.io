import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const General = ()=>{


    return(
        <div className='Board-origin-container'>
        <Outlet/>
        </div>
    );
}

export default General;