import { connect } from 'react-redux';
import React, { useState } from 'react';

import * as RecommendationActions from '../../store/actions/recommendationActions';
import isEmail from '../../helpers/isEmail';
import mainQuestions from '../../constants/mainQuestions';

import '../../styles/_global.scss';
import './styles.scss';

const Questionnaire = ({ sendData, fetchRecommendations, history }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    Object.assign(...mainQuestions.map((question) => ({ [question.key]: '' }))),
  );

  const currentQuestion = mainQuestions[currentQuestionIndex];
  const {
    text,
    label,
    required,
    validations,
    key: currentQuestionKey,
    type: inputType = 'text',
    options,
  } = currentQuestion;

  const isValidInput = () => {
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
    setAnswers({ ...answers, [currentQuestionKey]: value });
  };

  const isLastQuestion = currentQuestionIndex === mainQuestions.length - 1;
  const actionButtonText = isLastQuestion ? 'Submit' : 'Next';
  const onNext = ({ steps = 1 }) => {
    if (!isValidInput()) {
      return;
    }
    const nextQuestionIndex = currentQuestionIndex + steps;
    const { dependency: nextQuestionDependency } = mainQuestions[
      nextQuestionIndex
    ];

    const dependencyAnswer = answers[nextQuestionDependency];
    if (
      nextQuestionDependency &&
      (!dependencyAnswer || dependencyAnswer === 'false')
    ) {
      onNext({ steps: steps + 1 });
      return;
    }

    setCurrentQuestionIndex(nextQuestionIndex);
  };
  const onSubmit = () => {
    const { childrenPossession, numberOfChildren, ...userData } = answers;
    userData.numberOfChildren = Number(numberOfChildren) || 0;

    const afterSendingUserData = () => {
      fetchRecommendations();
      history.push('/result');
    };

    sendData(userData, afterSendingUserData);
  };
  const onClickActionButton = isLastQuestion ? onSubmit : onNext;

  const getInput = () => {
    if (inputType === 'radio') {
      return (
        <>
          {options.map(({ label, value }) => (
            <div className='radioInputContainer' key={value}>
              <input
                type='radio'
                data-test={`${currentQuestionKey}-input-${value}`}
                name={currentQuestionKey}
                value={value}
                onChange={(e) => onInputChange(e.target.value)}
              />
              <p>{label}</p>
            </div>
          ))}
        </>
      );
    }

    return (
      <input
        className='mainTextInput'
        placeholder={label}
        type={inputType}
        data-test={`${currentQuestionKey}-input`}
        value={answers[currentQuestionKey]}
        onChange={(e) => onInputChange(e.target.value)}
      />
    );
  };

  return (
    <div className='pageContainer'>
      <p className='questionText'>{`${required ? '*' : ''}${text}`}</p>
      {getInput()}
      {validations && `Please enter a valid ${label}`}

      <button
        className='mainButton'
        onClick={onClickActionButton}
        disabled={!isValidInput()}
        data-test="action-button"
      >
        {actionButtonText}
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  sendData: RecommendationActions.sendData,
  fetchRecommendations: RecommendationActions.fetchRecommendations,
};

export default connect(null, mapDispatchToProps)(Questionnaire);
