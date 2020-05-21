import * as React from 'react';
import GistCard from '../GistCard/GistCard';
import './GistsGrid.css';

export interface GridGistsProps {
  gists: Array<any>;
  rowSize?: number;
}

const GridGists: React.SFC<GridGistsProps> = ({
  gists,
  rowSize,
}: GridGistsProps) => {
  const getGistsRow = (startIndex: number, currentRowSize: number) => {
    const gistRow = [];
    for (let i = startIndex; i < startIndex + currentRowSize; i += 1) {
      gistRow.push(
        <div
          className="grid-gist-cell"
          key={i}
          style={{ flexBasis: `${100 / currentRowSize}%`, padding: '15px 30px' }}
        >
          {gists[i] && <GistCard gist={gists[i]} />}
        </div>,
      );
    }
    return <div className="grid-gist-row" key={startIndex}>{gistRow}</div>;
  };
  const getGistGrid = (currentRowSize: number) => {
    const gistGrid = [];
    for (let i = 0; i < gists.length; i += currentRowSize) {
      gistGrid.push(getGistsRow(i, currentRowSize));
    }
    return gistGrid;
  };
  return (
    <div className="grid-gists-container">{getGistGrid(rowSize || 3)}</div>
  );
};

export default GridGists;
