import { GithubUser } from '../../types/common-types';
import REDUX_ACTION_NAMES from '../../constants/redux-actions-names';

export default function setUserAction(user: GithubUser) {
  return {
    type: REDUX_ACTION_NAMES.SetUser,
    payload: user,
  };
}
