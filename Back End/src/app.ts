import { APP_BASE_URL, CLIENT_SECRET, ACCESS_TOKEN_REQUEST_URL } from './constants/common-consts';
import * as axios from 'axios';
import express from 'express';
import cors from 'cors';
import { AxiosResponse } from 'axios';

const app = express();

app.use(cors());

// user authetication api to return access token
app.get('/authenticate-user', (req, res) => {
  const body = {
    client_id: req.query.client_id,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
  };
  const opts = { headers: { accept: 'application/json' } };

  axios.default
    .post(ACCESS_TOKEN_REQUEST_URL, body, opts)
    .then((res) => res.data['access_token'])
    .then((_token) => {
      console.log('Token:', _token, new Date().toISOString());
      res.send(_token);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

app.use(express.static(__dirname + '/public'));
app.listen(5000, () => {
  console.log('Server listening on port : 5000');
});