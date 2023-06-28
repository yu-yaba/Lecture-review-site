import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.module.css';


const Footer = () => (
  <footer>
    <div className='contract'>
      <p>お問い合わせ</p>
      <Link to="/privacy">利用規約</Link>
      <Link to="/terms">プライバシーポリシー</Link>
    </div>
    <div className='copyRight'>
      <img src='/green-title.png' alt='footer-title' />
      <p>© 2023 ガタレビュ！</p>
    </div>

  </footer>
);

export default Footer;
