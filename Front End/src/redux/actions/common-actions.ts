import REDUX_ACTION_NAMES from '../../constants/redux-actions-names';

export default function setSearchText(searchText: string) {
  return {
    type: REDUX_ACTION_NAMES.SetSearchText,
    payload: searchText,
  };
}
