import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import counterSlice from '../ducks/counter/slice';
import { useCounterState } from '../ducks/counter/selectors';
import { asyncIncrementCounter } from '../ducks/counter/asyncActions';

const StyledMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const CounterPage: React.FC = () => {
  const dispatch = useDispatch();
  const state = useCounterState().counter;

  const onClickIncrement = () => {
    dispatch(counterSlice.actions.incrementCounter(1));
  };

  const onClickDecrement = () => {
    dispatch(counterSlice.actions.decrementCounter(1));
  };

  const onClickAsyncIncrement = async () => {
    await dispatch(asyncIncrementCounter(10));
  };
  
  return (
    <>
      <button type="button" onClick={onClickIncrement}>
        ふやす
      </button>
      <button type="button" onClick={onClickDecrement}>
        へらす
      </button>
      <p>ねこが{state.count} 匹いる</p>
      <button
        type="button"
        onClick={onClickAsyncIncrement}
        disabled={state.loading}
      >
        非同期でふやす
      </button>
      <p>ねこが{state.count} 匹いる</p>
      {state.loading ? <p>通信中</p> : ''}
      {state.error ? (
        <StyledMessage>問題が発生しました。{state.errorMessage}</StyledMessage>
      ) : (
        ''
      )}
    </>
  );
};

export default CounterPage;
