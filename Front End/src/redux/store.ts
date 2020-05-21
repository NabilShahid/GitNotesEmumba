import { createStore, combineReducers } from 'redux';
import { ReduxAction } from '../types/common-types';
import userReducer from './reducers/user-reducer';
import commonReducer from './reducers/common-reducer';

const appReducer = combineReducers({
  userReducer,
  commonReducer,
});
/**
 * root reducer to empty all reducer states
 */
const rootReducer = (state: any, action: ReduxAction) => {
  if (action.type === 'FLUSH_STORE') state = undefined;

  return appReducer(state, action);
};

// cleanup_required
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}
export default createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
