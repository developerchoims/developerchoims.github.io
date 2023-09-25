import { Link, Outlet } from 'react-router-dom';

const Info = ()=>{


    return(
        <div className='Board-origin-container'>
        <Outlet/>
        </div>
    );
}

export default Info;