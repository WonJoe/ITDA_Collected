import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserModal from './UserModal';
import './UserModal.css';
import address from '../../API_KEY'

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selUser, setSelUser] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);
  
  useEffect(() => {
    if (isLoggedIn !== null) {
      getUsers();
    }
  }, [isLoggedIn]);
  

  async function getUsers() {
    try {
      const response = await axios.get(`${address.backendaddress}/users`);
      const users = response.data.filter(users=>users.userGender !== isLoggedIn.userGender)
      setUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleClickUser = async (user) => {

    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.');

      window.location.href = '/login';
      return;
    }

    setSelUser(user);
    setIsShow(true);
  }

  const onClose = () => {
    setSelUser(null);
    setIsShow(false);
  }

  const checkLoginStatus = async () => {
    try {

      const response = await axios.get(`${address.backendaddress}/users/logged-in`, { withCredentials: true });

      setIsLoggedIn(response.data);
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <div>
      <h2>마음에 드는 이성에게 만남을 요청해 보세요!</h2>
      <ul className='user-ul'>
        {Array.isArray(users) && users.map((user) => (
          <li key={user.userId} onClick={() => handleClickUser(user)} className='cursor'>
            <img className="profile-img" src={'./profile/'+user.userProfile} alt='Profile' style={{ width: '100px', height: '100px'}}/><br/>
          <span className='user-name'>{user.userName}</span></li>
        ))}
      </ul>
      {isShow && <UserModal selUser={selUser} onClose={onClose} isShow={isShow} />}
    </div>
  );
};

export default UserList;
