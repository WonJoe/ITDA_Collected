import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserModal from './UserModal';
import './UserModal.css';
import './board.css';
import address from '../../API_KEY'
import { BsEnvelopePaperHeart } from "react-icons/bs";
import './UserList.css'
import { GoChevronUp } from "react-icons/go";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selUser, setSelUser] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 페이지가 스크롤될 때마다 상태 업데이트
  window.addEventListener('scroll', handleScroll);

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
      {isVisible && (
        <div className='tabscroll' onClick={scrollToTop}><GoChevronUp style={{fontSize:'25px'}} /></div>
      )}
            <img src='./userListBg/service.png' alt='service' style={{marginTop:'100px'}}/>
      <img src='./userListBg/bg2.png' alt='service' style={{width:'1400px', marginTop:'100px'}}/>
      <img src='./userListBg/bg3.png' alt='service' style={{width:'1400px', marginTop:'100px'}}/>
      <div id="carouselExample" className="carousel slide" style={{marginLeft:'0px'}}>
        <br/>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="./userListBg/slide1.png" className="d-block w-100" alt="slide1"/>
          </div>
          <div className="carousel-item">
            <img src="./userListBg/slide2.png" className="d-block w-100" alt="slide2" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <img src='./userListBg/bg4.png' alt='service' style={{width:'1400px', marginTop:'100px'}}/>
    <div className="board-container" style={{marginBottom:'100px', marginTop:'100px'}} >
      <ul className='user-ul'>
        {Array.isArray(users) && users.map((user) => (
      <div  className="board_post">
          <li key={user.userId} onClick={() => handleClickUser(user)} className='cursor'>
            <img className="profile-img" src={'./profile/'+user.userProfile} alt='Profile' style={{ width: '100px', height: '100px'}}/><br/>
          <span className='user-name'>{user.userName}</span></li> 
            </div>
        ))}
      </ul>
      {isShow && <UserModal selUser={selUser} onClose={onClose} isShow={isShow} />}
    </div>
    </div>
  );
};

export default UserList;
