import * as React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import './ProfilePage.css';
import UserAvatar from '../UserAvatar/UserAvatar';
import { getUserGists } from '../../services/apis';
import GistPage from '../GistPage/GistPage';
import { GITHUB_PROFILE_BASE_URL } from '../../constants/github-app-info';

export interface ProfilePageProps {
  avatarUrl?: string;
  login?: string;
}

const ProfilePage: React.SFC<ProfilePageProps> = ({
  avatarUrl,
  login,
}: ProfilePageProps) => {
  const [gists, setGists] = React.useState([]);
  useEffect(() => {
    if (login) {
      getUserGists(login || '').then((res) => {
        setGists(res.data);
      });
    }
  }, [login]);
  return (
    <div className="profile-page-container">
      <div className="profile-page-info-container">
        <UserAvatar src={avatarUrl || ''} style={{ width: '220px' }} />
        <div className="profile-page-login-name">{login}</div>
        <button
          type="button"
          className="profile-page-github-profile-button cursor-pointer"
          onClick={() => {
            window.open(GITHUB_PROFILE_BASE_URL + login, '_blank');
          }}
        >
          View GitHub Profile
        </button>
      </div>
      <div className="profile-page-gists-container">
        {gists.map((gist: any) => {
          return <GistPage gistId={gist.id} fileHeight="200px" />;
        })}
      </div>
    </div>
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
export default connect(mapStateToProps, null)(ProfilePage);
