import { getLoginStatus, getUserNameEmail } from '../utils/facebook';
import authService from '../services/auth';

function fbAsyncInit() {
  FB.init({
      appId: '2704628223158103',
      cookie: true,
      xfbml: true,
      version: 'v8.0'
  });

  FB.AppEvents.logPageView();
}

function checkLoginState() {
  getLoginStatus()
    .then(getUserNameEmail)
    .then(syncInfo);
}

function syncInfo(response) {
  const { email, id, name } = response;

  return authService
    .login(email, id)
    .then(authService.sync(name, email, id))
    .then(loginResponse => {
      console.log('uuid user', loginResponse);
    });
}

window.fbAsyncInit = fbAsyncInit;
window.checkLoginState = checkLoginState;


(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
