var firebaseui = require('firebaseui');
var firebase = require('firebaseapp');

var firebaseApp = firebase.getFirebase();
var uiConfig = {
  signInSuccessUrl: '/#/profile',
  signInOptions: [
    firebaseApp.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: 'localhost:3000/tos',
  callbacks: {
    signInSuccess: function(currentUser, credential, redirectUrl) {
      var facebookUid;
      console.log('find me');
      var authToken = credential.accessToken;
      for (var providerInfo of currentUser.providerData) {
        if (providerInfo.providerId == 'facebook.com') {
          facebookUid = providerInfo.uid;
        }
      }
      firebase.writeUserAccess(currentUser.uid, facebookUid, authToken);
      return true;
    },
  },
};
var ui = new firebaseui.auth.AuthUI(firebaseApp.auth());

module.exports = {
  getUI: () => {
    return ui;
  },
  getConfig: () => {
    return uiConfig;
  },
};
