import { all, spawn } from 'redux-saga/effects';

import app from './modules/app';
import appraisals from './modules/appraisals';
import cbb from './modules/cbb';
import dealers from './modules/dealers';
import vehicles from './modules/vehicles';
import sms from './modules/sms';

export default function* rootSaga() {
  yield all([
    spawn(app.saga),
    spawn(appraisals.saga),
    spawn(cbb.saga),
    spawn(dealers.saga),
    spawn(vehicles.saga),
    spawn(sms.saga),
  ]);
}
