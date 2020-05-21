import * as React from 'react';
import './UserMenu.css';
import history from '../../services/history';
import ROUTES from '../../constants/routes';
import { GITHUB_PROFILE_BASE_URL } from '../../constants/github-app-info';
import { signOutRoutine } from '../../services/common-methods';

export interface UserMenuProps {
  login: string;
}

const UserMenu: React.SFC<UserMenuProps> = ({ login }: UserMenuProps) => {
  return (
    <div className="user-menu material-box-shadow">
      <div className="user-menu-item">Signed in as</div>
      <div className="user-menu-item">{login}</div>
      <div className="user-menu-item-seperator" />
      <div
        className="user-menu-item user-menu-clickable"
        role="button"
        onClick={() => {
          history.push(ROUTES.Create);
        }}
        onKeyPress={() => {
          history.push(ROUTES.Create);
        }}
        tabIndex={0}
      >
        Create gist
      </div>
      <div
        className="user-menu-item user-menu-clickable"
        role="button"
        onClick={() => {
          history.push(ROUTES.Profile);
        }}
        onKeyPress={() => {
          history.push(ROUTES.Profile);
        }}
        tabIndex={0}
      >
        Your gists
      </div>
      <div
        className="user-menu-item user-menu-clickable"
        role="button"
        tabIndex={0}
        onClick={() => {
          history.push(ROUTES.Starred);
        }}
        onKeyPress={() => {
          history.push(ROUTES.Starred);
        }}
      >
        Starred gists
      </div>
      <div
        className="user-menu-item user-menu-clickable"
        role="button"
        onClick={() => {}}
        onKeyPress={() => {}}
        tabIndex={0}
      >
        Help
      </div>
      <div className="user-menu-item-seperator" />
      <div
        className="user-menu-item user-menu-clickable"
        role="button"
        onClick={() => {
          window.open(GITHUB_PROFILE_BASE_URL + login, '_blank');
        }}
        onKeyPress={() => {
          window.open(GITHUB_PROFILE_BASE_URL + login, '_blank');
        }}
        tabIndex={0}
      >
        Your GitHub profile
      </div>
      <div
        className="user-menu-item user-menu-clickable"
        role="button"
        onClick={() => {
          signOutRoutine();
        }}
        onKeyPress={() => {
          signOutRoutine();
        }}
        tabIndex={0}
      >
        Sign out
      </div>
    </div>
  );
};

export default UserMenu;
