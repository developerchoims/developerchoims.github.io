import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './Pagination.css';

function AdvancedExample({handleCalendarAdmit, handleCalendarCancle, keyword}) {  
  const userRegion = '관리자';
  // 페이지네이션 관련 상태
  const [calendarList, setCalendarList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [calendarLength, setCalendarLength] = useState();
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

  const handleCalendar = () => {
    axios.post('/dasony/api/calendarList', { userRegion: userRegion })
    .then(res => {
      setCalendarList(res.data.calendarList);
      setCalendarLength(res.data.calendarList.length);
      setTotalPages(Math.ceil(calendarLength / pageSize));
    })
    .catch(err => {
      console.log(err);
      alert("다시 시도해주세요.");
    });
  }

  const calendarMap = {
    'D':'봉사활동',
    'E':'기타',
    'F':'축제',
    'P':'공연'
};

const handleCalendarAdmitChild = (e)=>{
  handleCalendarAdmit(e);
  handleCalendar();
}

const handleCalendarCancleChild = (e)=>{
  handleCalendarCancle(e);
  handleCalendar();
}

  useEffect(() => {
    handleCalendar();
    
  }, [currentPage,setCalendarList, calendarLength, keyword]);

  return (
    <>
    <div className='admin-calendar-table'>
            <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>날짜(기간)</th>
                            <th>신청 회원</th>
                            <th>일정 이름</th>
                            <th>장소</th>
                            <th>특이사항</th>
                            <th>종류</th>
                            <th>승인 상태</th>
                            <th>승인 검토</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calendarList.filter(calendar=>{return(calendar.calendarName.includes(keyword)|| 
                                            calendar.calendarPlace.includes(keyword)||
                                            calendar.calendarSpec.includes(keyword)||
                                            calendar.userId.includes(keyword));}
                        )
                        .slice((currentPage - 1)*pageSize, Math.min((currentPage - 1)*pageSize + pageSize, calendarLength))
                        .map((calendar, index)=>{
                            return(
                                    <tr key={calendar.calendarNo}>
                                        <td>{index+1}</td>
                                        <td style={{fontSize:'70%'}}>{calendar.calendarDate}</td>
                                        <td>{calendar.userId}</td>
                                        <td>{calendar.calendarName}</td>
                                        <td style={{fontSize:'70%'}}>{calendar.calendarPlace}</td>
                                        <td>{calendar.calendarSpec}</td>
                                        <td>{calendarMap[calendar.calendarCate]}</td>
                                        <td>{calendar.calendarStatus}</td> 
                                        <td>   
                                            <Button id={calendar.calendarNo} onClick={(e)=>handleCalendarAdmitChild(e.target.id)} className="btn btn-primary">Y</Button>
                                            <Button id={calendar.calendarNo} onClick={(e)=>handleCalendarCancleChild(e.target.id)} className='btn btn-danger'>N</Button>
                                        </td> 
                                    </tr>);
                        })}
                        
                    </tbody>
                </table>
            </div>
    <div className='pagination-bar'>
      {/* 페이지네이션 바 */}
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
    </>
  );
}

export default AdvancedExample;