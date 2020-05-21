import { ReduxAction } from '../../types/common-types';
import { UserState } from '../../types/states';
import REDUX_ACTION_NAMES from '../../constants/redux-actions-names';

const userReducer = (
  state = {
    User: { AvatarUrl: '', Login: '' },
  },
  action: ReduxAction,
) => {
  let newState: UserState;

  switch (action.type) {
    case REDUX_ACTION_NAMES.SetUser:
      newState = { ...state };
      newState.User = action.payload;
      state = newState;
      break;
    default: {
      break;
    }
  }
  return state;
};

export default userReducer;
