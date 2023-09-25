import './App.css';
import Header from './common/Header';
import {Outlet, Route, Routes, useLocation, Navigate} from 'react-router-dom';
import {AnimatePresence} from "framer-motion";
import Home from './main/Home';
import Shop from './point/shop';
import ShopBest from './point/shopBest';
import Coupon from './point/Coupon';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import PlzLogin from './main/PlzLogin';
import SignUp from './main/signUp';
import React, {Component, Fragment} from 'react';
import Finding from './main/Finding';
import ShopHeart from './point/ShopHeart';
import ShopCate from './point/ShopCate';
import ShopMain from './point/ShopMain';
import ShopCateMain from './point/ShopCateMain';
import ShopCateStore from './point/ShopCateStore';
import ShopCateProduct from './point/ShopCateProduct';
import ShopProductDetail from './point/ShopProductDetail';
import ShopMyCoupon from './point/ShopMyCoupon';
import CouponList from './point/CouponList';
import UserLocation from './main/UserLocation';
import BoardDailyList from './Board/BoardDailyList';
import Board from './Board/Board';
import BoardDailyWriter from './Board/BoardDailyWriter';
import BoardShortsUploader from './Board/BoardShortsUploader';
import BoardDetail from './Board/BoardDetail';
import General from './Board/General';
import Info from './Board/Info';
import HomeSide from './main/HomeSide';
import AdminShop from './admin/shop/adminShop';
import { AdminShopDetail } from './admin/shop/adminShopDetail';
import { AdminUser } from './admin/user/adminUser';
import { AdminUserDetail } from './admin/user/adminUserDetail';
import { AdminCalendar } from './admin/board/adminCalendar';
import Mypage from './mypage/mypage';
import MypageAlert from './mypage/mypageAlert';
import { RecoilEnv } from 'recoil';
import BoardEdit from './Board/BoardEdit';
import { Share } from './share/share';
import { ShopMyCouponImg } from './point/ShopMyCouponImg';
import {VoteWrite} from './Board/VoteWrite';
import { AnotherHeader } from './Board/AnotherHeader';
import { ShareHeader } from './share/ShareHeader';
import { ShareWriter } from './Board/ShareWriter';
import { VoteEdit } from './Board/VoteEdit';
import { ShortsEdit } from './Board/ShortsEdit';
import MypageChangeLocation from './mypage/mypageChangeLocation';



RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

//로그인 확인 - PrivateRoute
export let isLogin = localStorage.getItem("loginUserNo")?true:false;
console.log("APP확인", isLogin);
  export const PrivateRoute =() =>{
    const location = useLocation();
    if(isLogin&&!isAdmin){
      return <Outlet/>;
    } else if(isLogin&&isAdmin){
      return <Navigate to="/admin/shop"/>;
    }else {
      return <Navigate to="/"/>;
    }
  }

//관리자 확인 - AdminRoute
  const isAdmin = localStorage.getItem("loginUserLevel")=='Z'?true:false;

  export const AdminRoute = () => {
    return isAdmin?<Outlet/> : <Navigate to="/"/>;
  }

function App() {

  const location = useLocation();
  
  return (

    <>
    <Header/>

    
      

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>

                  {/* 로그인 안 된 경우 */}
                  {/* 메인페이지 부분 */}
              
                  <Route path="/" element={
                                            <div className="main-container">
                                              <PlzLogin/>
                                              <PrivateRoute/>
                                            </div>
                                          }/>
                
                  

                  {/* 로그인 된 경우 */}
                  {/*관리자로 로그인 한 경우 */}
                

                <Route element = {<AdminRoute/>}>
                  <Route path="/admin/shop" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminShop/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>
                  <Route path="/admin/shop/:shopOkey" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminShopDetail/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>   
                  <Route path="/admin/user" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminUser/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>                                                       
                  <Route path="/admin/user/:userNo" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminUserDetail/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>   
                  <Route path="/admin/calendar" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                            <AdminCalendar/>
                                                                        </motion.div></div></div>}/>
                </Route>

                                                                        
                  {/* 메인페이지 부분 */}
                <Route element={<PrivateRoute/>}>
                  <Route path="/main" element={<motion.div
                                                initial = {{opacity:0, y:30}}
                                                animate = {{opacity:1, y:0}}
                                                end = {{opacity:1, y:0}}
                                                transition={{duration : 1}}>
                                              <div className="for-main">
                                                <div id="main-window">
                                                  <Home/>
                                                </div>
                                                <div id="right-window">
                                                  <HomeSide/>
                                                </div>
                                              </div>
                                              </motion.div>
                                          }/>
                </Route>

                  <Route path="/signUp" element={<motion.div
                                                      initial = {{opacity:0, x:30}}
                                                      animate = {{opacity:1, x:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                    <div className="main-container">
                                                      <SignUp/>
                                                    </div>
                                                    </motion.div>
                                                  }/>
                  <Route path="/location" element={<motion.div
                                                      initial = {{opacity:0, x:30}}
                                                      animate = {{opacity:1, x:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                    <div className="main-container">
                                                      <UserLocation/>
                                                    </div>
                                                    </motion.div>
                                                  }/>
                  <Route path="/finding" element={<motion.div
                                                      initial = {{opacity:0, x:30}}
                                                      animate = {{opacity:1, x:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                    <div className="main-container">
                                                      <Finding/>
                                                    </div>
                                                    </motion.div>
                                                  }/>

                  {/*메인페이지 외 부분*/ }
               
                  {/*shop 중첩 route 시작 */}
                <Route element={<PrivateRoute/>}>
                  <Route path="/shop/*" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Shop/>
                                                                        </motion.div></div></div>}>
                      <Route path="main" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <ShopMain/>
                                                    </motion.div>}/>
                      <Route path="best" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <ShopBest/>
                                                    </motion.div>}/>
                             
                      <Route path="coupon/list/*" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <CouponList/>
                                                      </motion.div>}/>  
                      <Route path="coupon/:id" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopMyCoupon/>
                                                      </motion.div>}/> 
                      <Route path="coupon/:id/img" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopMyCouponImg/>
                                                      </motion.div>}/>
                      {/*coupon중첩 route 끝 */}


                      <Route path="heart" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopHeart/>
                                                      </motion.div>}/>
                      <Route path="cate/*" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopCate/>
                                                      </motion.div>}>
                        {/*shopCate 중첩 route 시작 */}
                        <Route path=":cate/main" element={<ShopCateMain/>}/>
                        <Route path=":cate/store" element={<ShopCateStore/>}/>
                        <Route path=':cate/:store/product' element={<ShopCateProduct/>}/>
                        <Route path=':cate/every/product' element={<ShopCateProduct/>}/>
                        <Route path=":cate/:store/:product" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopProductDetail/>
                                                      </motion.div>}/>
                      </Route>
                    </Route>{/*shop 중첩 route 끝 */}  
                  </Route>



                

                  {/*Board 중첩 route 시작 */}
                <Route element={<PrivateRoute/>}>
                  <Route path="/board/*" element={<div className=".for-main">

                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Board/>
                                                                        </motion.div></div></div>}>
                      <Route path="share/hwriter" element={<motion.div
                                                              initial = {{opacity:0, y:30}}
                                                              animate = {{opacity:1, y:0}}
                                                              end = {{opacity:1, y:0}}
                                                              transition={{duration : 1}}>
                                                                <ShareWriter/>
                                                              </motion.div>}/>
                      <Route path="general/*" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <General/>
                                                    </motion.div>}>
                          <Route path="daily/" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                           <BoardDailyList/>
                                                        </motion.div>}/>
                                <Route path="daily/dwriter" element={<motion.div
                                                              initial = {{opacity:0, y:30}}
                                                              animate = {{opacity:1, y:0}}
                                                              end = {{opacity:1, y:0}}
                                                              transition={{duration : 1}}>
                                                                <BoardDailyWriter/>
                                                              </motion.div>}/>
                                <Route path="daily/*" element={<motion.div
                                                              initial = {{opacity:0, y:30}}
                                                              animate = {{opacity:1, y:0}}
                                                              end = {{opacity:1, y:0}}
                                                              transition={{duration : 1}}>
                                                                <AnotherHeader/>
                                                              </motion.div>}>
                                  <Route path="vwriter" element={<motion.div
                                                              initial = {{opacity:0, y:30}}
                                                              animate = {{opacity:1, y:0}}
                                                              end = {{opacity:1, y:0}}
                                                              transition={{duration : 1}}>
                                                                <VoteWrite/>
                                                              </motion.div>}/>
                                  <Route path="swriter" element={<motion.div
                                                              initial = {{opacity:0, y:30}}
                                                              animate = {{opacity:1, y:0}}
                                                              end = {{opacity:1, y:0}}
                                                              transition={{duration : 1}}>
                                                                <BoardShortsUploader/>
                                                              </motion.div>}/>
                                </Route>
                                
                                <Route path="daily/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/>
                                <Route path="daily/vs/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/>
                                <Route path="daily/shorts/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/>
                                <Route path="daily/edit/:boardNo/:boardCateNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardEdit/>
                                                                              </motion.div>}/>
                                <Route path="daily/vs/edit/*" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <AnotherHeader/>
                                                                              </motion.div>}>
                                  <Route path=":boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <VoteEdit/>
                                                                              </motion.div>}/>
                                </Route>
                                                                              
                                <Route path="daily/shorts/edit/*" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <AnotherHeader/>
                                                                              </motion.div>}>
                                  <Route path=":boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <ShortsEdit/>
                                                                              </motion.div>}/>                           
                                </Route>                   
                          <Route path="interest/" element={<motion.div
                                                          initial = {{opacity:0, y:30}}
                                                          animate = {{opacity:1, y:0}}
                                                          end = {{opacity:1, y:0}}
                                                          transition={{duration : 1}}>
                                                            <BoardDailyList/>
                                                          </motion.div>}/>        
                                <Route path="interest/dwriter" element={<motion.div
                                                                initial = {{opacity:0, y:30}}
                                                                animate = {{opacity:1, y:0}}
                                                                end = {{opacity:1, y:0}}
                                                                transition={{duration : 1}}>
                                                                  <BoardDailyWriter/>
                                                                </motion.div>}/>
                                <Route path="interest/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/> 
                                <Route path="interest/edit/:boardNo/:boardCateNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardEdit/>
                                                                              </motion.div>}/>                    
                      </Route>
                      <Route path="info/*" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <Info/>
                                                    </motion.div>}>
                          <Route path="jmt/" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <BoardDailyList/>
                                                      </motion.div>}/>
                                <Route path="jmt/dwriter" element={<motion.div
                                                                initial = {{opacity:0, y:30}}
                                                                animate = {{opacity:1, y:0}}
                                                                end = {{opacity:1, y:0}}
                                                                transition={{duration : 1}}>
                                                                  <BoardDailyWriter/>
                                                                </motion.div>}/>
                                <Route path="jmt/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/>  
                                <Route path="jmt/edit/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardEdit/>
                                                                              </motion.div>}/>    
                          <Route path="fashion/" element={<motion.div
                                                          initial = {{opacity:0, y:30}}
                                                          animate = {{opacity:1, y:0}}
                                                          end = {{opacity:1, y:0}}
                                                          transition={{duration : 1}}>
                                                            <BoardDailyList/>
                                                          </motion.div>}/>
                                    <Route path="fashion/dwriter" element={<motion.div
                                                                    initial = {{opacity:0, y:30}}
                                                                    animate = {{opacity:1, y:0}}
                                                                    end = {{opacity:1, y:0}}
                                                                    transition={{duration : 1}}>
                                                                      <BoardDailyWriter/>
                                                                    </motion.div>}/>
                                    <Route path="fashion/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/>    
                                    <Route path="fashion/edit/:boardNo/:boardCateNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardEdit/>
                                                                              </motion.div>}/>  
                          <Route path="local/" element={<motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <BoardDailyList/>

                                                                        </motion.div>}/> 
                                <Route path="local/dwriter" element={<motion.div
                                                                initial = {{opacity:0, y:30}}
                                                                animate = {{opacity:1, y:0}}
                                                                end = {{opacity:1, y:0}}
                                                                transition={{duration : 1}}>
                                                                  <BoardDailyWriter/>
                                                                </motion.div>}/>  
                                <Route path="local/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/> 
                                <Route path="local/edit/:boardNo/:boardCateNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardEdit/>
                                                                              </motion.div>}/>                                   
                    </Route>
                    {/*share중첩 시작 */}
                    <Route path="share/*" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <ShareHeader/>
                                                    </motion.div>}>
                      <Route path="list" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <Share/>
                                                    </motion.div>}/>


                    </Route>{/*share중첩 끝 */}
                    <Route path="share/list/:boardNo" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <BoardDetail/>
                                                    </motion.div>}/>

                  </Route>
                </Route>{/*Board 중첩 route 끝 */}


                    {/*mypage 중첩 route 시작 */}
                  <Route element={<PrivateRoute/>}>
                        <Route path="/MypageChangeLocation" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <MypageChangeLocation/>
                                                      </motion.div>}/>                                
                    <Route path="/mypage/*" element={<div className=".for-main">
                                                  <div className='for-normal-page'><motion.div
                                                                          initial = {{opacity:0, y:30}}
                                                                          animate = {{opacity:1, y:0}}
                                                                          end = {{opacity:1, y:0}}
                                                                          transition={{duration : 1}}>
                                                                            <Mypage/>
                                                                          </motion.div></div></div>}>
                        <Route path="Info/*" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <MypageAlert/>
                                                      </motion.div>}></Route>
                        <Route path="Alert" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <MypageAlert/>
                                                        </motion.div>}/>
                 </Route>
                </Route>{/*mypage 중첩 route 끝 */}


                                                                                                                                                                        */}
          </Routes>
        </AnimatePresence>
        </>                                  
    );
  }

export default App;