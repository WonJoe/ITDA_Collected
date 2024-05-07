import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import address from '../../API_KEY'

const CSBoardDetail = () => {
  //파람 유알엘에서 디테일뒤에 숫자 읽기
  //그걸로 스프링부트에 겟으로 요청해서 보드넘을 보내기
  //그걸 찾는 함수 실행

  const { boardNo } = useParams();
  const [boardDetail, setBoardDetail] = useState([]);
  const [adminEmail, setAdminEmail] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [sessionId, setSessionId] = useState('');
  
  console.log('boardNo : ', boardNo);

  useEffect(() => {
    fetchSessionId();
    axios
      .get(`http://localhost:4000/boardDetail?boardNo=${boardNo}`, {withCredentials:true})
      .then((response) => {
        console.log(response.data);
        setBoardDetail(response.data);
      })
      .catch((error) => {
        console.error('error detail', error);
      });
  }, [boardNo]);

  const fetchSessionId = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/get_session_user_id`, {
        withCredentials: true 
      });
      setSessionId(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching session id:', error);
    }
  };

  const handleAdminEmailChange = (e) => {
    setAdminEmail(e.target.value);
  };

  const handleAnswerWrite = () => {
    // if (adminEmail.trim() === 'admin') {
    // } else {
    //   alert('관리자 권한이 필요합니다.');
    // }
    window.location.href = `/answerWrite/${boardNo}`;
  };

  const handleEditEmailChange = (e) => {
    setEditEmail(e.target.value);
  };

  const handleAnswerEdit = () => {
    if (boardDetail.boardWriteId === sessionId) {
      window.location.href = `/boardEdit/${boardNo}`;
    } else {
      alert('수정 권한은 작성자에게만 있습니다.');
    }
  };

  return (
    <div>
      <h2>BoardDetail</h2>
      <div>글번호 : {boardDetail.boardNo}</div>
      <div>제목 : {boardDetail.boardSubject}</div>
      <div>작성일 : {boardDetail.createdAt}</div>
      <div>내용 : {boardDetail.boardContent}</div>
      <div>
        <button onClick={handleAnswerEdit}>
          수정하기
        </button>
      </div>
    </div>
  );
};

export default CSBoardDetail;
