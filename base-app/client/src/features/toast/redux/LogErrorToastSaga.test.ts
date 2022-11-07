import { PayloadAction } from '@reduxjs/toolkit';
import { expectSaga } from 'redux-saga-test-plan';

import { ToastOptions } from '../types';
import { fakeAnalytics, logErrorToasts } from './LogErrorToastSaga';

/* ---------------------------------- error --------------------------------- */
const errorToastOptions = {
  title: 'error ja ',
  status: 'error',
} as ToastOptions;
const errorToastAction: PayloadAction<ToastOptions> = {
  type: 'อะไรก็ได้เพราะในที่นี้เราแค่ต้องการ payload',
  payload: errorToastOptions,
};

test('saga call analytic when it call error', () => {
  expectSaga(logErrorToasts, errorToastAction)
    .call(fakeAnalytics, 'error ja ')
    .run();
});

/* ---------------------------------- pass ---------------------------------- */
const passToastOptions = {
  title: 'not error jaaa',
  status: 'success',
} as ToastOptions;
const passToastAction: PayloadAction<ToastOptions> = {
  type: 'อะไรก็ได้เพราะในที่นี้เราแค่ต้องการ payload',
  payload: passToastOptions,
};
test('if no error analytics will not call error', () => {
  expectSaga(logErrorToasts, passToastAction)
    // วิธีนี้ก็ได้แต่ไม่ค่อยดีเท่าไหร่ เพราะเราแค่ไม่อยากให้มัน call fakeAnalytic เราจึงใช้ partial assertion แทน
    .not.call(fakeAnalytics, 'error ja awd')
    .run();
});

/* -------------------- pass toast with partial assertion ------------------- */
test('if no error analytics will not call error', () => {
  // เป็นการบอกแค่ว่าไม่จำเป็นต้อง call fake analytic ซึ่งดีตรงที่ไม่ต้องใส่ arguments
  expectSaga(logErrorToasts, passToastAction).not.call.fn(fakeAnalytics).run();
});
