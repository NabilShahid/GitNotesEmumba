import * as React from 'react';

export interface IconButtonProps {
  text: string;
  click?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  withCount?: boolean;
  count?: number;
  children?: React.ReactChildren;
  icon: any;
}

const IconButton: React.SFC<IconButtonProps> = ({
  text,
  click,
  icon,
  withCount,
  count,
}: IconButtonProps) => {
  const ButtonIcon = icon || <div>Icon</div>;
  return (
    <>
      <button
        type="button"
        style={{
          border: 0,
          background: 'transparent',
          color: 'var(--header-blue-color)',
          cursor: 'pointer',
        }}
        onClick={click}
      >
        <ButtonIcon
          style={{
            fill: 'var(--header-blue-color)',
            height: '13px',
            width: '13px',
            margin: '0 2px -1px 0',
          }}
        />
        {text}
        {withCount && (
          <div
            style={{
              display: 'inline-block',
              color: '#8f8f8f',
              border: '1px solid #8f8f8f',
              borderRadius: '4px',
              padding: '0px 8px',
              marginLeft: '5px',
            }}
          >
            {count}
          </div>
        )}
      </button>
    </>
  );
};

export default IconButton;
