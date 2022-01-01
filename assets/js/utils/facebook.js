const StatusTypes = {
  CONNECTED: 'connected'
};

function getLoginStatus() {
  return new Promise((resolve, reject) => {
    FB.getLoginStatus((response) => {
      if (response.status === StatusTypes.CONNECTED) {
        resolve(response.authResponse.accessToken);
      } else {
        reject(response);
      }
    })
  });
}

function getUserNameEmail() {
  return new Promise((resolve) => {
    FB.api('/me', 'GET', { fields: 'id,name,email' }, (response) => {
      resolve(response);
    });
  })
}

export { getLoginStatus, getUserNameEmail };
