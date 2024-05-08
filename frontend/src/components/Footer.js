import React from 'react';
import './Footer.css'
import { LuGripVertical } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
      <hr className="small" />
        <div className="row">
          {/* <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book.
            </p>
          </div> */}
          {/* <div className="col-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links ">
              <li><a href="/">Website Design</a></li>
              <li><a href="/">UI Design</a></li>
              <li><a href="/">Web Development</a></li>
              <li><a href="/">Video Editor</a></li>
              <li><a href="/">Theme Creator</a></li>
              <li><a href="/">Templates</a></li>
            </ul>
          </div> */}
          <div className="col-6 col-md-3" style={{width : '100%'}}>
            {/* <h6>Quick Links</h6> */}
            <ul className="footer-links">
              <li><a href="/ConditionsOfUse">개인정보 처리방침</a></li>
              <LuGripVertical />
              <li><a href="/PrivacyPolicy">이용약관</a></li>
              <LuGripVertical />
              <li><a href="/LocationServicePolicy">위치기반서비스 이용약관</a></li>
              <LuGripVertical />
              <li><a href="/YouthProtectionPolicy">청소년보호정책</a></li>
            </ul>
          </div>
        </div>
        
      </div>
      
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-12">
            <p className="copyright-text">
              Copyright © 2024 All Rights Reserved by &nbsp;
              <a href="/"><span className="logo">ITDA.</span></a>
            </p>
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <ul className="social-icons">
              {/* <li>
                <a className="facebook" href="/"><i className="fab fa-facebook-f"></i></a>
              </li>
              <li>
                <a className="twitter" href="/"><i className="fab fa-twitter"></i></a>
              </li> */}
              <li style={{width:'40px'}}>
                <a className="dribbble" href="https://github.com/Uangi/ITDA">
                  <img style={{width:'100%', margin:'auto'}} src='img/githubicon.png' alt='깃허브 이미지'></img></a>
              </li>
              <li style={{width:'40px'}}>
                <a className="linkedin" href="https://github.com/WonJoe/ITDA_Collected">
                  <img style={{width:'100%', margin:'auto'}} src='img/githubicon.png' alt='깃허브 이미지'></img></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;