import React, { useState } from 'react';
import axios from 'axios';
import address from '../../API_KEY'

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
  );
};

export default Login;
