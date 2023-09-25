import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import './ShopProductDetail.css';
import HeartIcon from '../heart';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const ShopProductDetail = () => {

    const {store} = useParams();
    const location = useLocation();
    let product ='';
    product = location.state.product;
    console.log("product",product);

    const userNo = localStorage.getItem("loginUserNo");

    const [show, setShow] = useState(false);
    const [modalText, setModalText] = useState(`${product.productName}(을/를) ${product.productAmount} 다손으로 구매하시겠습니까?


                                                *구매 이후 환불은 불가능합니다.*`);
    const [modalButton, setModalButton] = useState('inline-block');
    const [modalButtonText, setModalButtonText] = useState('취소');

    const [modalClass, setModalClass] = useState('modalButton-no');

    const handleClose = () => setShow(false);
    const handleShow = () => {
        handleModalOff();
        setShow(true);
    }
    const handleModalOn = ()=>{     
                                    handleCouponBuy();
                                    setModalText(`구매가 정상적으로 완료되었습니다.`);
                                    setModalButton('none');
                                    setModalButtonText('확인');
                                    setModalClass('modalButton-yes');
                                }
    const handleModalOff = ()=>{
                                    setModalText(<div textalign='center'>{product.productName}(을/를) <br/>{product.productAmount}포인트로 구매하시겠습니까?<br/><br/>
                                                    *구매 이후 환불은 불가능합니다.*</div>);
                                    setModalButton('inline-block');
                                    setModalButtonText('취소');
                                    setModalClass('modalButton-no');
                                }
    const handleModalOffAndClose = () => {
        if(modalButtonText == '확인' && modalButton == 'inline-block' && show){
            handleClose();
            handleModalOff();
        }
    }

    {/*userPoint, userName받아오기 */}
    const [userPoint, setUserPoint] = useState('');

    const handleUserInfo = () => {
        axios.post('/dasony/api/userInfo', {userNo: userNo})
        .then(res=>{
            setUserPoint(res.data.user.totalPoint);
        })
        .catch(err=> {
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }

    {/*쿠폰 구매 - 서버 */}
    const handleCouponBuy = ()=>{
        if(userPoint >= product.productAmount){
            axios.post('/dasony/api/couponBuy', {product:product, userNo:userNo})
            .then(res=>{
                alert("상품 구매가 완료되었습니다.");
                handleClose();
            })
            .catch(err=>{
                alert("다시 시도해주세요");
            })
        } else {
            alert("잔액이 부족합니다.");
        }
        handleClose();
        window.location.reload();
    }


    useEffect(()=>{
        handleUserInfo();
    }, [userNo])

    return(
        <div className="shopProductDetail-container">
            <div className="product-info">
                <div className='product-info-img'>
                    <img src={product.productImg}/>
                </div>
                <div className='product-info-head'>
                    <div className='product-info-store'>
                        {store}
                    </div>
                    <div>
                        <HeartIcon  product={product}/>
                    </div>
                </div>
                
                <div className='product-info-middle'>
                    <div className='product-info-middle-left'>
                        <div>{product.productName}</div>
                        <div>{product.productAmount} 다손</div>
                    </div>
                    <div className='product-info-middle-right'>
                        <button onClick={handleShow}>구매</button>
                        <Modal className='modal' show={show} onHide={handleClose} >
                            <ModalHeader>
                                상품 구매
                            </ModalHeader>
                            <ModalBody>
                                <div style={{textAlign:'center'}}>
                                {modalText}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <button className={modalClass} onClick={handleClose}>{modalButtonText}</button>
                                <button className='modalButton-yes' onClick={handleModalOn} style={{display:modalButton}}>구매</button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
                
            </div>
            <div className="buy-info"> 
                <div>
                    <div>구매 전 필독<br/></div>
                    - 상기 이미지는 연출된 것으로 실제와 다를 수 있습니다.<br/><br/>
                </div>

                <div>
                    <div>사용처 / 사용 안내<br/></div>
                    - 본 상품은 매장 재고 상황에 따라 동일 상품으로 교환이 불가능할 수 있습니다.<br/>
                    - 동일 상품 교환이 불가한 경우 동일 가격 이상의 다른 상품으로 교환이 가능하며, 
                    동일 상품 외 다른 상품으로 교환할 시 차액이 발생할 수 있습니다.(차액 추가 지불)<br/><br/>
                </div>
                
                <div>
                    <div>사용 전 주의 사항<br/></div>
                    - 정식 판매처 외의 장소나 경로를 통하여 구매하거나 기타의 방법으로 보유하신 쿠폰은 정상적인
                    사용이 금지되거나 제한될 수 있으니 주의하시기 바랍니다.<br/>
                </div>
            </div>
        </div>

    );
}

export default ShopProductDetail;