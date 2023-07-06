import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.module.css';


const Footer = () => (
  <footer>
    <div className='contract'>
      <a href='https://forms.gle/2EU6Yud7f5YXeJX18' target='_blank' rel='noreferrer'>削除依頼</a>
      <a href='https://forms.gle/kawPCGBi6NB5pfQz8' target='_blank' rel="noreferrer">お問い合わせ</a>
      <Link to="/lectures/terms">利用規約</Link>
      <Link to="/lectures/policy">プライバシーポリシー</Link>
    </div>
    <div className='copyRight'>
      <img src='/green-title.png' alt='footer-title' />
      <p>© 2023 ガタレビュ！</p>
    </div>

  </footer>
);

export default Footer;
