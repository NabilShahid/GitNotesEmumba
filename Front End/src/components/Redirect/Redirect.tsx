import * as React from 'react';
import { useEffect } from 'react';
import { authenticateUser } from '../../services/apis';
import { CLIENT_ID } from '../../constants/github-app-info';
import { saveToken } from '../../services/local-storage';

import ROUTES from '../../constants/routes';
import history from '../../services/history';

const validateSession = async (): Promise<string> => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code') || '';
  const result = await authenticateUser(CLIENT_ID, code);
  return result.data;
};

export interface OAuthRedirectProps {
  onTokenSet: Function;
}

const OAuthRedirect: React.SFC<OAuthRedirectProps> = ({
  onTokenSet,
}: OAuthRedirectProps) => {
  useEffect(() => {
    validateSession().then(async (result: string) => {
      saveToken(result);
      history.push(ROUTES.Home);
      onTokenSet();
    });
  }, []);
  return (
    <div>
      Redirecting...
      {}
    </div>
  );
};

export default OAuthRedirect;
