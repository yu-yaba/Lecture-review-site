/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.module.css';


const Header = () => (
  <header>
    <Link to='/lectures/'>
      <h2 className="title">新潟大学授業レビュー</h2>
    </Link>
  </header>
);

export default Header;
