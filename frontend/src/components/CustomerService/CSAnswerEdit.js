import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CSAnswerEdit = () => {
  const { answerNo } = useParams();
  const [userEmail, setUserEmail] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [answerDetail, setAnswerDetail] = useState({
    answerNo: answerNo,
    userEmail: '',
    userNickname: '',
    answerContent: '',
    answerSubject: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/answerDetail?answerNo=${answerNo}`,{withCredentials:true}
        );
        setAnswerDetail(response.data);
        setUserEmail(response.data.userEmail);
      } catch (error) {
        console.error('Error data:', error);
      }
    };
    fetchData();
  }, [answerNo]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAnswerDetail({
      ...answerDetail,
      [id]: value,
    });
  };

  const handleEditEmailChange = (e) => {
    setEditEmail(e.target.value);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (editEmail.trim() === userEmail) {
      try {
        console.log('넘기는 이메일 : ' + answerDetail.userEmail);
        console.log('넘기는 내용:' + answerDetail.answerContent);
        console.log('넘기는 제목:' + answerDetail.answerSubject);
        setAnswerDetail({ ...answerDetail, userEmail: userEmail });
        const response = await axios.post(
          'http://localhost:4000/answerEdit',
          answerDetail,
        );
        if (response.status === 200) {
          alert('답글 수정 완료');
        }
      } catch (error) {
        console.error('답변 수정 중 에러 발생:', error);
      }
    } else {
      alert('권한 정보가 다릅니다.');
    }
  };
  return (
    <div>
      AnswerEdit
      <div>
        답변 내용
        <input
          type="text"
          id="answerNo"
          value={answerDetail.answerNo || ''}
          readOnly
        />
      </div>
      <div>
        <input
          type="text"
          id="userEmail"
          placeholder={answerDetail.userEmail}
          onChange={handleEditEmailChange}
          value={editEmail}
        />

        <input
          type="text"
          id="answerSubject"
          placeholder={answerDetail.answerSubject}
          onChange={handleChange}
          value={answerDetail.answerSubject}
        />

        <input
          type="text"
          id="userNickname"
          placeholder={answerDetail.userNickname}
          onChange={handleChange}
          value={answerDetail.userNickname}
        />
      </div>
      <div>
        <textarea
          id="answerContent"
          value={answerDetail.answerContent}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleAnswerSubmit}>수정</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default CSAnswerEdit;
