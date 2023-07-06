import React from 'react';
import { Link } from 'react-router-dom';
import './Header.module.css';


const Header = () => (
  <header>
    <Link to='/lectures/' className='header'>
      <div className='titleCon'>
        <img src="/white-title.png" alt='title' />
      </div>
      <object>
        <Link to="/lectures/new" className='addButton'>
          <button type='button'>授業を登録</button>
        </Link>
      </object>
    </Link>

  </header>
);

export default Header;
