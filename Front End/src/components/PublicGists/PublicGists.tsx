import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import './PublicGists.css';
import ICONS from '../../constants/icons';
import Table from '../Table/Table';
import GistsGrid from '../GistsGrid/GistsGrid';
import { getPublicGists, getGist } from '../../services/apis';
import GISTS_VIEW_TYPES, {
  PUBLIC_GISTS_TOTAL_PAGES,
  PUBLIC_GISTS_PAGE_SIZE,
} from '../../constants/common-consts';
import PaginationControl from '../PaginationControl/PaginationControl';

export interface PublicGistsProps {
  searchText?: string;
}

const iconStyle = { width: '22px', height: '22px' };
let timeout: NodeJS.Timeout;
const PublicGists: React.SFC<PublicGistsProps> = ({
  searchText,
}: PublicGistsProps) => {
  const [gists, setGists]: [Array<any>, Function] = React.useState([]);
  const [currentPage, setCurrentPage]: [number, Function] = React.useState(1);
  const [loadingGists, setLoadingGists]: [boolean, Function] = React.useState(
    true,
  );
  const [totalPages, setTotalPages]: [number, Function] = React.useState(
    PUBLIC_GISTS_TOTAL_PAGES,
  );
  const [currentView, setCurrentView]: [string, Function] = React.useState(
    GISTS_VIEW_TYPES.Table,
  );
  const setNextPage = () => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const getGistWithSearchAndPageNumber = () => {
    setLoadingGists(true);
    if (searchText === '') {
      getPublicGists(currentPage, PUBLIC_GISTS_PAGE_SIZE).then((res: any) => {
        setLoadingGists(false);
        setGists(res.data);
        setTotalPages(PUBLIC_GISTS_TOTAL_PAGES);
      });
      return;
    }
    getGist(searchText || '')
      .then((res) => {
        setCurrentPage(1);
        setLoadingGists(false);
        setGists([res.data]);
        setTotalPages(1);
      })
      .catch(() => {
        setCurrentPage(1);
        setLoadingGists(false);
        setGists([]);
        setTotalPages(1);
      });
  };
  useEffect(() => {
    // throttling on search text
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(getGistWithSearchAndPageNumber, 500);
  }, [searchText, currentPage]);
  return (
    <div className="public-gists-main-container">
      <div className="text-align-right" style={{ margin: '20px 0px' }}>
        <div className="cursor-pointer">
          <div className="public-gists-right-seperator">
            <ICONS.GridViewIcon
              style={{
                ...iconStyle,
                fill:
                  currentView === GISTS_VIEW_TYPES.Grid
                    ? 'var(--main-color)'
                    : '#d9d9d9',
              }}
              onClick={() => {
                setCurrentView(GISTS_VIEW_TYPES.Grid);
              }}
            />
          </div>
          <div style={{ display: 'inline-block' }}>
            <ICONS.ListViewIcon
              style={{
                ...iconStyle,
                fill:
                  currentView === GISTS_VIEW_TYPES.Table
                    ? 'var(--main-color)'
                    : '#d9d9d9',
              }}
              onClick={() => {
                setCurrentView(GISTS_VIEW_TYPES.Table);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        {loadingGists && 'Loading...'}
        {!loadingGists &&
          (currentView === GISTS_VIEW_TYPES.Table ? (
            <Table gists={gists} />
          ) : (
            <GistsGrid gists={gists} />
          ))}
      </div>
      <div className="public-gists-pagination">
        <div className="public-gists-pagination-next">
          <button
            type="button"
            onClick={() => {
              setNextPage();
            }}
            className="main-theme-button"
          >
            Next page{' '}
            <ICONS.ArrowIcon
              style={{
                height: '17px',
                width: '17px',
                fill: 'white',
                margin: '0 0 -4px 8px',
              }}
            />
          </button>
        </div>
        <div className="public-gists-pagination-control">
          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={() => {
              setNextPage();
            }}
            prevPage={() => {
              if (currentPage - 1 >= 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
/**
 * state to props mapping
 */
const mapStateToProps = (state: any) => {
  return {
    searchText: state.commonReducer.SearchText,
  };
};

export default connect(mapStateToProps, null)(PublicGists);
