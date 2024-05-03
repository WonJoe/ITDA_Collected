import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResModal from './ResModal';
import './UserModal.css';
import address from '../../API_KEY'

const ReqList = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    fetchRequests();
    checkLoginStatus();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/req_meet/requests`, {
        withCredentials: true
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleClickRequest = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/users/logged-in`, { withCredentials: true });
      setIsLoggedIn(response.data);
      setCurrentUser(response.data.userId);
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleAccept = async () => {
    try {
      handleCloseModal();
      fetchRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejected = async () => {
    try {
      handleCloseModal();
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div>
      <h2>새로운 만남 요청이 들어왔습니다.</h2>
      <ul className='user-ul'>
      {requests.map((request) => (
  request.recipient.userId === currentUser && request.status === 'WAITING' &&(
    <li key={request.no} onClick={() => handleClickRequest(request)} className='cursor user-li'>
      <img className="profile-img" src={'./profile/' + request.sender.userProfile} alt="Profile" style={{ width: '100px', height: '100px'}}/><br/>
      <span className='user-name'>{request.sender.userName}</span>
    </li>
  )
))}

      </ul>
      {showModal && selectedRequest && <ResModal request={selectedRequest} onClose={handleCloseModal}  onAccept={handleAccept} onRejected={handleRejected} isLoggedIn={isLoggedIn} />}
    </div>
  );
};

export default ReqList;
