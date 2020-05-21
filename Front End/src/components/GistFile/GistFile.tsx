import * as React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import './GitFile.css';
import ICONS from '../../constants/icons';

export interface GistFileProps {
  content: string;
  fileName: string;
  readOnly: boolean;
  showFileName?: boolean;
  height?: string;
  getUpdatedContent?: Function;
}

const GistFile: React.SFC<GistFileProps> = ({
  content,
  showFileName,
  fileName,
  height,
  readOnly,
  getUpdatedContent,
}: GistFileProps) => {
  return (
    <div style={{ height }} className="gist-file-container material-box-shadow">
      {showFileName && (
        <div className="gist-file-name">
          <ICONS.CodeIcon
            style={{ height: '13px', width: '13px', margin: '0 5px -2px 0' }}
          />
          {fileName}
        </div>
      )}
      <CodeMirror
        className="code-mirror-custom"
        value={content}
        options={{
          mode: '',
          theme: 'xq-light',
          lineNumbers: true,
          lineWrapping: true,
          readOnly,
        }}
        onChange={(editor, data, value) => {
          console.log(value);
          if (typeof getUpdatedContent === 'function') getUpdatedContent(value);
        }}
      />
    </div>
  );
};

export default GistFile;
