import React, { useEffect, useState } from 'react';
import { IoDiamondOutline } from "react-icons/io5";
import axios from 'axios';
import './Charge.css';
import address from '../../API_KEY'

const Charge = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
      }, []);

      const checkLoginStatus = async () => {
        try {
          const response = await axios.get(`${address.backendaddress}/users/logged-in`, { withCredentials: true });
          setIsLoggedIn(response.data);
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };

    const options = [
        { diamonds: 100, price: 1 },
        { diamonds: 300, price: 2 },
        { diamonds: 500, price: 3 },
        { diamonds: 700, price: 4 },
        { diamonds: 1000, price: 5 }
    ];

    const addToCart = async () => {
        if (!selectedOption) {
            alert("다이아를 선택해 주세요.");
            return;
        }
        try {
            const response = await axios.post(`${address.backendaddress}/api/addToCart`, {
                id: isLoggedIn.userId,
                name: isLoggedIn.userName,
                diamonds: selectedOption.diamonds,
                price: selectedOption.price
            });
            alert("장바구니에 추가되었습니다.");
        } catch (error) {
            console.error('장바구니 추가 실패:', error);
            alert("장바구니 추가에 실패했습니다.");
        }
    };

    const paymentReady = async() => {
        if (!selectedOption) {
            alert("다이아를 선택해 주세요.");
            return;
        }
        try {
            const response = await axios.post(`${address.backendaddress}/api/paymentReady`, {
                id: isLoggedIn.userId,
                diamonds: selectedOption.diamonds,
                price: selectedOption.price
            });
            alert("결제페이지에 추가되었습니다.");
        } catch (error) {
            console.error('장바구니 추가 실패:', error);
            alert("결제페이지 추가에 실패했습니다.");
        }
    };


    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{marginTop:'90px'}}>다이아 충전</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '600px', margin: 'auto',marginTop:'50px' }}>
                {options.map((option, index) => (
                    <div key={index} style={{ width: '120px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px' }}>
                        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                            <IoDiamondOutline size="50px" color="#4A90E2" />
                            <div style={{ fontSize: '20px', marginTop: '10px' }}>{option.diamonds} 개</div>
                            <input
                                type="radio"
                                name="diamonds"
                                value={option.diamonds}
                                checked={selectedOption?.diamonds === option.diamonds}
                                onChange={() => setSelectedOption(option)}
                                style={{ marginTop: '10px' }}
                            />
                        </label>
                        <div style={{ fontSize: '18px', color: '#4A90E2', fontWeight: 'bold', marginTop: '10px' }}>{option.price} 원</div>
                    </div>
                ))}
            </div>
            <button className='button_blue' onClick={addToCart} style={{ margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop:'50px' }}>장바구니에 추가</button>
            <button className='button_blue' onClick={paymentReady} style={{ margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>구매하기</button>
        </div>
    );
};

export default Charge;