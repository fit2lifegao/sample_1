import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import app from './modules/app';
import appraisals from './modules/appraisals';
import cbb from './modules/cbb';
import dealers from './modules/dealers';
import vehicles from './modules/vehicles';
import sms from './modules/sms';
import deallog from './modules/deallog';

const rootReducer = combineReducers({
  [app.constants.NAME]: app.reducer,
  [appraisals.constants.NAME]: appraisals.reducer,
  [cbb.constants.NAME]: cbb.reducer,
  [dealers.constants.NAME]: dealers.reducer,
  [vehicles.constants.NAME]: vehicles.reducer,
  [sms.constants.NAME]: sms.reducer,
  [deallog.constants.NAME]: deallog.reducer,
  form: reduxFormReducer,
});

export default rootReducer;
