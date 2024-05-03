import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import address from '../../API_KEY';
import LocationWrite from './LocationWrite';
import axios from 'axios';


const requiredFields = [
  { field: '이름', path: 'users.userName' },
  { field: '아이디', path: 'users.userId' },
  { field: '비밀번호', path: 'users.userPassword' },
  { field: '이메일', path: 'users.userEmail' },
  { field: '성별', path: 'users.userGender' },
  { field: '주소', path: 'location.address' },
  { field: '나이', path: 'users.userAge' },
  { field: '취미', path: 'users.userHobby' },
  { field: '전화번호', path: 'users.userTel' },
  { field: '이미지', path: 'users.userProfile' }
];


const CreateUser = (props) => {
  const [createData, setCreateData] = useState({
    users: {
      userId: '',
      userPassword: '',
      userEmail: '', // userEmail을 빈 문자열로 초기화
      userName: '',
      userGender: '',
      userAge: '',
      userHeight: '',
      userHobby: '',
      userTel: '',
      userWeight: '',
      userProfile: '', // 이미지
      userMBTI: ''
    },
    location: {
      lat: '',
      lng: '',
      address: '' // 주소 필드 추가
    }
  },[]);
  
  // LocationWrite 컴포넌트의 열림/닫힘 상태를 관리하는 변수와 함수
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const category = name.split('.')[0]; // users or location
    const field = name.split('.')[1]; // userId, userName, lat, lng, or address

    setCreateData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // 필수 필드를 확인하여 누락된 필드가 있는지 확인
  const missingFields = checkRequiredFields(createData, requiredFields);

  // 누락된 필드가 있으면 알림을 표시하고 함수 종료
  if (missingFields.length > 0) {
    const missingFieldsText = missingFields.map(field => `${field}을(를)`).join(', ');
    alert(`${missingFieldsText} 입력해주세요.`);
    return;
  }

  // 모든 필수 필드가 입력되었다면 요청 보내기
  axios.post(`${address.backendaddress}/users/create`, createData, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    withCredentials: true, // withCredentials 옵션 추가
  })
  .then((res) => {
    console.log(res.data);
    props.history.push('/complete');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
};

  
// 필드의 값을 가져오는 함수
const getFieldValue = (createData, field) => {
  // field가 문자열인지 확인하고, 아닌 경우 빈 문자열 반환
  if (typeof field !== 'string') return '';

  const fieldPath = field.split('.');
  let value = createData;
  for (const key of fieldPath) {
    value = value[key];
    if (value === undefined) return ''; // 값이 없을 경우 빈 문자열 반환
  }
  return value;
};

// 필드의 이름을 가져오는 함수
const getFieldName = (field) => {
  // field가 문자열인지 확인하고, 아닌 경우 빈 문자열 반환
  if (typeof field !== 'string') return '';

  const fieldPath = field.split('.');
  return fieldPath[fieldPath.length - 1];
};

// 필수 필드들의 값을 확인하고 반환하는 함수
const checkRequiredFields = (createData, requiredFields) => {
  const missingFields = [];
  for (const { field, path } of requiredFields) {
    const value = getFieldValue(createData, path);
    if (!value) {
      missingFields.push(field);
    }
  }
  return missingFields;
};



  

  // LocationWrite를 열고 닫는 함수
  const toggleLocationWrite = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      
      
        <Form.Group className="mb-3">
          <Form.Label>성함</Form.Label>
          <Form.Control
            type="text"
            name="users.userName"
            value={createData.users.userName}
            onChange={handleChange}
          />
        </Form.Group>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            name="users.userId"
            value={createData.users.userId}
            onChange={handleChange}
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="text"
            name="users.userPassword"
            value={createData.users.userPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="text"
            name="users.userEmail"
            value={createData.users.userEmail}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>성별</Form.Label>
          <div>
            <Form.Check
              inline
              label="남자"
              type="radio"
              id="gender-male"
              name="users.userGender"
              value="male"
              checked={createData.users.userGender === "male"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="여자"
              type="radio"
              id="gender-female"
              name="users.userGender"
              value="female"
              checked={createData.users.userGender === "female"}
              onChange={handleChange}
            />
          </div>
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>주소</Form.Label>
          <Form.Control
            type="text"
            name="location.address"
            value={createData.location.address}
            onChange={handleChange}
            disabled={false}
          />
        </Form.Group>

        {/* LocationWrite 컴포넌트를 토글할 버튼 */}
        <Button onClick={toggleLocationWrite}>
          {isOpen ? '주소 선택 닫기' : '주소 선택 열기'}
        </Button>
        
        {/* isOpen 상태에 따라 LocationWrite 컴포넌트를 보여주거나 감춥니다 */}
        {isOpen && (
          <LocationWrite setCreateData={setCreateData} toggleLocationWrite={toggleLocationWrite}/>
        )}
        <br/>
        <br/>

        <Form.Group className="mb-3">
          <Form.Label>나이</Form.Label>
          <Form.Control
            type="text"
            name="users.userAge"
            value={createData.users.userAge}
            onChange={handleChange}
          />
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>취미</Form.Label>
          <Form.Control
            type="text"
            name="users.userHobby"
            value={createData.users.userHobby}
            onChange={handleChange}
          />
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            type="text"
            name="users.userTel"
            value={createData.users.userTel}
            onChange={handleChange}
          />
          </Form.Group>

{/* 필수입력아님 */}
        <Form.Group className="mb-3">
          <Form.Label>무게</Form.Label>
          <Form.Control
            type="text"
            name="users.userWeight"
            value={createData.users.userWeight}
            onChange={handleChange}
          />
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>이미지</Form.Label>
          <Form.Control
            type="text"
            name="users.userProfile"
            value={createData.users.userProfile}
            onChange={handleChange}
          />
          </Form.Group>

{/* 필수입력아님 */}
        <Form.Group className="mb-3">
          <Form.Label>MBTI</Form.Label>
          <Form.Control
            type="text"
            name="users.userMBTI"
            value={createData.users.userMBTI}
            onChange={handleChange}
          />
          </Form.Group>

        </Form>

        

        <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label style={{display:'none'}}>위도</Form.Label>
          <Form.Control
            type="text"
            name="location.lat"
            value={createData.location.lat}
            onChange={handleChange}
            disabled="disabled"
            style={{display:'none'}}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{display:'none'}}>경도</Form.Label>
          <Form.Control
            type="text"
            name="location.lng"
            value={createData.location.lng}
            onChange={handleChange}
            disabled="disabled"
            style={{display:'none'}}
          />
        </Form.Group>

        <br/>

        <Button type="submit">회원가입</Button>

        <br/><br/><br/>   

      </Form>
    </div>
  );
};

export default CreateUser;
