import React, { useState } from 'react';

function Vote(){
const [options, setOptions] = useState([
  { text: 'Option 1', count: 0 },
  { text: 'Option 2', count: 0 }
]);

const handleVote = (index) => {
  const newOptions = [...options];
  newOptions[index].count += 1;
  setOptions(newOptions);
};

return (
  <>
      <div className="Vote">
        <div className='Vote-Content-container'>
          <div className='Vote-Content-btn-wrapper'>
              {options.map((option, index) => (
                <div key={index} className="Vote-button-container">
                  <button className='Vote-button-controll' onClick={() => handleVote(index)}>{option.text} <div>Count: {option.count}</div></button>
                  {index === 0 && <div className='VS'>VS</div>} {/* index가 0일 때만 'VS' 요소 출력 */}
                </div>
              ))}
            </div>
            <div className='Vote-Content-Time'>
                <span>종료 시간</span>
                <input type='datetime-local'></input>
            </div>
        </div>
      </div>
  </>
);
}
export default Vote;