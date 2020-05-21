import * as React from 'react';

export interface UserAvatarProps {
  src: string;
  style: any;
}

const UserAvatar: React.SFC<UserAvatarProps> = ({
  src,
  style,
}: UserAvatarProps) => {
  return <img src={src} style={{ ...style, borderRadius: '50%' }} alt="User" />;
};

export default UserAvatar;
