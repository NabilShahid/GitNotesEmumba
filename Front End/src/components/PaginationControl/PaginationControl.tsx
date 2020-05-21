import * as React from 'react';
import './PaginationControl.css';
import ICONS from '../../constants/icons';

export interface PaginationControlProps {
  totalPages: number;
  currentPage: number;
  nextPage: Function;
  prevPage: Function;
}

const iconStyle = { width: '10px', height: '10px', fill: 'white' };
const PaginationControl: React.SFC<PaginationControlProps> = ({
  totalPages,
  currentPage,
  nextPage,
  prevPage,
}: PaginationControlProps) => {
  return (
    <div className="pagination-control-container">
      Page{' '}
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
        {currentPage}
      </div>{' '}
      of {totalPages}
      <div className="pagination-control-buttons">
        <div
          className="pagination-control-left"
          onClick={() => {
            prevPage();
          }}
          onKeyPress={() => {
            prevPage();
          }}
          role="button"
          tabIndex={0}
        >
          <ICONS.BackIcon style={iconStyle} />
        </div>
        <div
          className="pagination-control-right"
          onClick={() => {
            nextPage();
          }}
          onKeyPress={() => {
            nextPage();
          }}
          role="button"
          tabIndex={0}
        >
          <ICONS.NextIcon style={iconStyle} />
        </div>
      </div>
    </div>
  );
};

export default PaginationControl;
