import React from 'react';

import '../../styles/_global.scss';
import './styles.scss';

const Questionnaire = () => {
  return (
    <div className='pageContainer'>
      <p className='questionText'>What's your first name?</p>
      <input className='mainTextInput' />
      <button className='mainButton'>Next</button>
    </div>
  );
};

export default Questionnaire;
