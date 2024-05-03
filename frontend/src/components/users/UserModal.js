import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './UserModal.css';
import MeetRequest from './MeetRequest';

const UserModal = ({ selUser, onClose }) => {
    const [showMeetRequestModal, setShowMeetRequestModal] = useState(false);
    const [requestButtonText, setRequestButtonText] = useState('데이트 신청하기');

    const handleMeetRequest = () => {
        setShowMeetRequestModal(true);
        setRequestButtonText('요청창 닫기');
    };

    const handleCancelRequest = () => {
        setShowMeetRequestModal(false);
        setRequestButtonText('데이트 신청하기');
    };

    return (
        <div className='Modal'>
            <div className='bg'></div>
            <div className='popup'>
                <img src={'./profile/' + selUser.userProfile} alt='Profile' width='400px' height='auto' />
                <h2>{selUser.userName}</h2>
                <p>#{selUser.userAge}살 #{selUser.userAddress} #{selUser.userMBTI}</p>
                <span><button onClick={onClose}><AiOutlineClose /></button></span>
                {showMeetRequestModal && (
                <div className="MeetRequestModal">
                    <MeetRequest selUser={selUser} />
                </div>
            )}
                <div>
                    {showMeetRequestModal ? (
                        <button className="button" onClick={handleCancelRequest}>{requestButtonText}</button>
                    ) : (
                        <button className="button" onClick={handleMeetRequest}>{requestButtonText}</button>
                    )}
                </div>
            </div>
         
        </div>
    );
};

export default UserModal;
