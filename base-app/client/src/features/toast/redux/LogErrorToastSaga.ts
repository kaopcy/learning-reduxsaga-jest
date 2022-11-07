import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import { ToastOptions } from '../types';
import { showToast } from './toastSlice';

// presumably this would send the toast to some analytics engine
const logErrorToast = (title: string) => {
  // eslint-disable-next-line no-console
  console.error('Got error toast!', title);
};

// fake analytics
export const fakeAnalytics = (title: string) => {
  console.log('analytic sended', title);
};

export function* logErrorToasts({
  payload,
}: PayloadAction<ToastOptions>): SagaIterator {
  const { title, status } = payload;
  if (status === 'error') {
    // yield call(logErrorToast, title);
    yield call(fakeAnalytics, title);
  }
  yield put(showToast({ title, status }));
}

// not very useful, didn't bother adding to root saga
export function* watchToasts(): SagaIterator {
  yield takeEvery(showToast.type, logErrorToasts);
}
