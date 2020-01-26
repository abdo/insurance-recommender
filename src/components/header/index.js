import { Link } from 'react-router-dom';
import React from 'react';

import './styles.scss';

const Header = () => {
  const paperEmoji = (
    <span role='img' aria-label='paper'>
      📜
    </span>
  );
  return (
    <header className='header'>
      {paperEmoji}
      <Link to="/">
        <p>Insurance Recommender</p>
      </Link>
      {paperEmoji}
    </header>
  );
};

export default Header;
