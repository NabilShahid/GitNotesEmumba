import * as React from 'react';
import moment from 'moment';
import './Table.css';
import UserAvatar from '../UserAvatar/UserAvatar';
import history from '../../services/history';
import ICONS from '../../constants/icons';
import { forkGist, starGist } from '../../services/apis';
import confirmDialog, { alertDialog } from '../../services/dialogService';
import CONFIRM_MESSAGES from '../../constants/confirm-messages';
import ALERT_MESSAGES from '../../constants/alert-messages';

export interface TableProps {
  gists: Array<any>;
}

const tableIconStyle = {
  height: '15px',
  width: '15px',
  fill: 'var(--main-color)',
};
const Table: React.SFC<TableProps> = ({ gists }: TableProps) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <div className="table-header-row">
          <div className="table-col">Name</div>
          <div className="table-col">Date</div>
          <div className="table-col" style={{ flexBasis: '10%' }}>
            Time
          </div>
          <div className="table-col">Keyword</div>
          <div className="table-col">Notebook Name</div>
          <div className="table-col" style={{ flexBasis: '10%' }} />
        </div>
      </div>
      <div className="table-body">
        {gists.length > 0 &&
          gists.map((gist: any) => {
            return (
              <div
                key={gist.id}
                className="table-body-row cursor-pointer"
                onClick={() => {
                  history.push(`gist/${gist.id}`);
                }}
                role="button"
                onKeyPress={() => {
                  history.push(`gist/${gist.id}`);
                }}
                tabIndex={0}
              >
                <div className="table-col">
                  <div style={{ display: 'flex' }}>
                    <div>
                      <UserAvatar
                        src={gist.owner.avatar_url}
                        style={{ width: '30px', marginRight: '7px' }}
                      />
                    </div>
                    <div style={{ marginTop: '4px' }}>{gist.owner.login}</div>
                  </div>
                </div>
                <div className="table-col">
                  {moment(gist.created_at).format('DD-MMM-YYYY')}
                </div>
                <div className="table-col" style={{ flexBasis: '10%' }}>
                  {moment(gist.created_at).format('HH:mm A')}
                </div>
                <div className="table-col">{gist.description}</div>
                <div className="table-col">{Object.keys(gist.files)[0]}</div>
                <div
                  className="table-col"
                  style={{ textAlign: 'center', flexBasis: '10%' }}
                >
                  {' '}
                  <ICONS.StarIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDialog(CONFIRM_MESSAGES.StarGist).then(() => {
                        starGist(gist.id).then(() => {
                          alertDialog(ALERT_MESSAGES.GistStarred);
                        });
                      });
                    }}
                    style={tableIconStyle}
                  />
                  <ICONS.ForkIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDialog(CONFIRM_MESSAGES.ForkGist).then(() => {
                        forkGist(gist.id).then(() => {
                          alertDialog(ALERT_MESSAGES.GistForked);
                        });
                      });
                    }}
                    style={{ ...tableIconStyle, marginLeft: '20px' }}
                  />
                </div>
              </div>
            );
          })}
        {gists.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            No Data Available...
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
