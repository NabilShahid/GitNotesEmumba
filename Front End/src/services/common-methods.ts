import confirmDialog from './dialogService';
import CONFIRM_MESSAGES from '../constants/confirm-messages';

// cleanup_required
export default 1;
export function getSpecificKeysObject(keys: Array<string>, object: any) {
  return keys.reduce((prev: any, curr: string) => {
    prev[curr] = object[curr];
    return prev;
  }, {});
}

export function getSpecificKeysObjectFromMapping(mapping: any, object: any) {
  return Object.keys(mapping).reduce((prev: any, curr: string) => {
    prev[curr] = object[mapping[curr]];
    return prev;
  }, {});
}

export function signOutRoutine() {
  confirmDialog(CONFIRM_MESSAGES.SignOut).then(() => {
    localStorage.clear();
    window.location.reload();
  });
}
