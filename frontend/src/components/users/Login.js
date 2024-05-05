import React, { useState } from 'react';
import axios from 'axios';
import address from '../../API_KEY'
// import styled from "styled-components";

const Login = ({ setLoggedInUser }) => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${address.backendaddress}/login`, { userId, userPassword }, { withCredentials: true });
      
      setError('');

      const userResponse = await axios.get(`${address.backendaddress}/users`, { withCredentials: true });
      setLoggedInUser(userResponse.data);

      window.location.href='/'
      
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Login failed:', error.response.data);
        setError('로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
      } else {
        console.error('Login failed:', error.message);
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };
//   const Container = styled.div`
//   margin-top: 100px;
//   padding: 20px;
// `;

// const Input = styled.input`
//   position: relative;
//   overflow: hidden;
//   width: 100%;
//   height: 40px;
//   margin: 0 0 8px;
//   padding: 5px 39px 5px 11px;
//   border: solid 1px #dadada;
//   background: #fff;
//   box-sizing: border-box;
// `;

// const Button = styled.div`
//   font-size: 18px;
//   font-weight: 700;
//   line-height: 49px;
//   display: block;
//   width: 100%;
//   height: 49px;
//   margin: 16px 0 7px;
//   cursor: pointer;
//   text-align: center;
//   color: #fff;
//   border: none;
//   border-radius: 0;
//   background-color: #03c75a;
//   ${({ disabled }) =>
//     disabled &&
//     `
//     background-color: #efefef;
//   `}
// `;

  return (
    <div>
      <h2>로그인</h2>
      <div>
        <label htmlFor="userId">아이디:</label>
        <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <label htmlFor="userPassword">비밀번호:</label>
        <input type="password" id="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>로그인</button>
    </div>
    // <Container>
    //   <Input id="id" name="id" placeholder="아이디를 입력해주세요" />
    //   <Input
    //     id="password"
    //     name="password"
    //     type="password"
    //     placeholder="비밀번호를 입력해주세요"
    //   />
    //   <Button>로그인</Button>
    // </Container>
  );
};

export default Login;
