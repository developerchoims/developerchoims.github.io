import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import '../board/Pagination.css';
import { AdminUserModal } from './adminUserModal';
import { useNavigate } from 'react-router-dom';

function AdvancedExample({keyword}) {  
  const navigate = useNavigate();
  const userRegion = '관리자';
  // 페이지네이션 관련 상태
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userLength, setUserLength] = useState();
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

  {/*회원 리스트 보기 */}
  const getUsers = () => {
      axios.get("/dasony/api/admin/userList")
          .then(res => {
              setUsers(res.data);
              setUserLength(res.data.length);
              setTotalPages(Math.ceil(userLength / pageSize));
          }).catch(console.log);

  }

  {/*회원 정보 detail 페이지로 이동 */}
  const [userNo, setUserNo] = useState('');
  const handleUserNo = (e) => {
    const userNo = e.currentTarget.getAttribute('data-userno');
    setUserNo(userNo);
    navigate(`/admin/user/${userNo}`);
  }


  useEffect(() => {
    getUsers();
    
      
  }, [currentPage, keyword ]);

  return (
    <>
      <div className='admin-user-table'>
          <table>
          <thead>
            <tr>
                <th>회원 번호</th>
                <th>아이디</th>
                <th>이름</th>
                <th>별명</th>
                <th>핸드폰 번호</th>
                <th>상태</th>
            </tr>
          </thead>
          <tbody>
              {users.filter(user=>{return(user.userNo.toString().includes(keyword)|| 
                            user.userId.includes(keyword)||
                            user.userName.includes(keyword)||
                            user.userNick.includes(keyword)||
                            user.userStatus.includes(keyword));})
                    .slice((currentPage - 1)*pageSize, Math.min((currentPage - 1)*pageSize + pageSize, userLength))
                    .map((user)=>{
                  return (
                      <tr key={user.userNo} data-userno={user.userNo} onClick={handleUserNo} >
                          <td>{user.userNo}</td>
                          <td>{user.userId}</td>
                          <td>{user.userName}</td>
                          <td>{user.userNick}</td>
                          <td>{user.userPhone}</td>
                          <td>{user.userStatus}</td>
                      </tr>
                  )
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
      <div> </div>
    </div>
    </>
  );
}

export default AdvancedExample;