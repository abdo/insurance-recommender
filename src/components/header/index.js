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
      <p>Insurance Recommender</p>
      {paperEmoji}
    </header>
  );
};

export default Header;
