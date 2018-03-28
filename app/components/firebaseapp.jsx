
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyAMkMl--eZK0zqI9hmzrUS27RmcERvhhzI",
  authDomain: "yaler-c71c0.firebaseapp.com",
  databaseURL: "https://yaler-c71c0.firebaseio.com",
  projectId: "yaler-c71c0",
  storageBucket: "yaler-c71c0.appspot.com",
  messagingSenderId: "511312148463"
};


var firebaseApp = firebase.initializeApp(config);
var firebaseDatabase = firebaseApp.database();

module.exports = {
  getFirebaseObject: () => {
    return firebaseApp;
  },
  getFirebase: () => {
    return firebase;
  },
  writeUserAccess: (uid, FBuid, auth) => {
    firebaseDatabase
      .ref(uid + '/FBuid')
      .set(FBuid);
    firebaseDatabase
      .ref(uid + '/Auth')
      .set(auth);
  },
  readFBAuth: (uid) => {
    if (uid === null) {
      uid = 'null';
    }
    return firebaseDatabase
      .ref(uid + '/Auth')
      .once('value')
      .then(function (snapshot) {
        if (snapshot.val() && snapshot.val() !== null) {
          return snapshot.val();
        } else {
          return null;
        }
      });
  },
  readFBuid: (uid) => {
    if (uid === null) {
      uid = 'null';
    }
    return firebaseDatabase
      .ref(uid + '/FBuid')
      .once('value')
      .then(function (snapshot) {
        if (snapshot.val() && snapshot.val() !== null) {
          return snapshot.val();
        } else {
          return null;
        }
      });
  },
  writeCurrentState: (uid, currentState) => {
    firebaseDatabase
      .ref(uid + '/current_state')
      .set(currentState);
  },
  readCurrentState: (uid) => {
    if (uid === null) {
      uid = 'null';
    }
    return firebaseDatabase
      .ref(uid + '/current_state')
      .once('value')
      .then(function (snapshot) {
        if (snapshot.val() && snapshot.val() !== null) {
          return snapshot.val();
        } else {
          return null;
        }
      });
  },
  writeUserBio: (uid, bio) => {
    firebaseDatabase
      .ref(uid + '/bio')
      .set(bio);
  },
  readUserBio: (uid) => {
    if (uid === null) {
      uid = 'null';
    }
    return firebaseDatabase
      .ref(uid + '/bio')
      .once('value')
      .then(function (snapshot) {
        if (snapshot.val() && snapshot.val() !== null) {
          return snapshot.val();
        } else {
          return null;
        }
      });
  },
};
