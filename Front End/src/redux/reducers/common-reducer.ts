import { CommonState } from '../../types/states';
import { ReduxAction } from '../../types/common-types';
import REDUX_ACTION_NAMES from '../../constants/redux-actions-names';

const commonReducer = (
  state = {
    SearchText: '',
  },
  action: ReduxAction,
) => {
  let newState: CommonState;

  switch (action.type) {
    case REDUX_ACTION_NAMES.SetSearchText:
      newState = { ...state };
      newState.SearchText = action.payload;
      state = newState;
      break;
    default: {
      break;
    }
  }
  return state;
};

export default commonReducer;
