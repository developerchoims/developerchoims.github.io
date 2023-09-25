import { Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'react-bootstrap';
import './adminShop.css'
import AdvancedExample from './ShopPagination';
import { useState, useEffect } from 'react';
import axios from 'axios';


const AdminShop = () => {

    
{/*새로운 상점 추가 모달 열기 */}
    const [show, setShow] = useState(false);
    const handleOn = ()=> setShow(true);
    const handleOff = () => setShow(false);

    const [newShop, setNewShop] = useState({
        shopName : '',
        shopRegion : '서울특별시 강남구',
        shopCate : '카페/베이커리',
        shopAddress: ''
    })

{/*새로운 상점 추가 */}
    const handleNewShop = (event) => {
        const { id, value} = event.target;
        setNewShop( prevShop => ({
            ...prevShop,
                [id] : value
        }))
        console.log(newShop);
    }
{/*상점 추가 서버 전송 */}
    const handleShopAdd = ()=>{
        axios.post("/dasony/api/shopAdd", newShop,  {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }})
        .then(res=>{
            alert(res.data);
            setNewShop({
                shopName : '',
                shopRegion : '서울특별시 강남구',
                shopCate : '카페/베이커리',
                shopAddress: ''
            });
            handleOff();
            window.location.reload();
        })
        .catch(err=>{
            console.log(err);
            alert("상점 추가에 실패했습니다.");
        })
    }
    

{/* 상점 수정 모달 열기 */}
    const [shopOkey, setShopOkey] = useState('');
    const [modifyShow, setModifyShow] = useState(false);
    const handleModifyOn = (e)=> {setModifyingShop(e); setShopOkey(e.shopOkey); setModifyShow(true);}
    const handleModifyOff = () => setModifyShow(false);

{/* 상점 수정 */}
    const [modifyingShop, setModifyingShop] = useState({shopOkey:'', shopName:'', shopRegion:'', shopCate:'', shopAddress:''});
    const handleModifyingShop = (event) => {
        const { id, value } = event.target;
        let shopName = modifyingShop.shopName;
        let shopRegion = modifyingShop.shopRegion;
        let shopCate = modifyingShop.shopCate;
        let shopAddress = modifyingShop.shopAddress;
        switch(id){
            case 'shopName': shopName=value; break;
            case 'shopRegion' : shopRegion=value; break;
            case 'shopCate' : shopCate = value; break;
            case 'shopAddress' : shopAddress = value; break;
        }
        const shop = {shopOkey:shopOkey,shopName:shopName, 
                        shopRegion:shopRegion==''?'서울특별시 강남구':shopRegion, 
                        shopCate:shopCate==''?'카페/베이커리':shopCate, 
                        shopAddress:shopAddress};
        setModifyingShop(shop);
    }
{/*상점 수정 - 서버 */}
    const handleModifyingShopSub = ()=>{
        axios.post('/dasony/api/modifyingShop', modifyingShop, {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
        }})
        .then(res=>{
            alert(res.data);
        })
        .catch(err=>{
            console.log(err);
            alert('다시 시도해주세요.');
        })
        .then(handleModifyOff());
    }

{/*상점 리스트 검색 */}
  const [keyword, setKeyword] = useState('');
  const handleKeyword = (e)=>{
      setKeyword(e.target.value);
  }
   

    return(
        <div className="admin-shop-container">
            <div className='admin-shop-head'>
                <div>상점 목록</div>
                <div>
                    <input type="search" onChange={handleKeyword} value={keyword}/>
                    <Button className="btn btn-primary">검색</Button>
                </div>
            </div>
            
            <div className='adminShop-pagination'>
                <div>
                    <AdvancedExample handleOn={handleOn} handleModifyOn={handleModifyOn} 
                                     handleModifyingShopSub={handleModifyingShopSub} 
                                     handleNewShop={handleNewShop} keyword={keyword} />
                </div>
            </div>
                <Modal show={show} onHide={handleOff}>
                    <ModalHeader>
                        상점 추가 
                        <Button className='btn btn-danger' onClick={handleOff}>x</Button>
                    </ModalHeader>
                    <ModalBody>
                        <table style={{width:'100%', textAlign:'center', marginTop:'5%'}}>
                            <tbody>
                                <tr style={{height:'7vh'}}>
                                    <th>상점 이름</th>
                                    <td>
                                        <input id='shopName' type='text' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewShop} value={newShop.shopName}/>
                                    </td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>지역</th>
                                    <td>
                                        <select id='shopRegion' type='text' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewShop} value={newShop.shopRegion}>
                                            <option>서울특별시 강남구</option>
                                            <option>서울특별시 강동구</option>
                                            <option>서울특별시 관악구</option>
                                            <option>서울특별시 노원구</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>주소</th>
                                    <td>
                                        <input id='shopAddress' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewShop} value={newShop.shopAddress}/>
                                    </td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>카테고리</th>
                                    <td>
                                        <select id='shopCate' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewShop} value={newShop.shopCate}>
                                            <option>카페/베이커리</option>
                                            <option>외식</option>
                                            <option>문화생활</option>
                                            <option>편의점</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={2} style={{textAlign:'right'}}>
                                        <Button className="btn btn-primary"
                                                onClick={handleShopAdd}>확인</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                </Modal>


                <Modal show={modifyShow} onHide={handleModifyOff}>
                <ModalHeader>상점 수정</ModalHeader>
                <ModalBody style={{textAlign:'center'}}>
                    상점 정보를 수정하세요.
                    <table style={{width:'100%', textAlign:'center', marginTop:'5%'}}>
                        <tbody>
                            <tr style={{height:'7vh'}}>
                                <th>상점 이름</th>
                                <td>
                                    <input id='shopName' type="text"
                                            onChange={handleModifyingShop}  value={modifyingShop.shopName}/>
                                </td>
                            </tr>
                            <tr style={{height:'7vh'}}>
                                <th>지역</th>
                                <td><select id='shopRegion' style={{width:'60%', height:'5vh'}}
                                            onChange={handleModifyingShop} value={modifyingShop.shopRegion}>
                                        <option>서울특별시 강남구</option>
                                        <option>서울특별시 강동구</option>
                                        <option>서울특별시 관악구</option>
                                        <option>서울특별시 노원구</option>
                                    </select>
                                </td>
                            </tr>
                            <tr style={{height:'7vh'}}>
                                <th>주소</th>
                                <td>
                                    <input id='shopAddress' type='text' style={{width:'60%', height:'5vh'}}
                                            onChange={handleModifyingShop} value={modifyingShop.shopAddress}/>
                                </td>
                            </tr>
                            <tr style={{height:'7vh'}}>
                                <th>카테고리</th>
                                <td>
                                    <select id='shopCate' style={{width:'60%', height:'5vh'}}
                                                onChange={handleModifyingShop} value={modifyingShop.shopCate}>
                                            <option>카페/베이커리</option>
                                            <option>외식</option>
                                            <option>문화생활</option>
                                            <option>편의점</option>
                                        </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-primary" onClick={handleModifyingShopSub}>확인</Button>
                    <Button className='btn btn-danger' onClick={handleModifyOff}>취소</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AdminShop;