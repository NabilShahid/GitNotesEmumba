const APP_SERVER_API_BASE_URL = 'http://localhost:5000';
export default APP_SERVER_API_BASE_URL;
export enum APP_SERVER_API_CALLS {
  AuthenticateUser = 'authenticate-user',
}
export const GITHUB_BASE_URL = 'https://api.github.com';
export enum GITHUB_API_CALLS {
  User = 'user',
  Users = 'users',
  PublicGists='gists/public',
  Gist='gist',
  Gists='gists'
}
