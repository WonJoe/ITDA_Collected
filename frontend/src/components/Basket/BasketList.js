import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasketItem from './BasketItem';

const BasketList = () => {
    const [lists, setLists] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
        fetchData();
      }, []);
      
      const checkLoginStatus = async () => {
        try {
          const response = await axios.get("http://localhost:4000/users/logged-in", { withCredentials: true });
          setIsLoggedIn(response.data);
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };

        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/basketList", { withCredentials: true });
                setLists(res.data);
            } catch (error) {
                console.log(error);
            }
        };

    const paymentReady = async () => {
        if (lists.length === 0) {
            alert("장바구니가 비어 있습니다.");
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:4000/api/processPayments', {
                lists: lists
            });
            // 성공 응답 확인 조건 변경
            if (response.data === "Success") {
                alert("결제가 준비되었습니다.");
            } else {
                alert("결제 준비 실패: " + response.data);
            }
        } catch (error) {
            console.error('결제 준비 실패:', error);
            alert("결제 준비 과정에서 문제가 발생했습니다.");
        }
    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }}>{isLoggedIn.userName}님의 장바구니</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '2px solid black', padding: '10px' }}>
                <span>순번</span>
                <span>다이아몬드 수량</span>
                <span>날짜</span>
                <span>가격</span>
            </div>
            {lists.map((item, index) => (
                <BasketItem key={index} item={item} index={index} />
            ))}
             <button onClick={paymentReady} style={{ margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>구매하기</button>
        </div>
    );
};

export default BasketList;