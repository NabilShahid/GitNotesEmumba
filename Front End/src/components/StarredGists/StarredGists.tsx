import * as React from 'react';
import { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import GridGists from '../GistsGrid/GistsGrid';
import { getStarredGists } from '../../services/apis';

export interface StarGistsProps {}

const StarGists: React.SFC<StarGistsProps> = () => {
  const [gists, setGists]: [any, Function] = React.useState({});
  useEffect(() => {
    getStarredGists().then(async (res: AxiosResponse) => {
      setGists(res.data);
    });
  }, []);
  return (
    <div className="starred-gists-container">
      <section>
        <h3 style={{ fontWeight: 'normal' }}>Starred Gists</h3>
        <GridGists gists={gists} />
      </section>
    </div>
  );
};

export default StarGists;
