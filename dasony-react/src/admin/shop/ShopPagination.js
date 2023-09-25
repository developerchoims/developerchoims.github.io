import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Justify } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export default function AdvancedExample({handleOn, handleModifyOn, handleModifyingShopSub, handleNewShop, keyword}) {  
  
  const navigate = useNavigate();
  
  const userRegion = '관리자';
  // 페이지네이션 관련 상태
  const [shopList, setShopList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [shopLength, setShopLength] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5; // 페이지당 아이템 수


  // 현재 페이지의 데이터 계산
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(0);

  // 이전 페이지로 이동
  const goToPreviousPage = async() => {
    if (currentPage > 1) {
      await setCurrentPage(currentPage-1);
  
      // 시작 페이지 계산
      const newStartIndex = Math.floor((currentPage-1 - 1) / pageSize) * pageSize + 1;
      setStartIndex(newStartIndex);
  
      // 끝 페이지 계산
      const newEndIndex = Math.min(totalPages, newStartIndex + pageSize - 1);
      setEndIndex(newEndIndex);}
  };

  // 다음 페이지로 이동
  const goToNextPage = async() => {
    if (currentPage < totalPages) {
      await setCurrentPage(currentPage+1);
  
      // 시작 페이지 계산
      const newStartIndex = Math.floor((currentPage+1 - 1) / pageSize) * pageSize + 1;
      setStartIndex(newStartIndex);
  
      // 끝 페이지 계산
      const newEndIndex = Math.min(totalPages, newStartIndex + pageSize - 1);
      setEndIndex(newEndIndex);}
  };

  // 페이지네이션 바에서 페이지를 클릭했을 때 currentPage를 업데이트하는 핸들러 추가
  const handlePageClick = async (pageNumber) => {
    await setCurrentPage(pageNumber);

    // 시작 페이지 계산
    const newStartIndex = Math.floor((pageNumber - 1) / pageSize) * pageSize + 1;
    setStartIndex(newStartIndex);

    // 끝 페이지 계산
    const newEndIndex = Math.min(totalPages, newStartIndex + pageSize - 1);
    setEndIndex(newEndIndex);
  };

  /*샵 리스트 가져오기 - 서버 */
  const handleShopList = ()=> {
    axios.post(`/dasony/api/shopList/`, {userRegion:userRegion})
    .then(res => {
        setShopList(res.data.shopList);
        setShopLength(res.data.shopList.length);
        setTotalPages(Math.ceil(shopLength / pageSize));
        
    })
    .catch(err => {
        console.log(err);
        alert("다시 시도해주세요.");
    });
    };

    
    const categoryMap = {
        'B':'카페/베이커리',
        'O':'외식',
        'L':'문화생활',
        'C':'편의점'
    };

    const handleCancleChild = (id)=>{
      handleCancle(id);
      handleShopList();
    }

  useEffect(() => {
    handleShopList();
    
  }, [handleNewShop, handleModifyingShopSub, shopLength, currentPage]);



   {/*상점 삭제 */}
  const handleCancle = (id) => {
      const result = window.confirm('삭제하시겠습니까?');
      if(result){
          axios.delete('/dasony/api/shopDelete', {
            params : {shopOkey: id}
          })
          .then(res=>{
              alert(res.data);
              handleShopList();
          })
          .catch(err=>{
              console.log(err);
              alert("다시 시도해주세요.");
          })
      } else {
          alert("삭제가 취소되었습니다.");
      }

      handleShopList();
  }

  {/*상점 정보 detail 페이지로 이동 */}
  const [shopOkey, setShopOkey] = useState('');
  const handleShopOkey = (e) => {
    const shopOkey = e.currentTarget.getAttribute('data-shopokey');
    setShopOkey(shopOkey);
    navigate(`/admin/shop/${shopOkey}`);
  }

  return (
    <>
    <div className="admin-shop-table">
        <table>
            <thead>
                <tr>
                    <th>상점 번호</th>
                    <th>상점 이름</th>
                    <th>지역</th>
                    <th>주소</th>
                    <th>카테고리</th>
                    <th>수정/삭제</th>
                </tr>
            </thead>
            <tbody>
            {shopList.filter(shop=>{return(shop.shopName.includes(keyword)|| 
                            shop.shopRegion.includes(keyword)||
                            shop.shopAddress.includes(keyword));})
                    .slice((currentPage - 1)*pageSize, Math.min((currentPage - 1)*pageSize + pageSize, shopLength) )
                    .map((shop, index)=>{
                    return(
                            <tr key={shop.shopOkey} data-shopokey={shop.shopOkey} onClick={handleShopOkey}>
                                <td>{index+1}</td>
                                <td>{shop.shopName}</td>
                                <td>{shop.shopRegion}</td>
                                <td style={{fontSize:'80%'}}>{shop.shopAddress}</td>
                                <td>{categoryMap[shop.shopCate]}</td>
                                <td>   
                                    <Button style={{width:'70%'}} id={shop.shopOkey} onClick={(e)=>{e.stopPropagation(); handleModifyOn(shop);}} className="btn btn-primary">수정</Button>
                                    <Button style={{width:'70%'}} id={shop.shopOkey} onClick={(e)=>{e.stopPropagation(); handleCancleChild(e.target.id);}} className='btn btn-danger'>삭제</Button>
                                </td> 
                            </tr>);
                    })}
                        
            </tbody>
        </table>
    </div>
    <div className='pagination-bar'>
      {/* 페이지네이션 바 */}
      <div>
        <Pagination>
            <Pagination.First onClick={() => handlePageClick(1)} />
            <Pagination.Prev onClick={goToPreviousPage} disabled={currentPage === 1} />
            {Array.from({ length: 5 }).map((_, index) => {
                const pageNumber = startIndex + index;
                return (
                <Pagination.Item
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    active={pageNumber === currentPage}
                    disabled={pageNumber > totalPages}
                >
                    {pageNumber}
                </Pagination.Item>
                );
            })}
            <Pagination.Next onClick={goToNextPage} />
            <Pagination.Last onClick={() => handlePageClick(totalPages)} />
        </Pagination>
      </div>
        <div><Button className="btn btn-primary" onClick={handleOn}>상점 추가</Button></div>
    </div>
    
    </>
  );
}

