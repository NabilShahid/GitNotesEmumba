import * as React from 'react';
import './CreateGist.css';
import GistFile from '../GistFile/GistFile';
import { createGist } from '../../services/apis';
import confirmDialog, { alertDialog } from '../../services/dialogService';
import CONFIRM_MESSAGES from '../../constants/confirm-messages';
import ALERT_MESSAGES from '../../constants/alert-messages';

export interface CreateGistProps {}

const CreateGist: React.SFC<CreateGistProps> = () => {
  const [fileName, setFileName]: [string, Function] = React.useState('');
  const [description, setDescription]: [string, Function] = React.useState('');
  const [gistContent, setGistContent]: [string, Function] = React.useState('');
  return (
    <div className="create-gist-container">
      <div className="create-gist-row">
        <div className="create-gist-label">File Name:</div>
        <div className="create-gist-control-container">
          <input
            type="text"
            className="create-gist-control"
            style={{ padding: '5px 0px' }}
            value={fileName}
            onInput={(e: any) => {
              setFileName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="create-gist-row">
        <div className="create-gist-label">Description:</div>
        <div className="create-gist-control-container">
          <textarea
            className="create-gist-control"
            value={description}
            onInput={(e: any) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="create-gist-row">
        <div className="create-gist-label">Content:</div>
        <div className="create-gist-control-container">
          <GistFile
            fileName={fileName}
            content={gistContent}
            getUpdatedContent={(value: string) => {
              setGistContent(value);
            }}
            height="200px"
            readOnly={false}
          />
        </div>
      </div>
      <div className="create-gist-row" style={{ justifyContent: 'flex-end' }}>
        <button
          type="button"
          className="main-theme-button"
          onClick={() => {
            if (!fileName || !gistContent) {
              alertDialog(ALERT_MESSAGES.CreateGistMissingFields);
              return;
            }
            confirmDialog(CONFIRM_MESSAGES.CreateGist).then(() => {
              createGist({
                description,
                public: true,
                files: {
                  [fileName]: {
                    content: gistContent,
                  },
                },
              }).then(() => {
                alertDialog(ALERT_MESSAGES.GistCreated);
              });
            });
          }}
        >
          Create Gist
        </button>
      </div>
    </div>
  );
};

export default CreateGist;
