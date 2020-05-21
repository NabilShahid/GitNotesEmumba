export const saveToken = (token: string): void => {
  localStorage.setItem('access_token', token);
};
export const getToken = (): string | null =>
  localStorage.getItem('access_token');
