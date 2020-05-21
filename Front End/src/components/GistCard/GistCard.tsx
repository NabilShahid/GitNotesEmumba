import * as React from 'react';
import { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { getGist } from '../../services/apis';
import GistInfo from '../GistInfo/GistInfo';
import GistFile from '../GistFile/GistFile';
import './GistCard.css';
import history from '../../services/history';

export interface GistCardProps {
  gist: any;
}

const GistCard: React.SFC<GistCardProps> = ({ gist }: GistCardProps) => {
  const [gistContent, setGistContent]: [string, Function] = React.useState('');
  useEffect(() => {
    getGist(gist.id).then(async (res: AxiosResponse) => {
      setGistContent(
        Object.values(res.data.files as Array<any>)[0].content.slice(0, 150),
      );
    });
  }, []);
  return (
    <div
      className="gist-card material-box-shadow cursor-pointer"
      onClick={() => {
        history.push(`gist/${gist.id}`);
      }}
      role="button"
      onKeyPress={() => {
        history.push(`gist/${gist.id}`);
      }}
      tabIndex={0}
    >
      {gistContent && (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <GistFile
            fileName={Object.keys(gist.files as Array<string>)[0]}
            content={gistContent}
            height="200px"
            readOnly
          />
        </div>
      )}
      {gist.owner && (
        <div
          style={{
            width: '100%',
            borderTop: '1px solid #f1f1f1',
            paddingTop: '20px',
          }}
        >
          <GistInfo
            avatarUrl={gist.owner.avatar_url}
            userName={gist.owner.login}
            gistName={Object.keys(gist.files)[0]}
          />
        </div>
      )}
    </div>
  );
};

export default GistCard;
