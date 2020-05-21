import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import OAuthRedirect from './components/Redirect/Redirect';
import ROUTES from './constants/routes';
import Header from './components/Header/Header';
import history from './services/history';
import GistPage from './components/GistPage/GistPage';
import StarredGists from './components/StarredGists/StarredGists';
import { GithubUser } from './types/common-types';
import setUserAction from './redux/actions/user-actions';
import PublicGists from './components/PublicGists/PublicGists';
import { getCurrentUserInfo } from './services/apis';
import { getSpecificKeysObjectFromMapping } from './services/common-methods';
import UserKeys from './constants/api-keys-mapping';
import ProfilePage from './components/ProfilePage/ProfilePage';
import CreateGist from './components/CreateGist/CreateGist';

export interface AppProps {
  setUser: Function;
}

function App({ setUser }: AppProps) {
  const setUserInStore = () => {
    getCurrentUserInfo().then((res) => {
      if (typeof res === 'object') {
        setUser(getSpecificKeysObjectFromMapping(UserKeys, res.data));
      }
    });
  };
  useEffect(setUserInStore, []);
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <div className="App-content-container">
          <Switch>
            <Route path={ROUTES.Redirect}>
              <OAuthRedirect onTokenSet={setUserInStore} />
            </Route>
            <Route path={ROUTES.Gist}>
              <GistPage />
            </Route>
            <Route path={ROUTES.Profile}>
              <ProfilePage />
            </Route>
            <Route path={ROUTES.Starred}>
              <StarredGists />
            </Route>
            <Route path={ROUTES.Create}>
              <CreateGist />
            </Route>
            <Route path={ROUTES.Home}>
              <PublicGists />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUser: (userPayload: GithubUser) => {
      dispatch(setUserAction(userPayload));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
