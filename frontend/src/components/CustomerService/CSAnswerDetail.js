import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CSAnswerDetail = () => {
  //파람 유알엘에서 디테일뒤에 숫자 읽기
  //그걸로 스프링부트에 겟으로 요청해서 보드넘을 보내기
  //그걸 찾는 함수 실행

  const { answerNo } = useParams();
  const [answerDetail, setAnswerDetail] = useState([]);
  const [adminEmail, setAdminEmail] = useState('');

  console.log('answerNo : ', answerNo);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/answerDetail?answerNo=${answerNo}`, {withCredentials:true})
      .then((response) => {
        console.log(response.data);
        setAnswerDetail(response.data);
      })
      .catch((error) => {
        console.error('error detail', error);
      });
  }, [answerNo]);

  const handleAdminEmailChange = (e) => {
    setAdminEmail(e.target.value);
  };

  const handleAnswerWrite = () => {
    // if (adminEmail.trim() === 'admin') {
    // } else {
    //   alert('관리자 권한이 필요합니다.');
    // }
    window.location.href = `/answerEdit/${answerNo}`;
  };

  return (
    <div>
      <h2>AnswerDetail</h2>
      <div>이메일: {answerDetail.userEmail}</div>
      <div>답글번호 : {answerDetail.answerNo}</div>
      <div>제목 : {answerDetail.answerSubject}</div>
      <div>닉네임 : {answerDetail.userNickname}</div>
      <div>작성일 : {answerDetail.createdAt}</div>
      <div>내용 : {answerDetail.answerContent}</div>
      <div>
        권한 코드 :{' '}
        <input
          type="text"
          value={adminEmail}
          onChange={handleAdminEmailChange}
        />
        <button onClick={handleAnswerWrite}>
          답글달기
          {adminEmail.trim() === 'admin' && (
            <Link to={`/answerEdit/${answerNo}`}></Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default CSAnswerDetail;
