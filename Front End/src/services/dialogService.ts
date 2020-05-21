import { confirmAlert } from 'react-confirm-alert';

function confirmDialog(
  message = 'Are you sure you want to continue?',
  title = 'Confirm',
) {
  return new Promise((resolve, reject) => {
    confirmAlert({
      title,
      message,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            resolve(true);
          },
        },
        {
          label: 'No',
          onClick: () => reject(),
        },
      ],
    });
  });
}
export function alertDialog(message: string, title = '') {
  return new Promise((resolve) => {
    confirmAlert({
      title,
      message,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            resolve(true);
          },
        },
      ],
    });
  });
}

export default confirmDialog;
