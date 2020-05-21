import * as React from 'react';
import { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import GistInfo from '../GistInfo/GistInfo';
import {
  getGist,
  forkGist,
  starGist,
  updateGist,
  deleteGist,
} from '../../services/apis';
import GistFile from '../GistFile/GistFile';
import './GistPage.css';
import IconButton from '../IconButton/IconButton';
import ICONS from '../../constants/icons';
import confirmDialog, { alertDialog } from '../../services/dialogService';
import ALERT_MESSAGES from '../../constants/alert-messages';
import CONFIRM_MESSAGES from '../../constants/confirm-messages';

export interface GistPageProps {
  gistId?: string;
  fileHeight?: string;
  login?: string;
}

const GistPage: React.SFC<GistPageProps> = ({
  gistId,
  fileHeight,
  login,
}: GistPageProps) => {
  const { id } = useParams();
  const [gist, setGist]: [any, Function] = React.useState({});
  const [forksCount, setForksCount] = React.useState(0);
  const [readOnly, setReadOnly]: [boolean, Function] = React.useState(true);
  let updatedFileConent = '';
  const getUpdatedContent = (value: string) => {
    updatedFileConent = value;
  };
  useEffect(() => {
    getGist(gistId || id).then((res: AxiosResponse) => {
      setGist(res.data);
      setForksCount(res.data.forks.length);
      updatedFileConent = Object.values(res.data.files as Array<any>)[0]
        .content;
    });
  }, []);
  const userIsGistOwner = gist.owner && gist.owner.login === login;
  return (
    <div className="gist-page-container">
      {login && (
        <div className="gist-page-action-panel">
          {gist.owner && (
            <div style={{ flexBasis: '50%' }}>
              <GistInfo
                avatarUrl={gist.owner.avatar_url}
                userName={gist.owner.login}
                gistName={Object.keys(gist.files)[0]}
              />
            </div>
          )}
          <div className="gist-page-actions">
            {readOnly && userIsGistOwner && (
              <IconButton
                text="Edit"
                icon={ICONS.EditIcon}
                click={() => {
                  setReadOnly(false);
                }}
              />
            )}
            {!readOnly && (
              <IconButton
                text="Save"
                icon={ICONS.SaveIcon}
                click={() => {
                  confirmDialog(CONFIRM_MESSAGES.UpdateGist).then(() => {
                    updateGist(gist.id, {
                      files: {
                        [Object.keys(gist.files as Array<string>)[0]]: {
                          content: updatedFileConent,
                        },
                      },
                    }).then(() => alertDialog(ALERT_MESSAGES.GistUpdated));
                    setReadOnly(true);
                  });
                }}
              />
            )}

            {userIsGistOwner && (
              <IconButton
                text="Delete"
                icon={ICONS.DeleteIcon}
                click={() => {
                  confirmDialog(CONFIRM_MESSAGES.DeleteGist).then(() => {
                    deleteGist(gist.id).then(() => {
                      alertDialog(ALERT_MESSAGES.GistDeleted);
                    });
                  });
                }}
              />
            )}
            <IconButton
              text="Fork"
              withCount
              count={forksCount}
              icon={ICONS.ForkIcon}
              click={() => {
                confirmDialog(CONFIRM_MESSAGES.ForkGist).then(() => {
                  forkGist(gist.id).then(() => {
                    alertDialog(ALERT_MESSAGES.GistForked);
                    setForksCount(forksCount + 1);
                  });
                });
              }}
            />
            <IconButton
              text="Star"
              // withCount
              // count={gist.forks && gist.forks.length}
              icon={ICONS.StarIcon}
              click={() => {
                confirmDialog(CONFIRM_MESSAGES.StarGist).then(() => {
                  starGist(gist.id).then(() => {
                    alertDialog(ALERT_MESSAGES.GistStarred);
                  });
                });
              }}
            />
          </div>
        </div>
      )}
      {!login && (
        <div className="gist-page-action-panel">
          Please login to take actions on gists
        </div>
      )}
      {gist.files && (
        <GistFile
          showFileName
          fileName={Object.keys(gist.files as Array<string>)[0]}
          content={Object.values(gist.files as Array<any>)[0].content}
          getUpdatedContent={getUpdatedContent}
          height={fileHeight}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

/**
 * state to props mapping
 */
const mapStateToProps = (state: any) => {
  return {
    login: state.userReducer.User.Login,
  };
};
export default connect(mapStateToProps, null)(GistPage);
