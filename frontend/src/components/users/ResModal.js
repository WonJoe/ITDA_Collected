import React, { useEffect, useState } from 'react';
import './UserModal.css';
import { AiOutlineClose } from 'react-icons/ai';
import { format } from 'date-fns';
import axios from 'axios';
import address from '../../API_KEY'

const ResModal = ({ request, onClose, onAccept, onRejected, isLoggedIn }) => {
  const [sessionId, setSessionId] = useState('');

  const formatMeetingDateTime = (date) => {
    const formattedDate = format(new Date(date), 'yyyy년 MM월 dd일');
    return `${formattedDate}`;
  };

  useEffect(() => {
    fetchSessionId();
  }, []);

  const fetchSessionId = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/get_session_user_id`, {
        withCredentials: true 
      });
      setSessionId(response.data);
    } catch (error) {
      console.error('Error fetching session id:', error);
    }
  };

  const handleAccept = async () => {
    try {
      const requestData = {
          senderUserId: request.senderUserId,
          recipientUserId: sessionId
      };

      const response = await axios.post(`${address.backendaddress}/req_meet/accept_request`, requestData, {
          headers: {
              'Authorization': `Bearer ${sessionId}`
          }
      });
      
      await onAccept();
      onClose();
      window.alert('요청이 수락되었습니다.')
      window.location.href='/schedule';
      
    } catch (error) {
      console.error('Error accepting request:', error);
      
    }
  };

  const handleRejected = async () => {
    try {
      const requestData = {
          senderUserId: request.senderUserId,
          recipientUserId: sessionId
      };

      const response = await axios.post(`${address.backendaddress}/req_meet/reject_request`, requestData, {
          headers: {
              'Authorization': `Bearer ${sessionId}`
          }
      });
      
      await onRejected();
      onClose();
      window.alert('요청이 거절되었습니다.')
      window.location.reload();
      
    } catch (error) {
      console.error('Error accepting request:', error);
      
    }
  };

  return (
    <div className="Modal">
       <div className='bg'></div>
       <div className='popup'>
        <h2>{request.sender.userName} 님께서 만남 요청을 하셨어요</h2>
        <img src={'./profile/' + request.sender.userProfile} alt="프로필 사진" />
        <p>#{request.sender.userName} #{request.sender.userAge}살 #{request.sender.userAddress}</p>
        <p>{formatMeetingDateTime(request.meetingDate)} {request.meetingTime}<br/>{request.meetingPlace}에서 만나고 싶어요!</p>

        <span><button onClick={onClose}><AiOutlineClose /></button></span>
        {isLoggedIn && (
          <div>
             <button className="button_green" onClick={handleAccept}>수락</button>&nbsp;&nbsp;&nbsp;
            <button className="button_red" onClick={handleRejected}>거절</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResModal;
