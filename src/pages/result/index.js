import { connect } from 'react-redux';
import React from 'react';

import './styles.scss';

const Result = ({ insuranceTypes, history }) => {
  if (!insuranceTypes) {
    history.push('/');
    return null;
  }

  return (
    <>
      {insuranceTypes.map(({ type, price: { amount, periodicity } }) => (
        <div className='recommendation' key={type}>
          <div className='recommendationType'>
            {type.replace('_', ' ').toLowerCase()}
          </div>
          <div className='recommendationPrice'>
            €{amount} per {periodicity}
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  insuranceTypes: state.recommendations.insuranceTypes,
});

export default connect(mapStateToProps)(Result);
