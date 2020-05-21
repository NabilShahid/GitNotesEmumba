import * as React from 'react';
import './ActionButton.css';

export interface ActionButtonProps {
  text: string;
  click: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionButton: React.SFC<ActionButtonProps> = ({
  text,
  click,
}: ActionButtonProps) => {
  return (
    <button type="button" className="action-button" onClick={click}>
      {text}
    </button>
  );
};

export default ActionButton;
