import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // useHistory 추가
import BoardItem from './CSBoardItem';
import AnswerItem from './CSAnswerItem';
import address from '../../API_KEY'

function CSBoardList() {
  const [boardList, setBoardList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const history = useHistory(); // useHistory 사용

  useEffect(() => {
    boardData();
    answerData();
  }, []);

  const boardData = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/board/list`, { withCredentials: true });
      console.log('보드 데이터' + response.data);
      setBoardList(response.data);
    } catch (error) {
      console.error('board list error:', error);
    }
  };

  const answerData = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/answer/list`);
      console.log('앤써 데이터' + response);
      setAnswerList(response.data);
    } catch (error) {
      console.error('board list error:', error);
    }
  };

  const handleInquiryButtonClick = () => {
    history.push('/boardWrite'); // '/boardWrite'로 리다이렉트
  };

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '50px', textAlign: 'center' }}>
      <h2>QnA</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '2px solid black', padding: '10px' }}>
        <div style={{ width: '20%' }}>FAQ Number</div>
        <div style={{ width: '60%' }}>Title</div>
        <div style={{ width: '20%' }}>ID</div>
        <div style={{ width: '20%' }}>Date</div>
      </div>
      {boardList.length === 0 ? (
        <div style={{ fontSize: '35px', margin: '20px 0' }}>게시글이 없습니다</div>
      ) : (
        boardList.map((boardItem, index) => (
          <div key={boardItem.boardNo}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
              <BoardItem boardItem={boardItem} index={index + 1} />
            </div>
            {answerList
              .filter((answer) => answer.boardNo === boardItem.boardNo)
              .map((answer, index) => (
                <div key={answer.answerNo} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
                  <AnswerItem answerItem={answer} answerNo={answer.answerNo} />
                </div>
              ))}
          </div>
        ))
      )}
      <button type="button" style={{ margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }} onClick={handleInquiryButtonClick}>문의하기</button>
    </div>
  );
}

export default CSBoardList;
