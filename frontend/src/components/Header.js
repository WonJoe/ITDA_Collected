import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IoDiamondOutline } from "react-icons/io5";
import './Header.css';

const Header = ({ user, handleLogout, isLoading }) => {

    // useEffect(() => {
    //     if (isLoading) {
    //     }
    // }, [isLoading]);

    return (
        <Navbar style={{ backgroundColor: 'pink', height: '80px' }} data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="nav-link-home">IT-DA</Navbar.Brand>
                <Nav className="me-auto" variant="pills" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/users" className="nav-link" activeClassName="active-link">이성 찾기</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/req_list" className="nav-link" activeClassName="active-link">만남 신청</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/schedule" className="nav-link" activeClassName="active-link">만남 일정</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/distanceReq" className="nav-link" activeClassName="active-link">거리순 매칭</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/board" className="nav-link" activeClassName="active-link">게시판</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/WeatherAndFashion" className="nav-link" activeClassName="active-link">날씨 조회, 데이트룩</Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                        <Nav.Link as={NavLink} to="/createUser" className="nav-link" activeClassName="active-link">회원가입</Nav.Link>
                    </Nav.Item> */}
                    {/* <Nav.Item>
                        <Nav.Link as={NavLink} to="/charge" className="nav-link" activeClassName="active-link">다이아 구매</Nav.Link>
                    </Nav.Item> */}
                    {/* <Nav.Item>
                        <Nav.Link as={NavLink} to="/basket" className="nav-link" activeClassName="active-link">장바구니</Nav.Link>
                    </Nav.Item> */}
                    {/* <Nav.Item>
                        <Nav.Link as={NavLink} to="/pay" className="nav-link" activeClassName="active-link">결제</Nav.Link>
                    </Nav.Item> */}
                </Nav>
                {user ? (
                    <Nav>
                        <NavDropdown className="nav-dropdown-item" title={`${user.userName} 님 반갑습니다.  `}>
                            <NavDropdown.Item className="nav-dropdown-item"><IoDiamondOutline /> {user.diaQty.toLocaleString()}</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/charge" className="nav-dropdown-item">다이아 구매</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/basket" className="nav-dropdown-item">구매 목록</NavDropdown.Item>
                            <NavDropdown.Item className="nav-dropdown-item" onClick={handleLogout}>로그아웃</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                ) : (


                        <NavLink to="/login" className="nav-link" activeClassName="active-link">로그인</NavLink>


                )}
            </Container>
        </Navbar>
    );
};

export default Header;
