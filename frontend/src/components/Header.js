import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { IoDiamondOutline } from "react-icons/io5";
import address from '../API_KEY'

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, [setUser]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${address.backendaddress}/users/logged-in`, { withCredentials: true });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${address.backendaddress}/logout`, null, { withCredentials: true });
            setUser(null);
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <Navbar style={{backgroundColor: 'pink'}} data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">IT-DA</Navbar.Brand>
                <Nav className="me-auto">
                    <Link to="/users" className="nav-link">이성 찾기</Link>
                    <Link to="/req_list" className="nav-link">만남 신청</Link>
                    <Link to="/schedule" className="nav-link">만남 일정</Link>
                    <Link to="/board" className="nav-link">게시판</Link>
                    <Link to ="/distanceReq" className="nav-link">거리순 매칭</Link>
                    <Link to ="/createUser" className="nav-link">회원가입</Link>
                </Nav>
                {user ? (
                    <>
                        <span>{user.userName} 님 반갑습니다.  <IoDiamondOutline />{user.diaQty}</span>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <Link to="/login" className="nav-link">로그인</Link>
                )}
            </Container>
        </Navbar>
    );
};

export default Header;
