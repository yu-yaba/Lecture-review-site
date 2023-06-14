import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <Link to='/lectures/'>
    <h1>Lecture review</h1>
    </Link>
  </header>
);

export default Header;