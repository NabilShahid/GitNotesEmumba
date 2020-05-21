import * as React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import './GistInfo.css';

export interface GistInfoProps {
  avatarUrl?: string;
  userName?: string;
  gistName?: string;
  created?: string;
  description?: string;
}

const GistInfo: React.SFC<GistInfoProps> = ({
  avatarUrl,
  userName,
  gistName,
  created,
  description,
}: GistInfoProps) => {
  return (
    <div className="gist-info-container">
      <div>
        <UserAvatar src={avatarUrl || ''} style={{ width: '45px' }} />
      </div>
      <div style={{ marginLeft: '10px' }}>
        <div className="gist-info-header blue-header">
          <span>{userName}/ </span>
          <b>{gistName}</b>
        </div>
        <div className="gist-info-subtitle">Created 1 hour ago</div>
        <div className="gist-info-description">For all</div>
      </div>
    </div>
  );
};

export default GistInfo;
