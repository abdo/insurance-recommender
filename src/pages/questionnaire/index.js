import React, { useState } from 'react';

import isEmail from '../../helpers/isEmail';
import mainQuestions from '../../constants/mainQuestions';

import '../../styles/_global.scss';
import './styles.scss';

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    Object.assign(...mainQuestions.map((question) => ({ [question.key]: '' }))),
  );

  const currentQuestion = mainQuestions[currentQuestionIndex];

  const isValidInput = () => {
    const { key: currentQuestionKey } = currentQuestion;
    const enteredValue = answers[currentQuestionKey];
    const { required, validations = [] } = currentQuestion;

    const noValue = !(enteredValue || enteredValue === 0);
    if (required && noValue) {
      return false;
    }

    if (validations.includes('email')) {
      return isEmail(enteredValue);
    }

    return true;
  };

  const onInputChange = (value) => {
    const { key: currentQuestionKey } = currentQuestion;
    setAnswers({ ...answers, [currentQuestionKey]: value });
  };

  const isLastQuestion = currentQuestionIndex === mainQuestions.length - 1;
  const actionButtonText = isLastQuestion ? 'Submit' : 'Next';
  const onNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const onSubmit = () => {};
  const onClickActionButton = isLastQuestion ? onSubmit : onNext;

  const { text, label, required, validations } = currentQuestion;

  return (
    <div className='pageContainer'>
      <p className='questionText'>{`${required ? '*' : ''}${text}`}</p>
      <input
        className='mainTextInput'
        placeholder={label}
        onChange={(e) => onInputChange(e.target.value)}
      />

      {validations && `Please enter a valid ${label}`}

      <button
        className='mainButton'
        onClick={onClickActionButton}
        disabled={!isValidInput()}
      >
        {actionButtonText}
      </button>
    </div>
  );
};

export default Questionnaire;
