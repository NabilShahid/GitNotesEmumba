import * as React from 'react';
import { connect } from 'react-redux';
import Popover from 'react-popover';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useEffect } from 'react';
import { REDIRECT_URL } from '../../constants/github-app-info';
import ActionButton from '../ActionButton/ActionButton';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import eMumbaLogo from '../../assets/images/emumba-white-logo.png'; // Tell webpack this JS file uses this image
import { getToken } from '../../services/local-storage';
import UserAvatar from '../UserAvatar/UserAvatar';
import history from '../../services/history';
import ROUTES, { ROUTES_WITH_SEARCH } from '../../constants/routes';
import UserMenu from '../UserMenu/UserMenu';
import setSearchText from '../../redux/actions/common-actions';

export interface HeaderProps {
  avatarUrl?: string;
  login?: string;
  setSearchTextAction?: Function;
}
const Header: React.SFC<HeaderProps> = ({
  avatarUrl,
  setSearchTextAction,
  login,
}: HeaderProps) => {
  const [popoverOpen, setPopoverOpen]: [boolean, Function] = React.useState(
    false,
  );

  const [showSearch, setShowSearch]: [boolean, Function] = React.useState(
    ROUTES_WITH_SEARCH.includes(history.location.pathname),
  );
  useEffect(() => {
    history.listen(() => {
      setShowSearch(ROUTES_WITH_SEARCH.includes(history.location.pathname));
      setPopoverOpen(false);
      if (typeof setSearchTextAction === 'function') setSearchTextAction('');
    });
  }, []);

  return (
    <header className="header material-box-shadow">
      <div style={{ flex: '0 1 6%' }} />
      <div
        className="text-align-right cursor-pointer"
        style={{ flex: '0 0 15%', marginTop: '5px' }}
        onClick={() => {
          history.push(ROUTES.Home);
        }}
        role="button"
        onKeyPress={() => {}}
        tabIndex={0}
      >
        <img src={eMumbaLogo} className="header-emumba-logo" alt="EMUMBA" />
      </div>
      <div style={{ flex: '0 1 45%' }} />
      <div
        className="text-align-right"
        style={{ flex: '0 0 25%', marginTop: '3px' }}
      >
        {showSearch && (
          <SearchBar
            input={(event) => {
              if (typeof setSearchTextAction === 'function') {
                const element = event.currentTarget as HTMLInputElement;
                setSearchTextAction(element.value);
              }
            }}
            placeholder="Search Notes"
          />
        )}
      </div>
      <div
        style={{
          flex: '0 0 12%',
          textAlign: 'left',
          margin: '5px 0 0 22px',
          height: 0,
        }}
      >
        {getToken() ? (
          <Popover
            isOpen={popoverOpen}
            place="below"
            body={<UserMenu login={login || ''} />}
          >
            <button
              onClick={() => {
                setPopoverOpen(!popoverOpen);
              }}
              type="button"
              className="transparent-button cursor-pointer"
            >
              <UserAvatar
                src={avatarUrl || ''}
                style={{ width: '40px', marginTop: '-4px' }}
              />
            </button>
          </Popover>
        ) : (
          <ActionButton
            click={() => {
              window.location.href = REDIRECT_URL;
            }}
            text="Login"
          />
        )}
      </div>
    </header>
  );
};
/**
 * state to props mapping
 */
const mapStateToProps = (state: any) => {
  return {
    avatarUrl: state.userReducer.User.AvatarUrl,
    login: state.userReducer.User.Login,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSearchTextAction: (searchText: string) => {
      dispatch(setSearchText(searchText));
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
